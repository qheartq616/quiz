import Vue from "vue"
import Vuex from "vuex"

import data from "../store/data"

Vue.use(Vuex)
const SET_INFO = "SET_INFO"
const SET_SCORE = "SET_SCORE"
const SET_TIME = "SET_TIME"

const state = {
  name: "",
  data: data,
  score: 0,
  time: 0
}

const getters = {
  getQAlist: state => {
    let randomNumList = []
    let isExists = false

    let randomQuestionList = []

    // 取出随机数（20道选择题）
    while (randomQuestionList.length < 20) {
      const element = parseInt(Math.random() * state.data.type1.length)
      randomNumList.forEach(value => {
        if (value === element) {
          isExists = true
        }
      })

      if (!isExists) {
        randomNumList.push(element)
        randomQuestionList.push(state.data.type1[element])
      }
      isExists = false
    }

    console.log(JSON.stringify(randomQuestionList))
    
    return randomQuestionList
  }
}

const mutations = {
  [SET_INFO](state, payload) {
    state.name = payload.name
  },
  [SET_SCORE](state, payload) {
    state.score = payload
  },
  [SET_TIME](state, payload) {
    state.time = payload
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions: {},
  modules: {}
})
