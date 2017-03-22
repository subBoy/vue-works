<template>
	<div class="v-header-wrapper" ref="appA">
		<div class="v-header">
			<img class="v-logo" src="/static/images/logo.png" alt="">
			<span class="v-login"><a class="sign-in" @click="signIn">登录</a>/<a class="sign-on" @click="signUp">注册</a></span>
		</div>
		<swiper :options="swiperOption" class="swiper-box" ref="myswiper">
			<swiper-slide class="swiper-item" v-for="item in slideBanner">
				<a :href="item.link">
					<img :src="item.map" width="100%" alt="">
				</a>
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
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
		data() {
			return {
				swiperOption: {
	        notNextTick: true,
	        autoplay: 4000,
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
	        loop: true,
	        debugger: true,
	        onTransitionStart(swiper) {
	        }
	      },
	      slideBanner: [],
	      thisSwiper: {}
			};
		},
		created () {
			let _this = this;
			axios.get('/api/slide')
				.then(function (response) {
					if (response.data.errno === ERR_OK) {
						_this.slideBanner = response.data.data;
						_this.$nextTick(() => {
							_this.loadImage(_this.slideBanner[0].map, _this.call);
						});
					}
			  });
		},
		methods: {
			loadImage (url, callback) {
		    let img = new Image();
		    img.onload = function () {
	        img.onload = null;
	        callback();
		    };
		    img.src = url;
			},
			call () {
				this.$emit('scrollId');
				this.$emit('load');
			},
			signIn () {
				this.$router.push('signIn');
			},
			signUp () {
				this.$router.push('signUp');
			}
		},
		components: {
			swiper,
			swiperSlide
		}
	};
</script>

<style lang="scss">
	.v-header-wrapper {
		.v-header {
			position: absolute;
			width: 100%;
			left: 0;
			top: 0;
			height: 36px;
			z-index: 10;
			.v-logo {
				height: 16px;
				float: left;
				margin: 10px;
			}
			.v-login {
				float: right;
				color: #fff;
				font-size: 12px;
				line-height: 36px;
				padding-right: 8px;
				.sign-on, .sign-in {
					display: inline-block;
					color: #fff;
					padding: 0 2px;
				}
			}
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
			font-size: 18px;
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
			width: 100%;
		}
		.swiper-pagination-bullet {
			width: 20px;
			height: 5px;
			border-radius: 5px;
			background-color: #5c9cfd;
		}
		.swiper-pagination-bullet.swiper-pagination-bullet-active {
			background-color: #fff;
		}
	}
</style>
