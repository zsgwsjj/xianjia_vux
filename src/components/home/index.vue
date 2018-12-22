<template>
  <div>
    <tab style="margin-top: 0">
      <tab-item selected @on-item-click="onItemClick">首页</tab-item>
      <tab-item @on-item-click="onItemClick(1)">单机</tab-item>
      <tab-item @on-item-click="onItemClick(2)">电影</tab-item>
      <tab-item @on-item-click="onItemClick(3)">小说</tab-item>
    </tab>
    <swiper
      :auto="true"
      @on-index-change="bannerIndexChange"
    >
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
      <div style="height: 100px">
        <div style="display: flex">
          <div>
            <div class="news_title" style="font-size: 15px;height: 70%">ANIMUS启动！《荣耀战魂》X《刺客信条》联动活动公布</div>
            <div style="font-size: 14px;color: #999;display: flex">
              <div style="width: 60%">游戏</div>
              <div>1小时之前</div>
            </div>
          </div>
          <img style="margin-left: 10px;width: 112px;height: 72px"
               src="https://img.3dmgame.com/uploads/images/thumbnews/2018/1222/1545471341392.jpg"/>
        </div>
        <load-more style="margin: 0.5em 0 0;" :show-loading="false"
                   background-color="#434343"></load-more>
      </div>
    </div>

  </div>

</template>

<script>
  import {Tab, TabItem, LoadMore, Divider, XHeader, Swiper, Search, Toast} from 'vux'
  import SwiperItem from "vux/src/components/swiper/swiper-item";

  export default {
    components: {
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
        banner: [],
        toastShow: 1,
        results: [],
        value: '',
        hotGames: [],
        bannerIndex: 0,
      }
    },
    methods: {
      onItemClick(index) {
        if (index === 1) {
          this.$router.push({name: 'game'});
        } else if (index === 2) {
          this.$router.push({name: 'movie'});
        }
      },
      goToDetail(id) {
        this.$router.push({name: 'gamedetail', params: {resId: id}});
      },
      bannerIndexChange(index) {
        this.bannerIndex = index;
      },
      clickBanner(id) {
        this.goToDetail(id)
      },
      demo01_onIndexChange(index) {
        this.demo01_index = index
      },
      resultClick(item) {
        this.goToDetail(item.id)
      },

      onChange() {
        if (!this.value) return;
        this.$http.jsonp(`http://127.0.0.1:8111/resource/find?name=${this.value}`)
          .then((data) => {
            let resData = data.data
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
      this.$http.jsonp('http://127.0.0.1:8111/banner/get')
        .then((data) => {
          let resData = data.data
          if (resData.code === 0) {
            this.banner = resData.data
          }
        });
      this.$http.jsonp('http://127.0.0.1:8111/resource/game?pageNo=1&pageSize=4')
        .then((data) => {
          let resData = data.data
          if (resData.code === 0) {
            this.hotGames = resData.data
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
