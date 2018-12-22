<template>
  <div id="app">
    <div style="display: flex">
      <div class="title" style=" height: 42px;width: 4em">
        <img src="./logo.png" style="margin-left: 10px;height: 42px"/>
      </div>
      <div class="sys_title">咸嘉资源系统</div>
      <icon style="font-size: 20px;margin-left: 9em;margin-top: 10px" type="search"></icon>
    </div>
    <load-more style="margin: 0;width: 100%;height: 2px" :show-loading="false"
               background-color="#434343"></load-more>
    <router-view></router-view>
  </div>
</template>

<script>
  import {Icon ,LoadMore} from 'vux'

  export default {
    components: {
      LoadMore,
      Icon
    },
    name: 'app'
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  body {
    background-color: #fbf9fe;
  }

  .sys_title{
    width: 6em;
    margin-top: 0.5em;
    color: #434343;
    font-weight: bold;
  }
</style>
