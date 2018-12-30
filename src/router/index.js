import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home/Home'
import game from '../components/game/Game'
import gamedetail from '../components/game/GameDetail'
import movie from '../components/movie/Movie'
import moviedetail from '../components/movie/MovieDetail'
import novel from '../components/novel/Novel'
import newsDetail from '../components/home/NewsDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        // keepAlive: true,
        info: '咸嘉资源系统'
      },
      component: home,
      // meta: { },//当前的.vue文件需要缓存
    }, {
      path: '/game',
      name: 'game',
      meta: {
        keepAlive: true,
        info: '游戏'
      },
      component: game,
    }, {
      path: '/gamedetail',
      name: 'gamedetail',
      meta: {
        info: '游戏详情',
      },
      component: gamedetail,
    }, {
      path: '/movie',
      name: 'movie',
      meta: {
        info: '电影',
        keepAlive: true
      },
      component: movie,
    }, {
      path: '/moviedetail',
      name: 'moviedetail',
      meta: {
        info: '电影详情',
      },
      component: moviedetail
    }, {
      path: '/novel',
      name: 'novel',
      component: novel,
      meta: {
        info: '小说',
        keepAlive: true
      },
    }, {
      path: '/newsDetail',
      info: '新闻详情',
      meta: {
        info: '新闻详情'
      },
      name: 'newsDetail',
      component: newsDetail
    }
  ]
})
