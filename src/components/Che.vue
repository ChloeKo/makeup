<template>
	<div class="container">
		<div class="row justify-content-between head">
			<input type="button" class="btn btn-md btn-info ml-4" @click="isAdd = !isAdd" value="新增成分">
			<transition name="slide" mode="out-in">
				<AddChe v-if="isAdd"  @close="closeAdd"></AddChe>
			</transition>
			<div class="col-5 col-md-3">
				<input type="text" class="form-control" placeholder="搜尋成分" v-model="search">
				<ul class="search col-9 list-group" style="padding: 0; border: none; border-radius: 20px;">
					<li v-for="l in list" class="list-group-item" style="width: 100%;"><a :href="'#'+l.eName">{{l}}</a></li>
				</ul>
			</div>		
		</div>
			<div class="group row justify-content-center">
				<OneChe v-for="d in data" :d="d"></OneChe>
			</div>
	</div>
</template>

<script>
	import OneChe from './OneChe.vue';
	import AddChe from './AddChe.vue';
	export default{
		data(){
			return{
				isAdd:false,
				data:{},
				search:'',
				list:[]
				}
		},
		components:{
			OneChe,
			AddChe
		},
		created(){
			console.log('before')
			this.axios.get('/api/che').then((response) => {
			  this.data = response.data
			})
		},
		methods:{
			closeAdd(){
				this.isAdd = !this.isAdd;
				this.axios.get('/api/che').then((response) => {
				  this.data = response.data;
				})
			},
			// searching(){
			// 	for(let i=0;i<this.data.length;i++){
			// 		console.log(this.data[i].eName) 
			// 	}
			// },
		},
		watch:{
			search(){
				this.list = [];
				let temp = [];
				for(let i=0;i<this.data.length;i++){	
					temp.push(this.data[i].eName)
					 this.list = temp.filter(word=>{
						if(word.match(this.search)){
							return true
						}else{
							return false
						}
					})
				}
			}
		}
	}
</script>

<style scoped>
	.head{
		margin-top: 120px;
	}
	.btn{
		display: inline;
	}
	.container{
		background: pink
	}
	.group{
		margin-top: 20px;
	}
	.form-control{
		display: inline;
		width: 100%;
	}
	.slide-enter{
		opacity: 0;
	}
	.slide-enter-active{
		animation: slide-in 1s ease;
		transition: opacity 1s ease;
	}
	.slide-leave-active{
		opacity: 0;
		animation: slide-out 1s ease;
		transition: opacity 1s ease;
	}
	.search{
		text-align: center;
		position: absolute;
		z-index: 4;
		border: 1px solid rgba(140,140,140,0.6);
		border-top: none;
		/* width: 206.594px; */
		background: white;
		list-style: none;
	}
	@keyframes slide-in{
		from{
			transform: translateX(-100px);
		}
		to{
			transform: translateX(0px);
		}
	}
	@keyframes slide-out{
		from{
			transform: translateX(0px);
		}
		to{
			transform: translateX(-100px);
		}
	}
</style>
