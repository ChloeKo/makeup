<template>
	<div class="container">
		<div class="row box">
			<form class="form-group">
				<span>暱稱：</span>
				<input type="text" class="form-control col-12" placeholder="五字元以內的暱稱" v-model="name">
				<span>帳號：</span>
				<input type="text" class="form-control col-12" placeholder="使用email註冊" v-model="email">
				<span>密碼：</span>
				<input type="password" class="form-control col-12" placeholder="五字元以上的密碼" v-model="password">
				<input type="button" class="btn btn-lg btn-info mt-3 col-12" value="註冊" @click="regist">
			</form>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				name:'',
				email:'',
				password:''
			}
		},
		methods:{
			regist(){
				this.axios.post('/api/register',{params:{name:this.name,email:this.email,password:this.password}});
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
