<template>
  <div>
    <div class="game_detail" v-html="detail.movieDetail"></div>
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
      console.log(this.$route.params)
      this.detail = this.$route.params;
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .game_detail {
    margin: 20px;
  }

  .game_detail >>> img {
    width: 20em;
    margin-top: 10px;
  }

  .game_detail >>> ul a{
    display: none;
  }
</style>
