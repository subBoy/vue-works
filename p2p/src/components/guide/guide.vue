<template>
	<div class="guide">
		<swiper :options="swiperOption" class="swiper-box" ref="myswiper">
			<swiper-slide class="swiper-item" v-for="item in guideMaps">
				<a v-if="item.link && item.link !== ''" :href="item.link" @click="guideHide"></a>
				<img :src="item.map" width="100%" height="100%" alt="">
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination" v-show="Subscript"></div>
		  <!-- <div class="swiper-button-prev" slot="button-prev"></div>
		  <div class="swiper-button-next" slot="button-next"></div>
		  <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
		</swiper>
	</div>
</template>

<script>
	// import Vue from 'vue';
	import {swiper, swiperSlide} from 'vue-awesome-swiper';
	import axios from 'axios';

	const ERR_OK = 0;

	export default {
		props: {
			update: {
        type: Boolean
      }
		},
		data() {
			return {
				swiperOption: {
	        notNextTick: true,
	        // autoplay: 3000,
	        // direction: 'vertical',
	        grabCursor: true,
	        setWrapperSize: true,
	        // autoHeight: true,
	        pagination: '.swiper-pagination',
	        paginationClickable: true,
	        // prevButton: '.swiper-button-prev',
	        // nextButton: '.swiper-button-next',
	        // scrollbar: '.swiper-scrollbar',
	        mousewheelControl: true,
	        observeParents: true,
	        // loop: true,
	        debugger: true,
	        onTransitionStart(swiper) {
	        }
	      },
	      guideMaps: [],
	      update: false,
	      activeIndex: 0,
	      swiperLength: 0,
	      thisSwiper: {}
			};
		},
		created () {
			let _this = this;
			axios.get('/api/guides')
				.then(function (response) {
					if (response.data.errno === ERR_OK) {
						_this.guideMaps = response.data.data;
						_this.swiperLength = response.data.data.length - 1;
						_this.$nextTick(function () {
							_this.conInd();
						});
					}
			  })
			  .catch(function (response) {});
		},
		computed: {
			Subscript () {
				if (this.thisSwiper.activeIndex && this.thisSwiper.activeIndex === this.swiperLength) {
					return false;
				} else {
					return true;
				}
			}
		},
		methods: {
			conInd () {
				this.thisSwiper = this.$refs.myswiper.swiper;
			},
			guideHide () {
				this.update = false;
			}
		},
		components: {
			swiper,
			swiperSlide
		}
	};
</script>

<style lang="scss">
	.guide {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 99;
		background-color: #eee;
		transition: all 0.5s;
		&.guide-hide {
			left: -110%;
		}
		.swiper-box {
			width: 100%;
			height: 100%;
			margin: 0 auto;
		}
		.swiper-item {
			position: relative;
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
		.swiper-item a {
			display: block;
			position: absolute;
			width: 100%;
			height: 40%;
			bottom: 0;
			left: 0;
			z-index: 10;
		}
	}
</style>
