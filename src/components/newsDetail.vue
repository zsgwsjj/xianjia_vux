<template>
  <div style="margin: 10px">
    <div style="font-weight: bold;display: block;line-height: 28px;font-size: 18px;color: #434343;margin-bottom: 12px">
      {{detail.title}}
    </div>
    <div style="color: #999;font-size: 12px">{{detail.newsTime}}</div>
    <div class="content" style="margin-top: 20px;line-height: 24px;color: #434343;font-size: 15px"
         v-html="content"></div>
  </div>
</template>

<script>
  import {Tab, TabItem, LoadMore, Divider, XHeader, Swiper, Search, Toast} from 'vux'
  import SwiperItem from "vux/src/components/swiper/swiper-item";
  import {apiDomain} from "../comm";

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
        detail: {},
        content: '',
      }
    },
    methods: {},
    created() {
      let detail = this.$route.params;
      this.detail = detail;
      this.$http.jsonp(`${apiDomain}/news/get/content?newsId=${detail.id}`)
        .then((data) => {
          let resData = data.data;
          if (resData.code === 0) {
            this.content = resData.data;
          }
        });
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

  .content >>> img {
    width: 100%;
    display: block;
    margin: 10px auto;
  }

  .content >>> a {
    color: #969696
  }

  .content >>> iframe {
    max-width: 100%;
    margin: 0 auto;
    height: 225px;
  }
</style>
