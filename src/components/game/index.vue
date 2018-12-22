<template>
  <div class="game">
    <tab style="margin-top: 0">
      <tab-item selected @on-item-click="onItemClick">热门</tab-item>
      <tab-item @on-item-click="onItemClick(1)">最新</tab-item>
      <tab-item @on-item-click="onItemClick(2)">评分</tab-item>
    </tab>
    <scroller height="-40px" lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
      <div>
        <div v-for="item in games" :key="item.id" style="margin-top: 10px" @click="goToDetail(item.id)">
          <div style="display: flex;margin-left: 20px">
            <img :src="item.gameIcon" style="width: 90px;height: 120px"/>
            <div style="margin-left: 15px">
              <div style="font-size: 20px">{{item.gameName}}</div>
              <div style="display: flex;margin-top: 10px">
                <div class="game_info_list">
                  <p>类型：动作游戏</p>
                  <p>更新：2018-01-01</p>
                  <p>评分：9.9</p>
                </div>
                <div class="game_info_list" style="margin-left: 10px">
                  <p>平台：PC</p>
                  <p>语言：英语</p>
                  <p>大小：40G</p>
                </div>
              </div>
            </div>
          </div>
          <load-more style="margin: 0.8em;width: 100%;height: 2px" :show-loading="false"
                     background-color="#434343"></load-more>
        </div>
        <load-more tip="loading"></load-more>
      </div>
    </scroller>
  </div>
</template>


<script>
  import {Scroller, LoadMore, XHeader, Tab, TabItem} from 'vux'

  export default {
    components: {
      LoadMore,
      XHeader,
      Tab,
      TabItem,
      Scroller
    },
    name: 'Game',
    data() {
      return {
        pageNo: 1,
        showLoading: false,
        showNoData: false,
        results: [],
        value: '',
        games: [],
        showList1: true,
        scrollTop: 0,
        onFetching: false,
        bottomCount: 20
      }
    },
    methods: {
      goToDetail(id) {
        this.$router.push({name: 'gamedetail', params: {resId: id}});
      },
      loadMore() {
        this.pageNo = this.pageNo + 1;
        this.$http.jsonp(`http://127.0.0.1:8111/resource/game?pageNo=${this.pageNo}&pageSize=15`)
          .then((data) => {
            let resData = data.data;
            if (resData.code === 0) {
              this.games = this.games.concat(resData.data);
            }
          })
      },
      onScrollBottom() {
        if (this.onFetching) {
          // do nothing
        } else {
          this.onFetching = true;
          setTimeout(() => {
            this.loadMore();
            this.$nextTick(() => {
              this.$refs.scrollerBottom.reset()
            });
            this.onFetching = false
          }, 2000)
        }
      },
      onScroll(pos) {
        this.scrollTop = pos.top
      },
      onCellClick() {
        window.alert('cell click')
      },
      onClickButton() {
        window.alert('click')
      },
      changeList() {
        this.showList1 = false
        this.$nextTick(() => {
          this.$refs.scroller.reset({
            top: 0
          })
        })
      }
    },
    mounted() {
      this.$http.jsonp(`http://127.0.0.1:8111/resource/game?pageNo=${this.pageNo}&pageSize=15`)
        .then((data) => {
          let resData = data.data;
          if (resData.code === 0) {
            this.games = resData.data
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
    color: gray;
  }
  .game_info_list{
    font-size: 14px;
    color: #959595;
  }
</style>
