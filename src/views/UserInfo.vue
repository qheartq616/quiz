<template>
	<div class="user-page">
		<div class="info-box">
			<p class="title">填写个人信息</p>
			<div class="line">
				<span>所属区</span
				><select name="qy" id="one" v-model="area"
					><option value="浦东新区">浦东新区</option
					><option value="黄浦区">黄浦区</option
					><option value="静安区">静安区</option
					><option value="徐汇区">徐汇区</option
					><option value="长宁区">长宁区</option
					><option value="普陀区">普陀区</option
					><option value="虹口区">虹口区</option
					><option value="杨浦区">杨浦区</option
					><option value="宝山区">宝山区</option
					><option value="闵行区">闵行区</option
					><option value="嘉定区">嘉定区</option
					><option value="金山区">金山区</option
					><option value="松江区">松江区</option
					><option value="青浦区">青浦区</option
					><option value="奉贤区">奉贤区</option
					><option value="崇明区">崇明区</option></select
				>
			</div>
			<div class="line">
				<span>单位</span><input type="text" placeholder="所属街道或单位" v-model.trim="street" />
			</div>
			<div class="line">
				<span>用户名</span><input type="text" v-model.trim="name" />
			</div>
			<div class="line">
				<span>手机号</span
				><input type="number" v-model.trim.number="phone" />
			</div>
		</div>
		<div class="submit-btn">
			<div class="button" @click="handleSubmit()"></div>
		</div>
	</div>
</template>
<script>
// @ is an alias to /src
import { mapMutations } from 'vuex'
export default {
	name: 'UserInfo',
	data() {
		return {
			area: '浦东新区',
			street: '',
			name: '',
			phone: '',
		}
	},
	components: {},
	methods: {
		...mapMutations(['SET_INFO']),
		handleSubmit() {
			if (this.street == '' || this.name == '' || this.phone == '') {
				alert('请填写完整个人信息！')
				return
			}
			let reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
			if (!reg.test(this.phone)) {
				alert('请填写正确的手机号码a！')
				return
			}
			this.SET_INFO({
				area: this.area,
				street: this.street,
				name: this.name,
				phone: this.phone,
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
		height: 6.1rem;
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
