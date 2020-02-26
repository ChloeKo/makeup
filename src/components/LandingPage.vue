<template>
	<div class="row">
		<div class="box1 col-md-6 ">
			<img src="../assets/beauty-product-in-pink-color-2720447.jpg" class="landing"/>
			<div class="logo">ChloeChloe</div>
		</div>
		
		<div class="box2 col-md-6" >
			<p class="content1">
				<span style="font-size: 40px;">保</span>養品他媽就是拿來保養的，結果一堆人拿來當水喝，喝得好像不用錢一樣，上次我就親眼在屈臣氏看到一名婦女喝到當場烙賽，烙到整家店沒辦法營業，我們關心而且重視這些問題，畢竟在公眾場合烙賽不是很雅觀。所以，為了大家著想，此產品就是拿來揭示所有保養品的化學成分，讓各位了解各種化學成分造成的刺激度不同，我們提供您查詢單一化學成分以及針對您個人腸胃狀況來選擇保養品的功能，請快樂的使用，祝福各位可以喝得安心，烙賽也烙得安心。──Chloe's skin care 
			</p>
		</div>
		
		<div class="box3 col-md-6 order-md-1 order-3 ">
			<p class="content1">
				<span style="font-size: 40px;">保</span>養品他媽就是拿來保養的，結果一堆人拿來當水喝，喝得好像不用錢一樣，上次我就親眼在屈臣氏看到一名婦女喝到當場烙賽，烙到整家店沒辦法營業，我們關心而且重視這些問題，畢竟在公眾場合烙賽不是很雅觀。所以，為了大家著想，此產品就是拿來揭示所有保養品的化學成分，讓各位了解各種化學成分造成的刺激度不同，我們提供您查詢單一化學成分以及針對您個人腸胃狀況來選擇保養品的功能，請快樂的使用，祝福各位可以喝得安心，烙賽也烙得安心。──Chloe's skin care 
			</p>
		</div>
		
		<div class="box4 col-md-6 order-2">
			<img src="../assets/photo-of-eye-shadow-palette-2600761.jpg" class="landing"/>
			<div class="logo">ChloeChloe</div>
		</div>
		
	</div>
</template>

<script>
	export default{
	
	}
</script>

<style scoped>
	*{
		margin: 0;
		padding: 0;
	}
	.landing{
		width: 100%;
		height: 100%;
	}
	
	.box3{
		background: pink;
		height: 490px;
	}
	.box1,.box2,.box4{
		height: 490px;
		display: inline-block;
		/* float: right; */
		background: pink;
	}
	.logo{
		font-family: 'Shadows Into Light', cursive;
		font-size: 140px;
		color: rgba(230,240,245,0.9);
		z-index: 2;
		position: absolute;
		left: calc(50% - 254px);
		top: 135px;
		text-shadow: 1px 1px rgba(130,130,130,0.3);
	}
	.content1{
		padding:0 70px 70px 70px;
		margin-top: 130px;
		font-family: 'Noto Sans TC', sans-serif;
		color: black;
		text-shadow: 1px 1px rgba(230,180,180,0.6);
	}
	@media (max-width: 1020px) {
		.logo{
			font-size: 120px;
			left: calc(50% - 218.5px);
		}
	}
	@media (max-width: 900px) {
		.logo{
			font-size: 100px;
			left: calc(50% - 182px);
		}
		.content1{
			padding: 0px 40px 40px 40px;
		}
	}
		@media (max-width: 767px) {
			.logo{
				font-size: 140px;
				left: calc(50% - 254px);
			}
			.content1{
				margin-top:90px;
			}
		}
		@media (max-width: 600px) {
			.logo{
				font-size: 120px;
				left: calc(50% - 218.5px);
			}
		}
		@media (max-width: 480px) {
			.logo{
				font-size: 100px;
				left: calc(50% - 182px);
			}
			.content1{
				margin-top: 55px;
			}

		}
		@media (max-width: 381px) {
			.logo{
				font-size: 80px;
				left: calc(50% - 145px);
			}
			.content1{
				font-size: 14px;
			}
		}
</style>
