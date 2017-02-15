<template>
	<div class="guide">
		<swiper :options="swiperOption" class="swiper-box">
			<swiper-slide class="swiper-item">Slide 1</swiper-slide>
			<swiper-slide class="swiper-item">Slide 2</swiper-slide>
			<swiper-slide class="swiper-item">Slide 3</swiper-slide>
			<swiper-slide class="swiper-item">Slide 4</swiper-slide>
			<swiper-slide class="swiper-item">Slide 5</swiper-slide>
			<swiper-slide class="swiper-item">Slide 6</swiper-slide>
			<swiper-slide class="swiper-item">Slide 7</swiper-slide>
			<swiper-slide class="swiper-item">Slide 8</swiper-slide>
			<swiper-slide class="swiper-item">Slide 9</swiper-slide>
			<swiper-slide class="swiper-item">Slide 10</swiper-slide>
			<div class="swiper-pagination"  slot="pagination"></div>
		  <!-- <div class="swiper-button-prev" slot="button-prev"></div>
		  <div class="swiper-button-next" slot="button-next"></div>
		  <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
		</swiper>
	</div>
</template>

<script>
	import {swiper, swiperSlide} from 'vue-awesome-swiper';
	import axios from 'axios';

	export default {
		data() {
			return {
				swiperOption: {
	        notNextTick: true,
	        // autoplay: 3000,
	        // direction: 'vertical',
	        grabCursor: true,
	        setWrapperSize: true,
	        autoHeight: true,
	        pagination: '.swiper-pagination',
	        paginationClickable: true,
	        // prevButton: '.swiper-button-prev',
	        // nextButton: '.swiper-button-next',
	        // scrollbar: '.swiper-scrollbar',
	        mousewheelControl: true,
	        observeParents: true,
	        loop: true,
	        debugger: true,
	        onTransitionStart(swiper) {
	        }
	      },
	      guideMaps: []
			};
		},
		created () {
			axios.get('/api/guides')
				.then(function (response) {
			    console.log(response);
			  })
			  .catch(function (response) {
			    console.log(response);
			  });
		},
		computed: {
		},
		components: {
			swiper,
			swiperSlide
		}
	};
</script>

<style lang="scss">
	html,body {
		position: relative;
		height: 100%;
	}
	body {
		background: #eee;
	}
	.swiper-box {
		width: 100%;
		height: 100%;
		margin: 0 auto;
	}
	.swiper-item {
		height: 100%;
		text-align: center;
		font-size: 18px ;
		background: #fff;
		display: -webkit-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		align-items: center;
	}
</style>
