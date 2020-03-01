<template>
	<div class="container">
		<div class="row box">
			<form class="form-group">
				<span>帳號：</span>
				<input type="text" class="form-control col-12" placeholder="通常為你的電子郵件" v-model="email">
				<span>密碼：</span>
				<input type="password" class="form-control col-12" placeholder="五字元以上的密碼" v-model="password">
				<input type="button" class="btn btn-lg btn-info mt-3 col-12" value="登入" @click="login">
			</form>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				email:'',
				password:''
			}
		},
		methods:{
			login(){
				this.axios.post('/api/login',{params:{email:this.email,password:this.password}});
			}
		}
	}
</script>

<style lang="scss" scoped>
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
</style>
