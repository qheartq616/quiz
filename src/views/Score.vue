<template>
	<div class="score-page">
		<p class="line1">您答对了{{score/10}}题</p>
		<p class="line2">得到{{score}}分！</p>
		<p class="line3">用时{{time}}秒</p>
	</div>
</template>
<script>
// @ is an alias to /src
import { mapState } from 'vuex'
export default {
	name: 'Score',
	data() {
		return {}
	},
	computed: mapState([
		'score',
        'time'
	]),
	components: {},
	methods: {},
	created() {},
	mounted() {},
}
</script>
<style scoped lang="less">
.score-page {
	width: 100%;
	height: 100%;
	overflow: hidden;
	background: #fff url(../assets/2.jpg) no-repeat center center/auto 100%;
	p {
		color: #fff;
		font-size: 0.5rem;
		text-align: center;
		padding: 0.1rem 0;
		text-shadow: 2px 2px 2px #005ece;
		font-weight: bold;
	}
	.line3 {
		font-size: 0.28rem;
		font-weight: normal;
		text-shadow: 1px 1px 0 #005ece;
	}
	.line1 {
		margin-top: 3.5rem;
	}
}
</style>
