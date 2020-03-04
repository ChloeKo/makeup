<template>
	<div class="container">
		<div class="row justify-content-around mt-5">
			<div v-for="d in datas" class="card col-7 col-sm-5 col-md-3 mr-2 mb-5" v-if="isShow">
				<a href="#" class="delete ml-auto" @click.prevent="deleteWish(d.name)">x</a>
				<div>
					<img :src="d.pic" class="card-img-top" alt="">
					<div class="card-body">
						<h5 class="card-title">{{d.name}}</h5>
						<p class="card-text">痘痘肌敏感指數：{{d.totalA}}</p>
						<p class="card-text">敏感肌敏感指數：{{d.totalB}}</p>
						<p class="card-text">酒糟肌敏感指數：{{d.totalC}}</p>
						<!-- <p class="card-text">綜合敏感指數：{{d.totalPoint}}</p> -->
						<a href="" class="btn btn-info col-lg-7" @click.prevent="isShow=!isShow">詳細資訊 </a>
					</div>
				</div>
				<div v-if="!isShow" key="2">
					<div class="content">
						<ul>
							<li v-for="c in d.che">{{c.eName}}-{{c.cName}}</li>
						</ul>
					</div>
					<a href="#" class="btn btn-info" @click.prevent="isShow=!isShow" style="margin-bottom: 10px;font-size: 20px;">
						←
					</a>
				</div>
			</div>

		</div>
		<div class="msg" v-if="msgbox"><p>您的願望清單為空!<br>趕快前往選擇您的願望商品吧!</p></div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				datas:[],
				isShow:true,
				msgbox:false
			}
		},
		activated(){
			this.axios.post('/api/getWish',{params:{id:this.$store.getters.userInfo.id}})
			.then(result=>{
					if(result.data.data == 'empty'){
						this.msgbox = true;
						this.isShow = false;
					}else{
						this.datas = result.data.data
						this.isShow = true;
						this.msgbox = false;
					}
				});
		},
		created(){
			this.axios.post('/api/getWish',{params:{id:this.$store.getters.userInfo.id}})
			.then(result=>{
				if(result.data.data == 'empty'){
					this.msgbox = true;
					this.isShow = false;
				}else{
					this.datas = result.data.data
					this.isShow = true;
					this.msgbox = false;
				}
			});
		},
		methods:{
			deleteWish(name,user){
				user = this.$store.getters.userInfo.id;
				this.axios.post('/api/deleteWish',{params:{name:name,id:user}}).then(result=>{
					this.axios.post('/api/getWish',{params:{id:this.$store.getters.userInfo.id}})
					.then(result=>{
						if(result.data.data == 'empty'){
							this.msgbox = true
							this.isShow = false;
							this.datas = result.data.data
						}else{
							this.datas = result.data.data
							this.isShow = true;
							this.msgbox = false;
						}
					});
				})
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.msg{
		font-family: 'Noto Sans TC', sans-serif;
		margin: 100px auto;
		height: 300px;
		width: 300px;
		text-align: center;
		border-radius: 20px;
		background: rgba(#fefefe,0.8);
		// line-height: 300px;
		border: 1px solid lighten(gray,30%);
		box-shadow: 1px 1px 1px 1px lighten(gray,10%);
		p{
			margin-top: 120px;
		}
	}
	.card {
		border-radius: 20px;
		margin-top: 20px;
		padding-top: 20px;
	}
	.delete{
		margin: -15px 0 0 0 ;
		text-decoration: none;
		color: lighten(gray,20%);
		font-weight: 400;
		&:hover{
			font-weight: 700;
			color: gray;
		}
	}
	.content{
		overflow: auto;
		margin: 4px auto;
		padding-bottom: 10px;
		height: 400px;
		width: 95%;
		border: 1px solid black;
	}
</style>
