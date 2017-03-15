<template>
	<div class="subScribe-wrapper">
		<Vtitle :topTitle="titleData">
			<span slot="detailLink" class="detail-link">详情</span>
		</Vtitle>
		<div class="sub-latest">
			<div class="latest-info">
				<canvas id="sub-canvas" width="1800" height="1800">
				  <p>抱歉，您的浏览器不支持canvas</p>
				</canvas>
				<div class="latest-info-wrapper">
					<p class="return-txt"><span class="num" v-text="rateVal"></span><span class="unit">%</span></p>
					<p class="desc">预期年化收益率</p>
					<p class="latest-info-list">
						<span class="Quota latest-info-item">融资额<em class="styl">{{latest.Quota}}</em>万元</span>
						<span class="term latest-info-item">期限<em class="styl">{{latest.term}}</em>个月</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Vtitle from 'components/title/title';
	import axios from 'axios';
	import {toCanvas} from 'common/js/canvas';

	const ERR_OK = 0;

	export default {
		data () {
			return {
				titleData: {
					name: '认购',
					classNum: 0
				},
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
					_this.latest = response.data;
					toCanvas('sub-canvas', _this.latest.schedule, Math.PI * 1, Math.PI * 2, Math.PI * 1, Math.PI * 1, 830, 50);
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
			}
		},
		components: {
			Vtitle
		}
	};
</script>

<style lang="scss">
	.subScribe-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10000;
		background-color: #fff;
		.sub-latest {
			padding-top: 46px;
			background: linear-gradient(to right,  #3dc7ff 0%, #1a78fc 100%);
			.latest-info {
				position: relative;
				height: 180px;
				text-align: center;
				#sub-canvas {
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
				top: 44px;
				left: 0;
				z-index: 10;
				.desc {
					line-height: 12px;
					font-size: 9px;
					color: #fff;
					margin-bottom: 15px;
				}
				.return-txt {
					line-height: 26px;
					color: #fff;
					margin-bottom: 4px;
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
							color: #fff;
						}
						&.term {
							padding-left: 30px;
							color: #fff;
						}
						.styl {
							font-style: normal;
							font-size: 14px;
							color: #fff;
						}
					}
				}
			}
		}
	}
</style>
