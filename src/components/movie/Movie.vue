<template>
  <div class="game">
    <tab style="margin-top: 0">
      <tab-item selected @on-item-click="onItemClick(1)">热门</tab-item>
      <tab-item @on-item-click="onItemClick(2)">最新</tab-item>
      <tab-item @on-item-click="onItemClick(3)">评分</tab-item>
    </tab>
    <div>
      <div style="margin-top: 10px" v-for="item in movies">
        <div style="display: flex;margin-left: 10px">
          <div class="movie_icon">
            <img :src="item.movieImgUrl" style="width: 6em;height: 8em" @click="goToDetail(item)"/>
          </div>
          <div style="margin-left: 20px;margin-right: 10px">
            <div style="font-size: 13px;height: 5.5em" @click="goToDetail(item)">{{item.movieTitle}}</div>
            <div style="display: flex;margin-top: 2em;font-size: 13px">
              <div style="color: #9b9b9b">评分：</div>
              <div>{{item.movieRate}}</div>
              <a style="margin-left: 1em" :href="item.dbUrl">豆瓣</a>
              <a style="margin-left: 1em" :href="item.imdbUrl">IMDB</a>
            </div>
          </div>
        </div>
        <load-more style="margin: 0.8em;width: 95%;height: 2px" :show-loading="false"
                   background-color="#434343"></load-more>
      </div>
      <load-more tip="点击加载更多" :show-loading="showLoading" @click.native="loadMore"></load-more>
    </div>
  </div>
</template>


<script>
  import {Scroller, LoadMore, XHeader, Tab, TabItem} from 'vux'
  import {apiDomain} from '../../comm';

  export default {
    components: {
      LoadMore,
      XHeader,
      Tab,
      TabItem,
      Scroller
    },
    name: 'Game',
    data() {
      return {
        listType: 1,
        pageNo: 1,
        showLoading: false,
        results: [],
        value: '',
        movies: [],
        onFetching: false,
        bottomCount: 20
      }
    },
    methods: {
      onItemClick(itemId) {
        this.listType = itemId;
        this.movies = [];
        this.getMovieData();
      },
      goToDetail(item) {
        this.$router.push({name: 'moviedetail', params: {id: item.id}});
      },
      loadMore() {
        this.pageNo = this.pageNo + 1;
        this.getMovieData();
      },
      onScrollBottom() {
        if (this.onFetching) {
          // do nothing
        } else {
          this.onFetching = true;
          setTimeout(() => {
            this.loadMore();
            this.$nextTick(() => {
              this.$refs.scrollerBottom.reset()
            });
            this.onFetching = false
          }, 2000)
        }
      },
      onScroll(pos) {
        this.scrollTop = pos.top
      },
      getMovieData() {
        this.showLoading = true;
        this.$http.jsonp(`${apiDomain}/movie/get?pageNo=${this.pageNo}&listType=${this.listType}`)
          .then((data) => {
            let resData = data.data;
            if (resData.code === 0) {
              this.movies = this.movies.concat(resData.data);
            }
            this.showLoading = false;
          })
      }
    },
    mounted() {
      this.getMovieData();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .movie_icon {
    width: 90px;
    height: 120px
  }
</style>
