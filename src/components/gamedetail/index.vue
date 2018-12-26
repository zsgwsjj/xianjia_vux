<template>
  <div class="game_detail">
    <div style="margin-top: 10px;height: 80%">
      <h1 class="game_name" style="font-weight: bold;font-size: 20px;margin-left: 20px">{{gameDetail.gameName}}</h1>
      <div style="display: flex;margin-left: 20px">
        <img :src="gameDetail.gameIcon" style="width: 45%;"/>
        <div style="margin-left: 15px">
          <div class="info_label">
            <span>游戏类型：</span>
            <div class="game_info">{{gameDetail.gameType}}</div>
          </div>
          <div class="info_label">
            <span>开发厂商：</span>
            <div class="game_info">{{gameDetail.company}}</div>
          </div>
          <div class="info_label">
            <span>游戏语言：</span>
            <div class="game_info">{{gameDetail.gameLanguage}}</div>
          </div>
          <div class="info_label">
            <span>游戏大小：</span>
            <div class="game_info">{{gameDetail.gameSize}}</div>
          </div>
          <div class="info_label">
            <span>上线时间：</span>
            <div class="game_info">{{gameDetail.releaseTime}}</div>
          </div>
          <div class="info_label">
            <span>下载类型：</span>
            <div class="game_info">{{gameDetail.downTypeDesc}}</div>
          </div>
          <div class="rate">9.9</div>
        </div>

      </div>
      <div>
        <x-button style="margin-top: 20px;width: 90%" type="primary" @click.native="getPw">{{downBtnValue}}</x-button>
        <div>
          <divider>游戏介绍</divider>
          <div style="margin:15px;font-size:14px;color: #434343;text-indent:2em;">{{gameDetail.gameDesc}}</div>
          <button-tab v-model="curCom" style="width: 90%;margin-left: 5%">
            <button-tab-item selected @on-item-click="changeCom">最低配置</button-tab-item>
            <button-tab-item @button-tab-border-radius="0" @on-item-click="changeCom">推荐配置</button-tab-item>
          </button-tab>
          <div class="com" :style="'display:'+isMinComShow">
            <ul>
              <li>
                <span>操作系统：</span>
                <p>Windows 7 64bit or better</p>
              </li>
              <load-more style="margin: 0;width: 100%;height: 2px" :show-loading="false"
                         background-color="#434343"></load-more>
              <li>
                <span>CPU：</span>
                <p>Intel Core i3-2100 3.1GHz</p>
              </li>
              <load-more style="margin: 0;width: 100%;height: 2px" :show-loading="false"
                         background-color="#434343"></load-more>
              <li>
                <span>内存：</span>
                <p>6GB RAM</p>
              </li>
              <load-more style="margin: 0;width: 100%;height: 2px" :show-loading="false"
                         background-color="#434343"></load-more>
              <li>
                <span>显卡：</span>
                <p>Nvidia GeForce GTX560ti</p>
              </li>
              <load-more style="margin: 0;width: 100%;height: 2px" :show-loading="false"
                         background-color="#434343"></load-more>
              <li>
                <span>存储空间：</span>
                <p>需要20GB可用空间</p>
              </li>
            </ul>
          </div>
          <div class="com" :style="'display:'+isBestComShow">
            <ul>
              <li>
                <span>操作系统：</span>
                <p>Windows 10 64bit or better</p>
              </li>
              <load-more style="margin: 0;width: 100%;height: 2px" :show-loading="false"
                         background-color="#434343"></load-more>
              <li>
                <span>CPU：</span>
                <p>Intel Core i7-2100 3.1GHz</p>
              </li>
              <load-more style="margin: 0;width: 100%;height: 2px" :show-loading="false"
                         background-color="#434343"></load-more>
              <li>
                <span>内存：</span>
                <p>6GB RAM</p>
              </li>
              <load-more style="margin: 0;width: 100%;height: 2px" :show-loading="false"
                         background-color="#434343"></load-more>
              <li>
                <span>显卡：</span>
                <p>Nvidia GeForce GTX560ti</p>
              </li>
              <load-more style="margin: 0;width: 100%;height: 2px" :show-loading="false"
                         background-color="#434343"></load-more>
              <li>
                <span>存储空间：</span>
                <p>需要20GB可用空间</p>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
    <!--<x-button type="primary" @click.native="clickDownload(gameDetail.id)" style="width: 95%">下载</x-button>-->
  </div>
</template>

<script>
  import {Icon, ButtonTab, ButtonTabItem, XButton, Divider, LoadMore, XHeader, Tab, TabItem} from 'vux'

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
          this.$http.jsonp(`http://127.0.0.1/resource/down?resType=1&resId=${this.gameId}&uid=1`).then(res => {
              console.log(res.data)
              if (res.data.code === 0) {
                this.downloadInfo = res.data.data;
                this.downBtnValue = `密码获取成功，再次点击前往下载`;
              }
            }, fail => {
              console.log(fail)
            }
          )
        } else {
          this.$copyText(this.downloadInfo.pw).then(res => {
            this.$vux.toast.text('密码复制成功', 'top')
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
      demo01_onIndexChange(index) {
        this.demo01_index = index
      },
      resultClick(item) {
        window.alert('you click the result item: ' + JSON.stringify(item))
      },
      getResult(val) {
        console.log('on-change', val)
        this.results = val ? getResult(this.value) : []
      },
      onSubmit() {
        this.$refs.search.setBlur()
        this.$vux.toast.show({
          type: 'text',
          position: 'top',
          text: 'on submit'
        })
      },
      onFocus() {
        console.log('on focus')
      },
      onCancel() {
        console.log('on cancel')
      },
      clickDownload(id) {
        this.$http.jsonp(`http://127.0.0.1/resource/down?resType=1&resId=${id}&uid=1`)
          .then((data) => {
            let resData = data.data
            if (resData.code === 0) {
              console.log(resData.data)
              window.location.href = resData.data.downUrl;
            }
          })
      }
    },
    created() {
      let gameId = this.$route.params.resId;
      this.gameId = gameId;
      this.$http.jsonp(`http://127.0.0.1/resource/detail?resType=1&resId=${gameId}`)
        .then((data) => {
          let resData = data.data
          if (resData.code === 0) {
            this.gameDetail = resData.data
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
