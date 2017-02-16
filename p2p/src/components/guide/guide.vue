<template>
	<div class="guide">
		<swiper :options="swiperOption" class="swiper-box">
			<swiper-slide class="swiper-item" v-for="item in guideMaps"><img :src="item" alt=""></swiper-slide>
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

	const ERR_OK = 0;

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
			/* eslint no-mixed-spaces-and-tabs: ["error", "smart-tabs"] */
			var _this = this;
			axios.get('/api/guides')
				.then(function (response) {
					if (response.errno === ERR_OK) {
						_this.guideMaps = response.data.data;
					}
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
