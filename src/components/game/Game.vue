<template>
  <div class="game">
    <tab style="margin-top: 0">
      <tab-item selected @on-item-click="onItemClick(1)">热门</tab-item>
      <tab-item @on-item-click="onItemClick(2)">最新</tab-item>
      <!--<tab-item @on-item-click="onItemClick(2)">评分</tab-item>-->
    </tab>
    <scroller lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
      <div>
        <div v-for="item in games" :key="item.id" style="margin-top: 10px"
             @click="goToDetail(item.id)">
          <div style="display: flex;margin-left: 20px">
            <div class="game_icon">
              <img :src="item.gameIcon" style="width: 90px;height: 120px"/>
            </div>
            <div style="margin-left: 15px">
              <div style="font-size: 20px">{{item.gameName}}</div>
              <div style="display: flex;margin-top: 10px">
                <div class="game_info_list" style="width: 8.5em">
                  <p>类型：{{item.gameType}}</p>
                  <p>上线：{{item.releaseTime}}</p>
                  <p>评分：{{item.gameRate}}</p>
                </div>
                <div class="game_info_list" style="margin-left: 10px">
                  <p>平台：{{item.platform}}</p>
                  <p>语言：{{item.gameLanguage}}</p>
                  <!--<p>大小：{{item.gameSize}}</p>-->
                </div>
              </div>
            </div>
          </div>
          <load-more style="margin: 0.8em;width: 100%;height: 2px" :show-loading="false"
                     background-color="#434343"></load-more>
        </div>
        <load-more tip="loading" :show-loading="showLoading"></load-more>
      </div>
    </scroller>
  </div>
</template>


<script>
  import {Scroller, LoadMore, XHeader, Tab, TabItem} from 'vux'
  import {apiDomain} from '../../comm';

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
        listType: 1,
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
      onItemClick(itemId) {
        this.listType = itemId;
        this.pageNo = 1;
        this.games = [];
        this.getGameData(true);
        this.$refs.scrollerBottom.reset()
      },
      goToDetail(id) {
        this.$router.push({name: 'gamedetail', params: {resId: id}});
      },
      loadMore() {
        this.pageNo = this.pageNo + 1;
        this.showLoading = true;
        this.getGameData();
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
        this.showList1 = false;
        this.$nextTick(() => {
          this.$refs.scroller.reset({
            top: 0
          })
        })
      },
      getGameData() {
        this.$http.jsonp(`${apiDomain}/game/get?pageNo=${this.pageNo}&listType=${this.listType}`)
          .then((data) => {
            let resData = data.data;
            if (resData.code === 0) {
              this.games = this.games.concat(resData.data);
            }
          })
      }
    },
    mounted() {
      this.getGameData();
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

  .game_info_list {
    font-size: 14px;
    color: #959595;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .game_icon {
    width: 90px;
    height: 120px
  }
</style>
