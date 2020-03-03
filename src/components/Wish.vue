<template>
	<div class="container">
		<div class="row justify-content-around mt-5">
			<div v-for="d in datas" class="card col-7 col-sm-5 col-md-3 mr-2 mb-5">
				<div>
					<img :src="d.pic" class="card-img-top" alt="">
					<div class="card-body">
						<h5 class="card-title">{{d.name}}</h5>
						<p class="card-text">痘痘肌敏感指數：{{d.totalA}}</p>
						<p class="card-text">敏感肌敏感指數：{{d.totalB}}</p>
						<p class="card-text">酒糟肌敏感指數：{{d.totalC}}</p>
						<p class="card-text">綜合敏感指數：{{d.totalPoint}}</p>
						<a href="" class="btn btn-info col-lg-7" @click.prevent="isShow=!isShow">詳細資訊 </a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				datas:[],
				isShow:true
			}
		},
		activated(){
			this.axios.post('/api/getWish',{params:{id:this.$store.getters.userInfo.id}})
			.then(result=>{
				this.datas = result.data.data
				// console.log(result.data.data)
				});
		},
		created(){
			this.axios.post('/api/getWish',{params:{id:this.$store.getters.userInfo.id}})
			.then(result=>this.datas = result.data.data);
		}
	}
</script>

<style scoped>
	.card {
		border-radius: 20px;
		margin-top: 20px;
		padding-top: 20px;
	}
</style>
