<template>
	<div class="container">
		<div class="row justify-content-around">
			<p class="col-7">我在尋找</p>
			<select class="skin col-8 col-md-7 form-control mb-1" v-model="skin">
				<option>痘痘肌</option>
				<option>敏感肌</option>
				<option>酒糟肌</option>
				<option>所有肌膚</option>
			</select>
			<p class="col-7">適合使用的</p>
			<select class="tp col-8 col-md-7  form-control mb-5" v-model="tp">
				<option>化妝水</option>
				<option>乳液</option>
				<option>凝膠</option>
				<option>面膜</option>
				<option>所有保養品</option>
			</select>
			<button class="btn btn-lg btn-info col-7" @click="search">Go!</button>
			<transition name="shrink" mode="out-in">
				<div class="result" v-if="is">
					<span @click="is = !is">X</span>
					<div class="row justify-content-around">
						<Result v-for="r in result" :result="r"></Result>
					</div>
				</div>
			</transition>
		</div>
		
	</div>
</template>

<script>
	import Result from './Result.vue';
	export default{
		data(){
			return{
				skin:'痘痘肌',
				tp:'化妝水',
				result:'',
				is:false
			}
		},
		methods:{
			search(){
				this.axios.post('/api/skin/search',{params:{skin:this.skin,tp:this.tp}}).then(res=>{
					this.result = res.data;
					this.is = !this.is
					// this.$router.push({path:'/result'});
					// eventBus.$emit('getResult',{result:this.result});
				}).catch(err=>{
					console.log(err);
				});
				
			}
		},
		components:{
			Result
		}
	}
</script>

<style scoped>
	p{
		margin-bottom: 2px;
		text-align: center;
		font-family: 'Noto Sans TC', sans-serif;
		font-size: 30px;
	}
	.container{
		margin-top: 100px;
	}
	.skin,.tp{
	}
	.result{
		border-radius: 15px;
		margin: 0 auto;
		padding: 5px;
		position:absolute;
		width: 90%;
		float: left;
		border: 1px solid rgba(230,230,230,0.9);
		box-shadow: 0.5px 0.5px 0.5px rgba(20,20,20,0.5);
		background: rgba(240,240,240,0.8);
	}
	span{
		height: 32px;
		color: white;
		font-weight: 700;
		background: cadetblue;
		border-radius: 5px;
		border: 2px white solid;
		padding: 2px 8px 2px 8px;
		margin: 9px;
		cursor: pointer;
	}
	.shrink-enter{
		width: 0;
		opacity: 0;
	}
	.shrink-enter-active{
		transition: width 0.5s ease,opacity 0.5s ease;
	}
	.shrink-leave-active{
		opacity: 0;
		width: 0;
		transition: width 0.6s ease,opacity 0.5s ease; 
		
	}
</style>
