<template>
  <div class="game_detail">
    <!--<div style="margin-top: 10px;height: 80%">-->
      <!--<h1 class="game_name" style="font-weight: bold;font-size: 20px;margin-left: 20px">无双 無雙-->
        <!--【WEB-DL1080p/4k国语中字】【剧情/动作/犯罪】【2018】【中国大陆/香港】</h1>-->
      <!--<div style="display: flex;margin-left: 20px">-->
        <!--<img style="width: 10em;height: 14em" src="http://wx1.sinaimg.cn/mw690/a561b538ly1fye2zbzte3j20ju0rsn1e.jpg"/>-->
        <!--<div style="margin-left: 15px">-->
          <!--<div class="info_label">-->
            <!--<span>导演：</span>-->
            <!--<div class="game_info">-->
              <!--<a href="https://movie.douban.com/celebrity/1014716/">庄文强</a>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="info_label">-->
            <!--<span>编剧：</span>-->
            <!--<div class="game_info">-->
              <!--<a href="https://movie.douban.com/celebrity/1014716/">庄文强</a>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="info_label">-->
            <!--<span>类型：</span>-->
            <!--<div class="game_info">剧情 / 动作 / 犯罪</div>-->
          <!--</div>-->
          <!--<div class="info_label">-->
            <!--<span>上映日期：</span>-->
            <!--<div class="game_info">2018-09-30(中国大陆) / 2018-10-04(香港)</div>-->
          <!--</div>-->
          <!--<div class="info_label">-->
            <!--<span>片长：</span>-->
            <!--<div class="game_info">130分钟</div>-->
          <!--</div>-->
          <!--<div class="info_label">-->
            <!--<span>IMDb：</span>-->
            <!--<div class="game_info">-->
              <!--<a href="http://www.imdb.com/title/tt7183578">无双</a>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="rate">9.9</div>-->
        <!--</div>-->

      <!--</div>-->
      <!--<tab>-->
        <!--<tab-item selected @on-item-click="onItemClick">简介</tab-item>-->
        <!--<tab-item @on-item-click="onItemClick">下载</tab-item>-->
      <!--</tab>-->
      <!--<div :style="'display:'+isMovieDescShow">-->
        <!--<div style="margin:15px;font-size:14px;color: #434343;text-indent:2em;">无双 無雙-->
          <!--【WEB-DL1080p/4k国语中字】【剧情/动作/犯罪】【2018】【中国大陆/香港】简介：《无双》讲述了以代号“画家”（周润发-->
          <!--饰）为首的犯罪团伙，掌握了制造伪钞技术，难辨真伪，并在全球进行交易获取利益，引起警方高度重视。然而“画家”和其他成员的身份一直成谜，警方的破案进度遭受到了前所未有的挑战。在关键时刻，擅长绘画的李问（郭富城-->
          <!--饰）打开了破案的突破口，而“画家”的真实身份却让众人意想不到……-->
        <!--</div>-->
      <!--</div>-->
      <!--<div :style="'display: '+isDownPageShow" style="width: 90%;font-size: 14px;margin:10px">-->
        <!--<p><a href="magnet:?xt=urn:btih:DAD73CB4C47D8BEBB3DB0856C0E59674854B7B54" target="_self">无双.Project.Gutenberg.2018.4K&amp;1080p.4in1.WEB-DL.HEVC&amp;AVC.AAC-HQC.mp4</a>（内含多版）-->
        <!--</p>-->
        <!--<load-more style="margin: 0.8em;width: 100%;height: 2px" :show-loading="false"-->
                   <!--background-color="#434343"></load-more>-->
        <!--<p><a href="magnet:?xt=urn:btih:DAD73CB4C47D8BEBB3DB0856C0E59674854B7B54" target="_self">无双.Project.Gutenberg.2018.4K&amp;1080p.4in1.WEB-DL.HEVC&amp;AVC.AAC-HQC.mp4</a>（内含多版）-->
        <!--</p></div>-->
    <!--</div>-->
    <!--<x-button type="primary" @click.native="clickDownload(gameDetail.id)" style="width: 95%">下载</x-button>-->
    <div v-html="detail.movieDetail"></div>
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
        detail:{},
      }
    },
    methods: {
    },
    created() {
      console.log(this.$route.params)
      this.detail = this.$route.params;
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
  }

  .info_label {
    font-size: 15px;
    display: flex;
    color: gray;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
  }

  .info_label span {
    font-size: 15px;
    width: 75px;
    color: gray;
  }

  .info_label div {
    font-size: 15px;
    color: gray;
  }

  .com ul li {
    display: flex;
    text-align: left;
    text-indent: 12px;
    line-height: 40px;
    font-size: 14px;
    color: #434343;
  }

  .com ul li span {
    text-align: left;
    text-indent: 12px;
    line-height: 40px;
    font-size: 14px;
    color: #434343;
    width: 96px;
  }

  .com ul li p {
    text-align: left;
    text-indent: 12px;
    line-height: 40px;
    font-size: 14px;
    color: #434343;
  }

  .game_name {
    color: #434343;
    font-size: 18px;
    display: block;
    overflow: hidden;
    text-align: left;
    line-height: 26px;
    margin: 15px 0;
  }

  .rate {
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    font-size: 4rem;
    margin-top: 10px;
    margin-left: 2rem;
    color: #1AAD19;
    font-weight: bold;
  }

</style>
