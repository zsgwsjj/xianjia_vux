<template>
  <div>
    <tab style="margin-top: 0" active-class="2">
      <tab-item :selected="selectItem===1" @on-item-click="onItemClick">首页</tab-item>
      <tab-item @on-item-click="onItemClick(1)">单机</tab-item>
      <tab-item @on-item-click="onItemClick(2)">电影</tab-item>
      <!--<tab-item @on-item-click="onItemClick(3)">小说</tab-item>-->
    </tab>
    <swiper :auto="true">
      <swiper-item
        v-for="item in banner"
        :key="item.id"
        :min-moving-distance="120"
        @click.native="clickBanner(item.url)"
      >
        <img :src="item.img" style="width: 100%"/>
      </swiper-item>
    </swiper>
    <div class="list_tj" style="margin: 10px">
      <div>
        <div v-for="item in news" :key="item.id" style="height: 100px" @click="goToNews(item)">
          <div style="display: flex">
            <div style="width: 63%">
              <div class="news_title" style="font-size: 15px;height: 70%">{{item.title}}</div>
              <div style="font-size: 14px;color: #999;display: flex">
                <div style="width: 60%">{{item.type}}</div>
                <div>{{item.timeDistance}}</div>
              </div>
            </div>
            <img style="margin-left: 10px;width: 130px;height: 72px"
                 :src="item.newsImg"/>
          </div>
          <load-more style="margin: 0.5em 0 0;" :show-loading="false" background-color="#434343"></load-more>
        </div>
        <load-more v-show="showLoadMore" tip="点击加载更多" :show-loading="showLoading" @click.native="loadMore"></load-more>
      </div>
    </div>
  </div>
</template>

<script>
  import {Scroller, Tab, TabItem, LoadMore, Divider, XHeader, Swiper, Search, Toast} from 'vux'
  import SwiperItem from "vux/src/components/swiper/swiper-item";
  import {apiDomain} from '../../comm';

  export default {
    components: {
      Scroller,
      Tab,
      TabItem,
      LoadMore,
      Toast,
      Divider,
      SwiperItem,
      Swiper,
      Search,
      XHeader
    },
    name: 'Game',
    data() {
      return {
        showLoadMore: true,
        showLoading: false,
        pageNo: 1,
        news: [],
        banner: [],
        toastShow: 1,
        results: [],
        value: '',
        hotGames: [],
        bannerIndex: 0,
        selectItem: 1,
      }
    },
    methods: {
      goToNews(item) {
        this.$router.push({name: 'newsDetail', params: item});
      },
      onItemClick(index) {
        if (index === 1) {
          this.$router.push({name: 'game'});
        } else if (index === 2) {
          this.$router.push({name: 'movie'});
        }
      },
      onScrollBottom() {
        if (this.onFetching) return;
        this.onFetching = true;
        setTimeout(() => {
          this.loadMore();
          this.$nextTick(() => {
            this.$refs.scrollerBottom.reset()
          });
          this.onFetching = false
        }, 2000)
      },
      loadMore() {
        this.pageNo = this.pageNo + 1;
        this.$http.jsonp(`${apiDomain}/news/get?pageNo=${this.pageNo}`)
          .then((data) => {
            let resData = data.data;
            if (resData.code === 0) {
              if (resData.data.length < 15) {
                this.showLoadMore = false;
              }
              this.news = this.news.concat(resData.data);
            }
          })
      },
      goToDetail(id) {
        this.$router.push({name: 'gamedetail', params: {resId: id}});
      },
      clickBanner(id) {
        this.goToDetail(id)
      },
      resultClick(item) {
        this.goToDetail(item.id)
      },
      onChange() {
        if (!this.value) return;
        this.$http.jsonp(`${apiDomain}/resource/find?name=${this.value}`)
          .then((data) => {
            let resData = data.data;
            if (resData.code === 0) {
              this.results = resData.data.Game;
            }
          });
      },
      onSubmit() {
        if (!this.value) this.$vux.toast.text('请输入要搜索的游戏名');
        console.log(this.value)
      },
      onCancel() {
        this.value = '';
      }
    },
    created() {
      this.$http.jsonp(`${apiDomain}/banner/get`)
        .then((data) => {
          let resData = data.data;
          if (resData.code === 0) {
            this.banner = resData.data
          }
        });
      this.$http.jsonp(`${apiDomain}/news/get?pageNo=${this.pageNo}`)
        .then((data) => {
          let resData = data.data;
          if (resData.code === 0) {
            this.news = resData.data;
          }
        })
    },
    activated() {
      console.log(1212)
      this.selectItem = 1;
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

  .news_title {
    font-size: 14px;
    color: #434343;
    height: 40px;
    line-height: 20px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    word-break: break-all;
    font-weight: 600;
  }
</style>
