<template>
	<div id="app">
		<NavHeader></NavHeader>
		<transition name="fade" mode="out-in">
			<keep-alive>
				<router-view :data="che"></router-view>
			</keep-alive>
		</transition>
	</div>
</template>

<script>
	import LandingPage from './components/LandingPage.vue'
	import NavHeader from './components/NavHeader.vue'
	import {data} from './data/data.js'
	export default {
		data() {
			return {
				che: data
			}
		},
		components: {
			LandingPage,
			NavHeader
		}
	}
</script>

<style>
	.fade-enter{
		opacity: 0;
	}
	.fade-enter-active{
		transition: opacity 0.6s; 
	}
	.fade-leave-active{
		opacity: 0;
		transition: opacity 0.6s;
	}
	body {
		background: pink;
	}
</style>
