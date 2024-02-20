<template>
	<!-- <div> -->
	<div class="score-page">
		<p class="line1">您答对了{{ score / 5 }}题</p>
		<p class="line2">得到{{ score }}分！</p>
		<p class="line3">用时{{ time }}秒</p>
		<p class="line4">排行榜</p>
		<table class="rankList">
			<tr class="rank-title">
				<td><b>昵称</b></td>
				<td><b>分数</b></td>
				<td><b>用时</b></td>
			</tr>
			<tr v-for="(item, index) in rankList" :key="index" class="rank-item">
				<td>{{ item.name }}</td>
				<td>{{ item.score }}</td>
				<td>{{ item.time }}</td>
			</tr>
		</table>
		<div class="submit-btn">
			<div class="button" @click="handleAgain()"></div>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex'
import { rankList, updateRankList } from '@/api/QQMusicApi'
export default {
	name: 'Score',
	data() {
		return {
			rankList: []
		}
	},
	computed: mapState([
		'name',
		'score',
		'time'
	]),
	components: {},
	methods: {
		handleAgain() {
			window.location.href = "http://qheartq616.com/quiz"
		}
	},
	created() { },
	mounted() {
		let rankTemp = []
		rankList().then(res => {
			rankTemp = res.data.data
			// console.log("历史数据"+JSON.stringify(rankTemp))

			if (this.name != "") {
				rankTemp.push({ name: this.name, score: this.score, time: this.time })
				for (let i = rankTemp.length - 1; i > 0; i--) {
					if (rankTemp[i].score > rankTemp[i - 1].score) {
						let smallTemp = rankTemp[i - 1]
						rankTemp[i - 1] = rankTemp[i]
						rankTemp[i] = smallTemp
					} else if (rankTemp[i].score == rankTemp[i - 1].score) {
						if (rankTemp[i].time < rankTemp[i - 1].time) {
							let smallTemp = rankTemp[i - 1]
							rankTemp[i - 1] = rankTemp[i]
							rankTemp[i] = smallTemp
						}
					}
				}
				// console.log("新数据"+JSON.stringify(rankTemp))
			}

			if (rankTemp.length <= 10) {
				this.rankList = rankTemp
			} else {
				this.rankList = rankTemp.splice(0, 10)
			}

			console.log("新数据11122233344455556666" + JSON.stringify(this.rankList))

			updateRankList(this.rankList)
		})
	},
}
</script>
<style scoped lang="less">
.score-page {
	width: 100%;
	height: 100%;
	overflow: hidden;
	background: #fff url(../assets/2noText.jpg) no-repeat center center/auto 100%;

	p {
		color: #fff;
		font-size: 0.5rem;
		text-align: center;
		padding: 0.1rem 0;
		text-shadow: 2px 2px 2px #005ece;
		font-weight: bold;
	}

	.line1 {
		margin-top: 1rem;
	}

	.line3 {
		font-size: 0.28rem;
		font-weight: normal;
		text-shadow: 1px 1px 0 #005ece;
	}

	.line4 {
		margin-top: 0.5rem;
		margin-bottom: 0.2rem;
	}

	.rankList {
		font-size: 0.3rem;
		width: 6.1rem;
		// height: 3rem;
		padding-top: 0.1rem;
		padding-bottom: 0.1rem;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 0.24rem;
		margin: 0 auto 0.4rem;
		overflow: hidden;
		.rank-item {
			margin-top: 100px;
			margin-bottom: 0.1rem;
		}
	}

	.submit-btn {
		width: 100%;
		height: 0.7rem;

		.button {
			height: 0.7rem;
			width: 3.28rem;
			margin: 0 auto;
			background: url(../assets/again.png) no-repeat center center/auto 100%;
		}
	}
}</style>
