<template>
	<div class="card col-7 col-sm-5 col-md-3 mr-2 mb-5">
		<transition name="flip" mode="out-in">
			<div v-if="isShow" key="1">
				<img :src="result.pic" class="card-img-top" alt="">
				<div class="card-body">
					<h5 class="card-title">{{result.name}}</h5>
					<p class="card-text">敏感指數：</p>
					<a href="" class="btn btn-info col-lg-7" @click.prevent="isShow=!isShow">詳細資訊 </a>
					<a href="#" class="btn btn-info plus col-lg-3 mt-2 mt-lg-0">+</a>
				</div>
			</div>
			<div v-if="!isShow" key="2">
				<div class="content">
					<ul>
						<li v-for="c in result.che">{{c.eName}}-{{c.cName}}</li>
					</ul>
					啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
					啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
					啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
				</div>
				<a href="#" class="btn btn-info" @click.prevent="isShow=!isShow" style="margin-bottom: 10px;">
					---- 
				</a>

			</div>
		</transition>

	</div>

</template>

<script>
	export default {
		props: ['result'],
		data() {
			return {
				isShow: true
			}
		}
	}
</script>

<style scoped>
	.card {
		border-radius: 20px;
		margin-top: 20px;
		padding-top: 20px;
	}

	.plus {
		font-weight: 900;
	}

	.flip-enter {
		opacity: 0;
	}

	.flip-enter-active {
		animation: flip-in ease 0.4s;
		transition: opacity ease 0.4s;
	}

	.flip-leave-active {
		opacity: 0;
		animation: flip-out ease 0.4s;
		transition: opacity ease 0.4s;
	}

	@keyframes flip-in {
		from {
			transform: rotateY(90deg);
		}

		to {
			transform: rotateY(0deg);
		}
	}

	@keyframes flip-out {
		from {
			transform: rotateY(0deg);
		}

		to {
			transform: rotateY(90deg);
		}
	}
	
	.content{
		overflow: auto;
		margin: 4px auto;
		padding-bottom: 10px;
		height: 250px;
		width: 95%;
		border: 1px solid black;
	}
</style>
