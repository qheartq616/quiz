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
      <div :hidden="hideAudio">
        <audio :src="musicUrl" controls ref="musicPlayer"></audio>
      </div>
      <button hidden ref="musicButton" @click="playMusic()"></button>
      <p class="title">第{{ listIndex + 1 }}/20题</p>
      <div class="question">
        {{ listTypeText + questionList[listIndex].title }}
      </div>
      <ul class="answer">
        <li v-for="(item, index) in questionList[listIndex].list" :key="index">
          <div :class="['circle', userClickList.includes(index) ? 'active' : '']" @click="handleUserClick(index)">
            <b></b>
          </div>
          <div class="text">{{ item }}</div>
        </li>
      </ul>
    </div>
    <div class="next-btn" @click="handleNextClick()" v-show="!subMitBtnShow"></div>
    <div class="submit-btn" v-show="subMitBtnShow" @click="handleNextClick()"></div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapState } from "vuex"
import songList from "../store/songList"
import { songUrl } from '@/api/QQMusicApi'

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
      userTime: 0,
      songNum: 15,
      questionList: [],
      randomSongList: [],
      flag: true, // 是否未替换过新题目 
      musicUrl: "",
      timer2: null,
      hideAudio: true
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
      return text;
    },
    ...mapGetters(["getQAlist"]),
    ...mapState(["name", "score", "time"])
  },
  components: {},
  methods: {
    ...mapMutations(["SET_SCORE", "SET_TIME"]),
    handleNextClick() {
      let screenw =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth

      if (this.userClickList.length == 0) {
        alert("请选择答案！")
      } else {
        let formatAnswerList = []
        let isWrong = false
        this.userClickList.forEach(value => {
          switch (value) {
            case 0:
              formatAnswerList.push("A")
              break
            case 1:
              formatAnswerList.push("B")
              break
            case 2:
              formatAnswerList.push("C")
              break
            case 3:
              formatAnswerList.push("D")
              break
            default:
              formatAnswerList = null;
          }
        });
        console.log(
          formatAnswerList,
          this.questionList[this.listIndex].answer,
          formatAnswerList == this.questionList[this.listIndex].answer,
          this.questionList[this.listIndex].answer.includes("对")
        );

        if (
          formatAnswerList.length ===
          this.questionList[this.listIndex].answer.length
        ) {
          this.questionList[this.listIndex].answer.forEach(value => {
            if (!formatAnswerList.includes(value)) {
              isWrong = true
            }
          })
          if (!isWrong) {
            this.userScore += 5
          }
        }
        if (this.listIndex === 19) {
          this.SET_SCORE(this.userScore)
          this.SET_TIME(this.userTime)
          this.$router.replace({ path: "score" })
          return
        }

        this.animateShow = !this.animateShow
        this.screenBg += screenw / 3
        this.listIndex += 1
        if (this.listIndex == 19) {
          this.subMitBtnShow = true
        }

        this.userClickList = [] //清空答案选项
        formatAnswerList = [] //清空答案选项
        isWrong = false;
      }
      if (this.listIndex >= 20 - this.songNum - 1) {
        // console.log("问题" + JSON.stringify(this.questionList[this.listIndex]))
        if (this.randomSongList.length == this.songNum) {
          if (this.flag) {
            this.questionList.splice(20 - this.songNum, this.songNum)
            this.questionList = this.questionList.concat(this.randomSongList)
            this.flag = false
          }
        }
      }
      if (this.listIndex >= 20 - this.songNum + 1) {
        const music = this.$refs.musicPlayer
        clearTimeout(this.timer2)
        music.pause()
      }
      if (this.listIndex >= 20 - this.songNum) {
        const userAgent = navigator.userAgent
        console.log(userAgent)
        if (/iPad|iPhone|iPod/.test(userAgent)) {
          // this.hideAudio = false
        }
        // console.log("播放" + JSON.stringify(this.questionList[this.listIndex]))
        console.log("准备播放")
        this.$refs.musicButton.click()
      }
    },
    handleUserClick(index) {
      this.userClickList = [index]
    },
    async testSong() {
      let paramTest = new FormData()
      // 测试歌曲《爱久见人心》
      paramTest.append('id', "001vAPdQ1hpq7n")
      // 这个字段为其他接口中返回的 strMediaId 字段，可不传，不传默认同 songmid，但是部分歌曲不传可能会出现能获取到链接，但实际404， 所以有条件的大家都传吧
      paramTest.append('mediaId', "002L3Xok27y4B0")
      //默认 0，非 0 时直接重定向到播放链接
      paramTest.append('isRedirect', 0)
      console.log(1)
      // 先看看音频接口能不能用
      await songUrl(paramTest).then(res => {
        console.log(res)
        if (res.result != 100 || !res.data) {
          console.log(2)
          this.songNum = 5
        }
      })
    },
    playMusic() {
      this.musicUrl = this.questionList[this.listIndex].playLink
      let listTemp = this.questionList
      let indexTemp = this.listIndex
      const music = this.$refs.musicPlayer
      music.load()
      music.onloadedmetadata = function () {
        music.currentTime = listTemp[indexTemp].interval * Math.random() * 0.9
        music.play()
      }
      setTimeout(function () {
        console.log("假装在加载ing")
      }, 500)
      this.timer2 = setTimeout(function () {
        console.log("播放4秒自动停止")
        music.pause()
      }, 4000)
    }
  },
  created() {
    this.timer = setInterval(() => {
      this.userTime += 1
    }, 1000)
    this.questionList = this.getQAlist
  },
  mounted() {
    let songListTotal = songList.songlist
    // 歌曲总数
    let total = songListTotal.length
    let randomNumList = []
    let isExists = false

    while (randomNumList.length < this.songNum) {
      const element1 = parseInt(Math.random() * total)
      randomNumList.forEach(value => {
        if (value === element1) {
          isExists = true
        }
      })

      if (!isExists) {
        let song = songListTotal[element1]
        randomNumList.push(song.songorig)
        if (song.songmid && song.strMediaMid) {
          let param = new FormData()
          param.append('id', song.songmid)
          param.append('mediaId', song.strMediaMid)
          param.append('isRedirect', 0)
          songUrl(param).then(res => {
            console.log(res.data)
            if (res.data.result == 100 && res.data.data) {
              let title = "请猜出这首歌的名字"
              let playLink = res.data.data
              let list = []
              let option = ["A", "B", "C", "D"]
              let interval = song.interval

              list.push(song.songorig)
              while (list.length < 4) {
                let randomNumList2 = []
                let isExists2 = false
                const element2 = parseInt(Math.random() * total)
                list.forEach(value => {
                  if (value === songListTotal[element2].songorig) {
                    isExists2 = true
                  }
                })

                if (!isExists2) {
                  randomNumList2.push(element2)
                  list.push(songListTotal[element2].songorig)
                }
                isExists2 = false
              }
              list.shift()
              const element4 = parseInt(Math.random() * 4)
              list.splice(element4, 0, song.songorig)
              for (let i = 0; i < 4; i++) {
                list.splice(i, 1, option[i] + " " + list[i])
              }
              this.randomSongList.push({ title: title, list: list, answer: [option[element4]], playLink: playLink, interval: interval })
              console.log("randomSongList=" + JSON.stringify(this.randomSongList))
            }
          })
        }
      }
      isExists = false
    }
    console.log("randomNumList=" + randomNumList)
  },
  destroyed() {
    clearInterval(this.timer)
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
