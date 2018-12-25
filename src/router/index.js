import Vue from 'vue'
import Router from 'vue-router'
import home from '../components/home'
import game from '../components/game'
import gamedetail from '../components/gamedetail'
import movie from '../components/movie'
import moviedetail from '../components/moviedetail'
import novel from '../components/novel'
import newsDetail from '../components/newsDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },{
      path: '/game',
      name: 'game',
      component: game
    },{
      path: '/gamedetail',
      name: 'gamedetail',
      component: gamedetail
    },{
      path: '/movie',
      name: 'movie',
      component: movie
    },{
      path: '/moviedetail',
      name: 'moviedetail',
      component: moviedetail
    },{
      path: '/novel',
      name: 'novel',
      component: novel
    },{
      path: '/newsDetail',
      name: 'newsDetail',
      component: newsDetail
    }
  ]
})
