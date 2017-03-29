<template>
	<div class="latest">
		<h3 class="name">{{latest.name}}</h3>
		<div class="latest-info">
			<canvas id="canvas" width="1800" height="1800">
			  <p>抱歉，您的浏览器不支持canvas</p>
			</canvas>
			<div class="latest-info-wrapper">
				<p class="desc">预期年化收益率</p>
				<p class="return-txt"><span class="num" v-text="rateVal"></span><span class="unit">%</span></p>
				<p class="latest-info-list">
					<span class="Quota latest-info-item">融资额<em class="styl">{{latest.Quota}}</em>万元</span>
					<span class="term latest-info-item">期限<em class="styl">{{latest.term}}</em>个月</span>
				</p>
				<div><a class="gotoDbtn" @click="lateSub(latest.id)">立即购买</a></div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import {toCanvas} from 'common/js/canvas';
	import {loadFromLocal} from 'common/js/store';

	const ERR_OK = 0;

	export default {
		data () {
			return {
				latest: {
					type: Object
				},
				rateVal: 0
			};
		},
		created () {
			let _this = this;
			axios.get('/api/latestProject').then(function (response) {
				response = response.data;
				if (response.errno === ERR_OK) {
					_this.latest = response.data[0];
					toCanvas('canvas', _this.latest.schedule, Math.PI * 1, Math.PI * 2, Math.PI * 1, Math.PI * 1, 830, 50);
					_this.$nextTick(() => {
						_this.interestRate();
					});
				}
			});
		},
		methods: {
			interestRate () {
				let rate = this.latest.interestRate;
				let hike = this.latest.Hike;
				let interestRateVal = '';
				if (hike > 0) {
					interestRateVal = parseFloat(rate).toFixed(2) + '+' + hike;
				} else {
					interestRateVal = parseFloat(rate).toFixed(2);
				}
				this.rateVal = interestRateVal;
			},
			lateSub (id) {
				let userId = loadFromLocal('userId');
				if (userId === undefined) {
					this.$store.commit('setConfirmTrue', {
						Title: '您还没有登录！此操作需登录后才能执行！是否立即去登录？',
						cancelText: '否',
						okText: '是',
						cancelOperate: 0,
						OkOperate: 'signIn'

					});
				} else {
					this.$store.commit('setProjectID', id);
					this.$store.commit('setScribeStatus', true);
				}
			}
		}
	};
</script>

<style lang="scss">
	.latest {
		padding-top: 15px;
		.name {
			padding: 0 10px 10px 10px;
			line-height: 11px;
			font-size: 11px;
			color: #464646;
		}
		.latest-info {
			position: relative;
			height: 180px;
			text-align: center;
			#canvas {
				position: absolute;
				top: 0;
				left: 50%;
				margin-left: -90px;
				z-index: 1;
				transform:scale(0.1, 0.1);
				transform-origin: 0 0;
			}
		}
		.latest-info-wrapper {
			position: absolute;
			width: 100%;
			top: 30px;
			left: 0;
			z-index: 10;
			.desc {
				line-height: 12px;
				font-size: 9px;
				color: #464646;
				margin-bottom: 15px;
			}
			.return-txt {
				line-height: 26px;
				color: #0b5afb;
				margin-bottom: 16px;
				.num {
					font-size: 26px;
				}
				.unit {
					font-size: 16px;
				}
			}
			.latest-info-list {
				font-size: 0;
				.latest-info-item {
					font-size: 11px;

					&.Quota {
						border-right: 1px solid #e7e7e7;
						padding-right: 30px;
					}
					&.term {
						padding-left: 30px;
					}
					.styl {
						font-style: normal;
						font-size: 14px;
					}
				}
			}
			.gotoDbtn {
				margin: 15px auto 0 auto;
				display: block;
				width: 200px;
				height: 30px;
				line-height: 30px;
				color: #fafafa;
				font-size: 15px;
				border-radius: 30px;
				text-align: center;
				background-color: #f60;
			}
		}
	}
</style>
