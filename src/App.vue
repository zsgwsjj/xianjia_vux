<template>
  <div id="app" class="scrollTop">
    <x-header style="background-color:#000;" :left-options="{showBack: showBack}">{{title}}</x-header>
    <!--<div style="display: flex">-->
    <!--<div class="title" style=" height: 42px;width: 4em">-->
    <!--<img src="./assets/logo.png" style="margin-left: 10px;height: 42px"/>-->
    <!--</div>-->
    <!--<div class="sys_title">咸嘉资源系统</div>-->
    <!--<icon style="font-size: 20px;margin-left: 8.8em;margin-top: 10px" type="search"></icon>-->
    <!--</div>-->
    <!--<load-more style="margin: 0;width: 100%;height: 2px" :show-loading="false"-->
    <!--background-color="#434343"></load-more>-->
    <div class="top_btn" @click="toTop" v-show="isTopShow">
      <img src="./assets/top.png"/>
    </div>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  import {Search, Icon, LoadMore, XHeader} from 'vux'

  export default {
    components: {
      Search,
      XHeader,
      LoadMore,
      Icon
    },
    name: 'app',
    data() {
      return {
        title: '咸嘉资源系统',
        showBack: true,
        isTopShow: false,
        isSearchShow: false
      }
    },
    methods: {


      toTop() {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
      },
      toTopIsShow() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        this.isTopShow = scrollTop > 800;
      },
      changeTitle() {
        this.showBack = this.$route.name !== 'home';
        this.title = this.$route.meta.info;
      }
    },
    watch: {
      $route() {
        this.changeTitle()
      }
    },
    mounted() {
      this.changeTitle();
      window.addEventListener('scroll', this.toTopIsShow)
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  body {
    background-color: #fbf9fe;
  }

  .sys_title {
    width: 6.5em;
    margin-top: 0.5em;
    color: #434343;
    font-weight: bold;
  }

  .top_btn {
    position: fixed;
    height: 30px;
    width: 30px;
    z-index: 1000;
    left: 20em;
    top: 43em;
  }

  .top_btn img {
    height: 100%;
    width: 100%;
  }

  .top_btn:hover {

  }

  .vux-x-icon {
    fill: white;
  }
</style>
