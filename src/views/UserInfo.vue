<template>
	<div class="user-page">
		<div class="info-box">
			<p class="title">填写个人信息</p>
			<div class="line">
				<span>用户名</span><input type="text" v-model.trim="name" />
			</div>
		</div>
		<div class="submit-btn">
			<div class="button" @click="handleSubmit()"></div>
		</div>
	</div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
	name: 'UserInfo',
	data() {
		return {
			name: '',
		}
	},
	components: {},
	methods: {
		...mapMutations(['SET_INFO']),
		handleSubmit() {
			this.SET_INFO({
				name: this.name,
            });
            this.$router.replace({ path: 'list' });
		},
	},
	created() {},
	mounted() {},
}
</script>
<style scoped lang="less">
.user-page {
	width: 100%;
	height: 100%;
	overflow: hidden;
	background: #fff url(../assets/2.jpg) no-repeat center center/auto 100%;
	.info-box {
		width: 6.1rem;
		height: 2.5rem;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 0.24rem;
		font-size: 0.32rem;
		color: #000;
		margin: 1rem auto 0.4rem;
		overflow: hidden;
		.title {
			text-align: center;
			color: #005ece;
			font-size: 0.34rem;
			font-weight: bold;
			margin: 0.32rem 0 0.5rem 0;
		}
		.line {
			display: flex;
			width: 5.4rem;
			margin: 0 auto 0.3rem;
			justify-content: space-between;
            align-items: center;
			input,
			select {
				flex: auto;
				height: 0.54rem;
				background: #fff;
				border: 1px solid #005ece;
				padding: 0 0.1rem;
				border-radius: 0.1rem;
			}
			span {
				width: 1rem;
				flex: none;
				margin-right: 0.1rem;
				text-align: justify;
			}
		}
	}
	.submit-btn {
		width: 100%;
		height: 0.7rem;
		.button {
			height: 0.7rem;
			width: 3.28rem;
			margin: 0 auto;
			background: url(../assets/1.png) no-repeat center center/auto 100%;
		}
	}
}
</style>
