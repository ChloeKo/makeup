<template>
	<nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top mt-2 mr-3 ml-3">
	  <router-link class="navbar-brand" to="/">Chloe's Skin Care</router-link>
	  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
	    <span class="navbar-toggler-icon"></span>
	  </button>
	  <div class="collapse navbar-collapse" id="navbarNav">
	    <ul class="navbar-nav">
	      <li class="nav-item mr-5 ml-lg-5">
	        <router-link class="nav-link" to="/" active-class="active" exact>首頁 <span class="sr-only">(current)</span></router-link>
	      </li>
	      <li class="nav-item mr-5">
	        <router-link class="nav-link" to="/che" active-class="active" exact>化學物質介紹</router-link>
	      </li>
	      <li class="nav-item mr-5">
	        <router-link class="nav-link" to="/choose" active-class="active">選擇妳的保養品</router-link>
	      </li>

	    </ul>
		<ul class="navbar-nav ml-auto">
			<li class="nav-item ">
			  <a class="nav-link" href="#">登入 <span class="sr-only">(current)</span></a>
			</li>
			<li class="nav-item">
			  <a class="nav-link" href="#">註冊</a>
			</li>
		</ul>
	  </div>
	</nav>
</template>

<script>
</script>

<style scoped>
	.navbar{
		background: rgba(235,235,235,0.95)!important;
	}
	.active{
		border-radius: 20px;
		background: rgba(250,250,250,1);
	}
	@media (max-width: 320px) {
		.navbar-brand{
			font-size: 13px;
		}
	}
</style>
