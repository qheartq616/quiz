<template>
  <div class="list-box">
    <div class="bg-pic">
      <img src="../assets/bg.jpg" alt="" :style="animateBg" />
    </div>
    <div class="car"></div>
    <div class="pen"></div>
    <div class="wheel" :style="animateWheel"></div>
    <div :class="['woman', animateShow ? 'an-woman' : 'an-woman2']"></div>
    <div class="list-content">
      <p class="title">第{{ listIndex + 1 }}/10题</p>
      <div class="question">
        {{ listTypeText + getQAlist[listIndex].title }}
      </div>
      <ul class="answer">
        <li v-for="(item, index) in getQAlist[listIndex].list" :key="index">
          <div
            :class="['circle', userClickList.includes(index) ? 'active' : '']"
            @click="handleUserClick(index)"
          >
            <b></b>
          </div>
          <div class="text">{{ item }}</div>
        </li>
      </ul>
    </div>
    <div
      class="next-btn"
      @click="handleNextClick()"
      v-show="!subMitBtnShow"
    ></div>
    <div
      class="submit-btn"
      v-show="subMitBtnShow"
      @click="handleNextClick()"
    ></div>
  </div>
</template>
<script>
// @ is an alias to /src
import axios from "axios";
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  name: "List",
  data() {
    return {
      animateShow: false,
      screenBg: 0,
      listIndex: 0, //当前第几题
      subMitBtnShow: false, //显示提交按钮
      userScore: 0,
      userClickList: [], //当前题目用户填写答案
      timer: null,
      userTime: 0
    };
  },
  computed: {
    animateBg() {
      return {
        transform: "translate(-" + this.screenBg + "px, 0)",
        transition: "all 2s"
      };
    },
    animateWheel() {
      return {
        transform: "rotate(" + this.screenBg + "deg)",
        transition: "all 2s"
      };
    },
    animateWoman() {
      return {
        transform: "translate(-" + this.screenBg + "px, 0)",
        transition: "all 2s"
      };
    },
    listTypeText() {
      let text = "【单选题】";
      if (this.listIndex == 3) {
        text = "【多选题】";
      }
      if (this.listIndex > 3) {
        text = "【判断题】";
      }
      return text;
    },
    ...mapGetters(["getQAlist"]),
    ...mapState(["area", "street", "name", "phone", "score", "time"])
  },
  components: {},
  methods: {
    ...mapMutations(["SET_SCORE", "SET_TIME"]),
    handleNextClick() {
      let screenw =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

      if (this.userClickList.length == 0) {
        alert("请选择答案！");
      } else {
        let formatAnswerList = [];
        let isWrong = false;
        this.userClickList.forEach(value => {
          switch (value) {
            case 0:
              this.listIndex > 3
                ? formatAnswerList.push("对")
                : formatAnswerList.push("A");
              break;
            case 1:
              this.listIndex > 3
                ? formatAnswerList.push("错")
                : formatAnswerList.push("B");
              break;
            case 2:
              formatAnswerList.push("C");
              break;
            case 3:
              formatAnswerList.push("D");
              break;
            default:
              formatAnswerList = null;
          }
        });
        console.log(
          formatAnswerList,
          this.getQAlist[this.listIndex].answer,
          formatAnswerList == this.getQAlist[this.listIndex].answer,
          this.getQAlist[this.listIndex].answer.includes("对")
        );

        if (
          formatAnswerList.length ===
          this.getQAlist[this.listIndex].answer.length
        ) {
          this.getQAlist[this.listIndex].answer.forEach(value => {
            if (!formatAnswerList.includes(value)) {
              isWrong = true;
            }
          });
          if (!isWrong) {
            this.userScore += 10;
          }
        }
        if (this.listIndex === 9) {
          this.SET_SCORE(this.userScore);
          this.SET_TIME(this.userTime);
          axios
            .post("/score/api/score/save", {
              phone: this.phone,
              nickName: this.name,
              score: this.score,
              seconds: this.time,
              region: this.area,
              address: this.street
            })
            .then(function(response) {
              console.log(response);
            })
            .catch(function(error) {
              console.log(error);
            });
          this.$router.replace({ path: "score" });
          return;
        }

        this.animateShow = !this.animateShow;
        this.screenBg += screenw;
        this.listIndex += 1;
        if (this.listIndex == 9) {
          this.subMitBtnShow = true;
        }

        this.userClickList = []; //清空答案选项
        formatAnswerList = []; //清空答案选项
        isWrong = false;
      }
    },
    handleUserClick(index) {
      if (this.listIndex == 3) {
        let isExists = false;
        this.userClickList.forEach(value => {
          if (value === index) {
            isExists = true;
          }
        });
        isExists
          ? this.userClickList.splice(
              this.userClickList.findIndex(item => item === index),
              1
            )
          : this.userClickList.push(index);
      } else {
        this.userClickList = [index];
      }
    }
  },
  created() {
    this.timer = setInterval(() => {
      this.userTime += 1;
    }, 1000);
  },
  mounted() {},
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>
<style scoped lang="less">
.list-box {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .bg-pic {
    height: 100%;
    img {
      height: 100%;
      width: auto;
      max-width: none;
    }
  }
  .car {
    width: 4.56rem;
    height: 1.73rem;
    background: url(../assets/3.png) no-repeat center center/auto 100%;
    position: absolute;
    bottom: 0.63rem;
    left: -1.8rem;
  }
  .wheel {
    width: 0.77rem;
    height: 0.77rem;
    background: url(../assets/4.png) no-repeat center center/auto 100%;
    position: absolute;
    bottom: 0.33rem;
    left: 1.5rem;
  }
  .pen {
    width: 1.27rem;
    height: 0.34rem;
    background: url(../assets/6.png) no-repeat center center/auto 100%;
    position: absolute;
    top: 0.87rem;
    right: 0.3rem;
    z-index: 5;
  }
  .woman {
    width: 3.03rem;
    height: 3.53rem;
    background: url(../assets/2.png) no-repeat center center/auto 100%;
    position: absolute;
    bottom: -3.53rem;
    right: 0;
    z-index: 5;
  }
  .an-woman {
    -webkit-animation: anwoman 0.5s linear forwards;
    animation: anwoman 0.5s linear forwards;
  }
  .an-woman2 {
    -webkit-animation: anwoman2 0.5s linear forwards;
    animation: anwoman2 0.5s linear forwards;
  }
  .next-btn {
    width: 2.04rem;
    height: 0.7rem;
    background: url(../assets/5.png) no-repeat center center/auto 100%;
    position: absolute;
    bottom: 1.47rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }
  .submit-btn {
    width: 2.04rem;
    height: 0.7rem;
    background: url(../assets/7.png) no-repeat center center/auto 100%;
    position: absolute;
    bottom: 1.47rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }
  .list-content {
    width: 6.1rem;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 0.24rem;
    position: absolute;
    top: 1.02rem;
    left: 50%;
    bottom: 2.43rem;
    transform: translateX(-50%);
    z-index: 1;
    overflow: hidden;
    .title {
      color: #005ece;
      font-size: 0.34rem;
      font-weight: bold;
      text-align: center;
      margin: 0.3rem 0;
    }
    .question {
      color: #000;
      font-size: 0.32rem;
      padding: 0 0.3rem;
      text-align: justify;
      line-height: 0.55rem;
      margin-bottom: 0.3rem;
    }
    .answer {
      color: #000;
      font-size: 0.32rem;
      padding: 0 0.3rem;
      li {
        margin: 0.2rem 0;
        text-align: left;
        display: flex;
        .text {
          line-height: 0.55rem;
        }
        .circle {
          width: 0.46rem;
          height: 0.46rem;
          border: 1px solid #005ece;
          border-radius: 50%;
          flex: none;
          margin-right: 0.2rem;
          text-align: center;
          line-height: 0.48rem;
        }
        .active {
          b {
            width: 0.24rem;
            height: 0.24rem;
            background: #005ece;
            display: inline-block;
            border-radius: 50%;
          }
        }
      }
    }
  }
}
@-webkit-keyframes anwoman {
  0% {
    -webkit-transform: translateY(0);
  }
  80% {
    -webkit-transform: translateY(-110%);
  }
  100% {
    -webkit-transform: translateY(-100%);
  }
}
@keyframes anwoman {
  0% {
    transform: translateY(0);
  }
  80% {
    transform: translateY(-110%);
  }
  100% {
    transform: translateY(-100%);
  }
}
@-webkit-keyframes anwoman2 {
  0% {
    -webkit-transform: translateY(0);
  }
  80% {
    -webkit-transform: translateY(-110%);
  }
  100% {
    -webkit-transform: translateY(-100%);
  }
}
@keyframes anwoman2 {
  0% {
    transform: translateY(0);
  }
  80% {
    transform: translateY(-110%);
  }
  100% {
    transform: translateY(-100%);
  }
}
</style>
