<template>
  <div class="game_detail">
    <div style="margin-top: 10px;height: 80%">
      <h1 class="game_name" style="font-weight: bold;font-size: 20px;margin-left: 20px">{{gameDetail.gameName}}</h1>
      <div style="display: flex;margin-left: 20px">
        <img :src="gameDetail.gameIcon" style="width: 9em;height: 13em"/>
        <div style="margin-left: 15px">
          <div class="info_label">
            <span>游戏类型：</span>
            <div class="game_info">{{gameDetail.gameType}}</div>
          </div>
          <!--<div class="info_label">-->
          <!--<span>开发厂商：</span>-->
          <!--<div class="game_info">{{gameDetail.company}}</div>-->
          <!--</div>-->
          <div class="info_label">
            <span>游戏语言：</span>
            <div class="game_info">{{gameDetail.gameLanguage}}</div>
          </div>
          <!--<div class="info_label">-->
          <!--<span>游戏大小：</span>-->
          <!--<div class="game_info">{{gameDetail.gameSize}}</div>-->
          <!--</div>-->
          <div class="info_label">
            <span>上线时间：</span>
            <div class="game_info">{{gameDetail.releaseTime}}</div>
          </div>
          <div class="info_label">
            <span>下载类型：</span>
            <div class="game_info">{{gameDetail.downTypeDesc}}</div>
          </div>
          <div style="margin-top: 40px" class="rate">{{gameDetail.gameRate}}</div>
        </div>

      </div>
      <div>
        <x-button style="margin-top: 20px;width: 90%" type="primary" @click.native="getPw">{{downBtnValue}}</x-button>
        <div>
          <divider>游戏介绍</divider>
          <div class="game_desc" v-html="gameDetail.gameDesc"></div>
          <button-tab v-model="curCom" v-show="comPz" style="width: 90%;margin-left: 5%">
            <button-tab-item selected @on-item-click="changeCom">最低配置</button-tab-item>
            <button-tab-item @button-tab-border-radius="0" @on-item-click="changeCom">推荐配置</button-tab-item>
          </button-tab>
          <div class="com" v-html="gameDetail.minPz" :style="'display:'+isMinComShow"></div>
          <div v-html="gameDetail.bestPz" class="com" :style="'display:'+isBestComShow"></div>
        </div>
      </div>
    </div>
    <!--<x-button type="primary" @click.native="clickDownload(gameDetail.id)" style="width: 95%">下载</x-button>-->
  </div>
</template>

<script>
  import {Icon, ButtonTab, ButtonTabItem, XButton, Divider, LoadMore, XHeader, Tab, TabItem} from 'vux'
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
        comPz: true,
        downBtnValue: '下载',
        gameId: 1,
        isMinComShow: 'block',
        isBestComShow: 'none',
        curCom: 0,
        banner: [],
        demo01_index: 1,
        results: [],
        value: '',
        gameDetail: {},
        demo01: 0,
        downloadInfo: {},
      }
    },
    methods: {
      getPw() {
        if (!this.downloadInfo.pw) {
          this.$http.jsonp(`${apiDomain}/game/download?gameId=${this.gameId}&uid=1`).then(res => {
              console.log(res.data)
              if (res.data.code === 0) {
                let resData = res.data.data;
                if (!resData.pw) {
                  window.location.href = resData.downUrl;
                } else {
                  this.downloadInfo = res.data.data;
                  this.downBtnValue = `密码获取成功，再次点击前往下载`;
                }
              }
            }, fail => {
              console.log(fail)
            }
          )
        } else {
          this.$copyText(this.downloadInfo.pw).then(res => {
            this.$vux.toast.text('密码复制成功', 'top');
            window.location.href = this.downloadInfo.downUrl;
          }, fail => {
            console.log("fail", fail)
          })
        }

      },
      changeCom(index) {
        this.isMinComShow = index === 0 ? 'block' : 'none';
        this.isBestComShow = index === 1 ? 'block' : 'none';
      },
    },
    created() {
      let newGameId = this.$route.params.resId;
      if (newGameId) {
        this.gameId = newGameId;
        localStorage.setItem('gameId', newGameId);
      } else {
        let gameId = localStorage.getItem('gameId');
        this.gameId = gameId;
        newGameId = gameId;
      }
      this.$http.jsonp(`${apiDomain}/game/detail?gameId=${newGameId}`)
        .then((data) => {
          let resData = data.data;
          if (resData.code === 0) {
            this.gameDetail = resData.data;
            if (!resData.data.minPz || !resData.data.bestPz) {
              this.comPz = false;
            }
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
    font-size: 14px;
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

  .com >>> ul {
    margin: 10px 20px 20px;
    list-style: none;
    text-align: left;
    line-height: 40px;
    font-size: 14px;
    color: #434343;
  }

  .com >>> li {
    display: flex;
  }

  .com >>> span {
    width: 96px;
  }

  .game_desc >>> .morbtn {
    display: none;
  }

  .game_desc {
    margin: 10px 20px 20px;
    font-size: 14px;
    color: #434343;
    /*text-indent: 2em;*/
  }

  .game_desc >>> h3 {
    margin-top: 10px;
  }

  .game_desc >>> h3:before {
    display: inline-block;
    content: '';
    width: 5px;
    height: 18px;
    background: #1AAD19;
    border-radius: 2px;
    vertical-align: middle;
    margin: 0 2px 3px 0;
    text-indent: 0;
  }

  .game_desc >>> h3 h3:last-child {
    display: none;
  }
</style>
