	<template>
	<div class="container">
		<transition name="slide" mode="out-in">
			<div class="info" v-if="statusState">{{status}}</div>
		</transition>
		<div class="row box">
			<form class="form-group">
				<span>帳號：</span>
				<input type="text" class="form-control col-12" placeholder="通常為你的電子郵件" v-model="email">
				<span>密碼：</span>
				<input type="password" class="form-control col-12" placeholder="五字元以上的密碼" v-model="password">
				<input type="button" class="btn btn-lg btn-info mt-3 col-12" value="登入" @click="login">
				<p>還沒有帳號嗎?前往<router-link to="regist">註冊</router-link></p>
			</form>
		</div>
	</div>
</template>

<script>
	import jwtDecode from 'jwt-decode'
	export default{
		data(){
			return {
				email:'',
				password:'',
				status:'XXXXXXXX',
				statusState:false
			}
		},
		methods:{
			login(){
				this.axios.post('/api/login',{params:{email:this.email,password:this.password}}).then(result=>{
					if(result.data.fail == 'noAcc'){
						setTimeout(()=>{this.statusState = false},1000)
						this.status = '查無此帳號!'
						this.statusState = true;
					}else if(result.data.fail == 'noPass'){
						setTimeout(()=>{this.statusState = false},1000)
						this.status = '密碼錯誤!'
						this.statusState = true;
					}else if(result.data.success == true){
						const token = result.data.token;
						localStorage.setItem('eleToken',result.data.token)
						const decoded = jwtDecode(token);
						this.$store.dispatch('setLoginToTrue');
						const userInfo = {
							name:decoded.name,
							manager:decoded.manager
						}
						this.$store.dispatch('setUserInfo',userInfo);
						this.$router.push('/');
					}
					
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.info{
		font-weight: 600;
		border-radius: 10px;
		width: 70%;
		height: 70px;
		line-height: 70px;
		text-align: center;
		background: #138496;
		border: 1px solid rgba(150,180,190,1);
		position: fixed;
		z-index: 99;
		left: 50%;
		transform: translateX(-50%);
	}
	.box{
		width: 100%;
		margin: 100px auto;
		.form-group{
			font-size: 30px;
			font-family: 'Noto Sans TC', sans-serif;
			width: 80%;
			margin: 0 auto;
		}
	}
	p{
		font-size: 15px;
		font-weight: 600;
	}
	.slide-enter-active{
		opacity: 1;
		transition: opacity;
		left:15%;
		animation: slide-in ease 0.7s;
	}
	.slide-leave-active{
		left:15%;
		animation: slide-out ease 0.7s;
	}
	@keyframes slide-in{
		from{
			transform: translate(0px,-35px);
			opacity: 0;
		}
		to{
			transform: translate(0px,0px);
			opacity: 1;
		}
	}
	@keyframes slide-out{
		from{
			opacity: 1;
			transform: translate(0px,0px);
		}
		to{
			opacity: 0;
			transform: translate(0px,-35px);
		}
	}
</style>
