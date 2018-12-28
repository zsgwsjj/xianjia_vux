<template>
  <div class="game">
    <tab style="margin-top: 0">
      <tab-item selected @on-item-click="onItemClick">热门</tab-item>
      <tab-item @on-item-click="onItemClick(1)">最新</tab-item>
      <tab-item @on-item-click="onItemClick(2)">评分</tab-item>
    </tab>
    <scroller lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
      <div>
        <div style="margin-top: 10px"  v-for="item in movies">
          <div style="display: flex;margin-left: 20px" @click="goToDetail(item)">
            <img :src="item.movieImgUrl" style="width: 6em;height: 8em"/>
            <div style="margin-left: 10px;margin-right: 10px">
              <div style="font-size: 15px">{{item.movieTitle}}</div>
            </div>
          </div>
          <load-more style="margin: 0.8em;width: 100%;height: 2px" :show-loading="false"
                     background-color="#434343"></load-more>
        </div>
      </div>
    </scroller>
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
        pageNo: 1,
        showLoading: false,
        showNoData: false,
        results: [],
        value: '',
        movies: [],
        onFetching: false,
        bottomCount: 20
      }
    },
    methods: {
      onItemClick(itemId) {
        console.log(itemId)
      },
      goToDetail(item) {
        this.$router.push({name: 'moviedetail', params: item});
      },
      loadMore() {
        this.pageNo = this.pageNo + 1;
        this.$http.jsonp(`${apiDomain}/movie/get?pageNo=${this.pageNo}`)
          .then((data) => {
            let resData = data.data;
            if (resData.code === 0) {
              this.movies = this.movies.concat(resData.data);
            }
          })
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
    },
    mounted() {
      this.$http.jsonp(`${apiDomain}/movie/get?pageNo=${this.pageNo}`)
        .then((data) => {
          let resData = data.data;
          if (resData.code === 0) {
            this.movies = resData.data
          }
        })
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

</style>
