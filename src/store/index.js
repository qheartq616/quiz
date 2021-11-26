import Vue from "vue";
import Vuex from "vuex";

import data from "../store/data";

Vue.use(Vuex);
const SET_INFO = "SET_INFO";
const SET_SCORE = "SET_SCORE";
const SET_TIME = "SET_TIME";

const state = {
  area: "",
  street: "",
  name: "",
  phone: "",
  data: data,
  score: 0,
  time: 0
};

const getters = {
  getQAlist: state => {
    let randomNumList1 = [];
    let randomNumList2 = [];
    let randomNumList3 = [];
    let isExists = false;
    //取出随机数
    for (let index = 0; index < 100; index++) {
      const element = parseInt(Math.random() * 60);
      if (randomNumList1.length == 3) {
        break;
      }
      randomNumList1.forEach(value => {
        if (value === element) {
          isExists = true;
        }
      });

      if (!isExists) {
        randomNumList1.push(element);
      }
      isExists = false;
    }
    //取出随机数
    randomNumList2.push(parseInt(Math.random() * 24));
    //取出随机数
    for (let index = 0; index < 100; index++) {
      const element = parseInt(Math.random() * 96);
      if (randomNumList3.length == 6) {
        break;
      }
      randomNumList3.forEach(value => {
        if (value === element) {
          isExists = true;
        }
      });

      if (!isExists) {
        randomNumList3.push(element);
      }
      isExists = false;
    }

    return [
      state.data.type1[randomNumList1[0]],
      state.data.type1[randomNumList1[1]],
      state.data.type1[randomNumList1[2]],
      state.data.type2[randomNumList2[0]],
      //state.data.type2[1],
      state.data.type3[randomNumList3[0]],
      state.data.type3[randomNumList3[1]],
      state.data.type3[randomNumList3[2]],
      state.data.type3[randomNumList3[3]],
      state.data.type3[randomNumList3[4]],
      state.data.type3[randomNumList3[5]]
    ];
  }
};

const mutations = {
  [SET_INFO](state, payload) {
    state.area = payload.area;
    state.street = payload.street;
    state.name = payload.name;
    state.phone = payload.phone;
  },
  [SET_SCORE](state, payload) {
    state.score = payload;
  },
  [SET_TIME](state, payload) {
    state.time = payload;
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions: {},
  modules: {}
});
