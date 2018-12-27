<template>
  <div class="game">
    <tab style="margin-top: 0">
      <tab-item selected @on-item-click="onItemClick">热门</tab-item>
      <tab-item @on-item-click="onItemClick(1)">最新</tab-item>
      <tab-item @on-item-click="onItemClick(2)">评分</tab-item>
    </tab>
    <scroller height="-40px" lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
      <div>
        <div style="margin-top: 10px"  v-for="item in movies">
          <div style="display: flex;margin-left: 20px" @click="goToDetail(item)">
            <img :src="item.movieImgUrl"
                 style="width: 90px;height: 120px"/>
            <div style="margin-left: 10px;margin-right: 10px">
              <div style="font-size: 15px">{{item.movieTitle}}</div>
              <!--<div style="display: flex;font-size: 14px;color: #999;margin-top: 0.3em">-->
              <!--<div>发布时间：</div>-->
              <!--<div>{{movieReal}}</div>-->
              <!--<div style="margin-left: 2em">豆瓣：</div>-->
              <!--<div style="color: red">9.9</div>-->
              <!--</div>-->
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
      onCellClick() {
        window.alert('cell click')
      },
      onClickButton() {
        window.alert('click')
      },
      changeList() {
        this.showList1 = false
        this.$nextTick(() => {
          this.$refs.scroller.reset({
            top: 0
          })
        })
      }
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

  .game_info {
    font-size: 15px;
    color: gray;
  }

  .game_info_list {
    font-size: 14px;
    color: #959595;
  }
</style>
