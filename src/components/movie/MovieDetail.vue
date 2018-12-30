<template>
  <div style="margin: 10px;">
    <div style="display: flex">
      <img style="width: 7em;height: 9.5em" :src="detail.movieImgUrl"/>
      <h3 style="margin-left: 10px;width: 14em">{{detail.movieTitle}}</h3>
    </div>
    <divider>电影介绍</divider>
    <div class="game_detail" v-html="detail.movieDetail"></div>
    <divider>电影下载</divider>
    <div style="font-size: 12px" v-for="item in detail.downInfos" :key="item.id">
        <div style="display: flex">
          <div  class="down_label">下载地址：</div>
          <a class="down_url" :href="item.downUrl">{{item.downDesc}}</a>
        </div>
        <div style="display: flex" v-if="item.pw">
          <div class="down_label">密码：</div>
          <div class="down_url">{{item.pw}}</div>
        </div>
      <load-more style="margin: 0.8em;width: 98%;height: 2px" :show-loading="false"
                 background-color="#434343"></load-more>
    </div>
  </div>
</template>

<script>
  import {ButtonTab, ButtonTabItem, Divider, Icon, LoadMore, Tab, TabItem, XButton, XHeader} from 'vux'
  import {apiDomain} from '../../comm';

  export default {
    components: {
      Icon,
      ButtonTab, ButtonTabItem,
      XButton,
      LoadMore,
      Divider,
      XHeader,
      Tab,
      TabItem
    },
    name: 'Game',
    data() {
      return {
        detail: {},
      }
    },
    methods: {},
    created() {
      let movieId = this.$route.params.id;
      if (movieId) {
        localStorage.setItem('newMovieId', movieId);
      } else {
        movieId = localStorage.getItem('newMovieId');
      }
      this.$http.jsonp(`${apiDomain}/movie/get/detail?id=${movieId}`)
        .then((data) => {
          let resData = data.data;
          if (resData.code === 0) {
            this.detail = resData.data
          }
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .game_detail {
    font-size: 13px;
  }

  .game_detail >>> img {
    width: 20em;
    margin-top: 10px;
  }

  .game_detail >>> ul a {
    display: none;
  }

  .down_label {
    width: 5.5em;
  }

  .down_url {
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    width: 20em;
    margin-left: 10px;
  }
</style>
