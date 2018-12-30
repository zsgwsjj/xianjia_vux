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
      component: home,
      // meta: { keepAlive: true },//当前的.vue文件需要缓存
    },{
      path: '/game',
      name: 'game',
      component: game,
      meta: { keepAlive: true },//当前的.vue文件需要缓存
    },{
      path: '/gamedetail',
      name: 'gamedetail',
      component: gamedetail,
    },{
      path: '/movie',
      name: 'movie',
      component: movie,
      meta: { keepAlive: true },//当前的.vue文件需要缓存
    },{
      path: '/moviedetail',
      name: 'moviedetail',
      component: moviedetail
    },{
      path: '/novel',
      name: 'novel',
      component: novel,
      meta: { keepAlive: true },//当前的.vue文件需要缓存
    },{
      path: '/newsDetail',
      name: 'newsDetail',
      component: newsDetail
    }
  ]
})
