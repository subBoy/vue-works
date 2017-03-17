<template>
	<transition name="slideLeft">
		<div class="subScribe-wrapper" ref="subScribeWrapper" v-show="subScribeStatus" :proId="projectID">
			<div>
				<Vtitle :topTitle="titleData" :setOnck="setOnck" @setSubFalse="setSubFalse">
					<span slot="detailLink" class="detail-link">详情</span>
				</Vtitle>
				<div class="subScribe-bg">
					<div class="sub-latest">
						<div class="latest-info">
							<canvas id="sub-canvas" width="1800" height="1800">
							  <p>抱歉，您的浏览器不支持canvas</p>
							</canvas>
							<div class="latest-info-wrapper">
								<p class="return-txt"><span class="num" v-text="rateVal"></span><span class="unit">%</span></p>
								<p class="desc">预期年化收益率</p>
								<p class="latest-info-list">
									<span><span class="Quota latest-info-item">融资额<em class="styl">{{projectData.Quota}}</em>万元</span></span>
									<span class="bg-icon"><span class="term latest-info-item">期限<em class="styl">{{projectData.term}}</em>个月</span></span>
								</p>
							</div>
						</div>
					</div>
					<div class="subScribe-info-wrapper">
						<ul class="subScribe-info border-1px">
							<li class="info-item">
								<span class="item item-desc">可认购余额</span>
								<span class="item item-data">{{projectData.Balance}}元</span>
							</li>
							<li class="info-item">
								<span class="item item-desc">账户余额</span>
								<span class="item item-data">{{}}元</span>
							</li>
							<li class="info-item">
								<span class="item item-desc">理财工号</span>
								<span class="item item-data"><input class="inp-box" type="text" placeholder="输入工号"></span>
							</li>
						</ul>
					</div>
				</div>
				<div class="subScribe-operating border-1px">
					<p class="desc">认购金额</p>
					<div class="operating-wrapper">
						<span class="less btns"><button class="btn not-ck">-</button></span>
						<span class="operat-input"><input class="ipt" type="text" placeholder="请输入整数金额（≥100元）"></span>
						<span class="add btns"><button class="btn">+</button></span>
					</div>
					<div class="subScribe-return">
						<p class="return"><span class="desc">预期收益：<em class="rn-data">???</em></span><span class="recharge">立即充值</span></p>
						<p class="voucher"><span class="desc">使用券</span><span class="operat-btn operating"><em class="operat-view"></em></span></p>
					</div>
				</div>
				<div class="voucher-wrapper">
					<ul class="voucher-list">
						<li class="voucher-item">
							<div class="voucher-name"><span class="sel-btn"><em class="sel-view"></em></span><span class="name">双十二红包</span></div>
							<div class="voucher-operat">
								<span class="desc">可使用</span>
								<div class="operating-wrapper">
									<span class="less btns"><button class="btn not-ck">-</button></span>
									<span class="operat-input"><input class="ipt" type="text" value="1"></span>
									<span class="add btns"><button class="btn">+</button></span>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<div class="subScribe-btn-wrapper border-1px">
					<div class="subScribe-btn">
						<button class="desc">立即购买</button>
					</div>
				</div>
			</div>
		</div>
	</transition>
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
				rateVal: 0,
				setOnck: true,
				projectData: {}
			};
		},
		methods: {
			getData () {
				let _this = this;
				axios.get('/api/projectList').then(function(response) {
					response = response.data;
					if (response.errno === ERR_OK) {
						for (var i = 0; i < response.data.length; i++) {
							if (response.data[i].id === _this.projectID) {
								_this.projectData = response.data[i];
								toCanvas('sub-canvas', _this.projectData.schedule, Math.PI * 1, Math.PI * 2, Math.PI * 1, Math.PI * 1, 830, 50);
								_this.$nextTick(() => {
									_this.interestRate();
								});
								return;
							}
						};
					}
				});
			},
			interestRate () {
				let rate = this.projectData.interestRate;
				let hike = this.projectData.Hike;
				let interestRateVal = '';
				if (hike > 0) {
					interestRateVal = parseFloat(rate).toFixed(2) + '+' + parseFloat(hike).toFixed(1);
				} else {
					interestRateVal = parseFloat(rate).toFixed(2);
				}
				this.rateVal = interestRateVal;
			},
			setSubFalse () {
				this.$store.commit('setFalse');
				this.$store.commit('clearProjectID');
			}
		},
		computed: {
			subScribeStatus () {
				return this.$store.state.subScribeStatus;
			},
			projectID () {
				this.$nextTick(() => {
					this.getData();
				});
				return this.$store.state.projectId;
			}
		},
		components: {
			Vtitle
		}
	};
</script>

<style lang="scss">
	@import '../../common/scss/mixin.scss';

	.subScribe-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10000;
		background-color: #fff;
		transform: translate3d(0, 0, 0);
		transition: all 0.5s;
    &.slideLeft-enter, &.slideLeft-leave-active{
    	transform: translate3d(100%, 0, 0);
    }
		.subScribe-bg {
			background: linear-gradient(to right,  #3dc7ff 0%, #1a78fc 100%);
			.sub-latest {
				padding-top: 46px;
				.latest-info {
					position: relative;
					height: 120px;
					text-align: center;
					overflow: hidden;
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
						.bg-icon {
							padding-left: 30px;
						}
						.latest-info-item {
							font-size: 11px;
							background-repeat: no-repeat;
							background-size: 14px auto;
							background-position: left top;
							&.Quota {
								border-right: 1px solid #e7e7e7;
								padding: 0 30px 0 18px;
								color: #fff;
								background-image: url(/static/images/q-icon.png);
							}
							&.term {
								padding-left: 18px;
								color: #fff;
								background-image: url(/static/images/term-icon.png);
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
			.subScribe-info-wrapper {
				padding: 10px 0 15px 0;
				margin-top: 5px;
				background-image: url(/static/images/s-t-bg.png);
				background-repeat: no-repeat;
				background-size: 100%;
				.subScribe-info {
					padding: 15px 10px 0 10px;
					display: flex;
					&:after {
						top: 0;
						@include border-1px($color: #fff);
					}
					.info-item {
						flex: 1;
						.item {
							display: block;
							width: 100%;
							color: #fff;
							text-align: center;
							&.item-desc {
								line-height: 9px;
								font-size: 9px;
								margin-bottom: 5px;;
							}
							&.item-data {
								font-size: 10px;
								height: 20px;
								line-height: 20px;
							}
							.inp-box {
								line-height: 17px;
								width: 60%;
								height: 17px;
								border: 1px solid #fff;
								border-radius: 17px;
								text-align: center;
								font-size: 8px;
								color: #fff;
								background: transparent!important;
								&:-moz-placeholder {
								    color: #fff;
								}
								&::-moz-placeholder {
								    color: #fff;
								}
								&:-ms-input-placeholder{
								    color: #fff;
								}
								&::-webkit-input-placeholder {
								  color: #fff;
								}
							}
						}
					}
				}
			}
		}
		.subScribe-operating {
			padding: 10px;
			&:after {
				bottom: 0;
				@include border-1px($color: #e7e7e7);
			}
			.desc {
				font-size: 10px;
				color: #969696;
			}
			.operating-wrapper {
				display: flex;
				margin-top: 5px;
				border: 1px solid #e9e9e9;
				border-radius: 4px;
				height: 25px;
				.operat-input {
					flex: 1;
					.ipt {
						width: 100%;
						height: 100%;
						font-size: 9px;
						text-align: center;
						line-height: 23px;
					}
				}
				.btns {
					flex: 0 0 30px;
					width: 30px;
					.btn {
						width: 100%;
						height: 100%;
						border: none;
						background: transparent!important;
						font-size: 12px;
						color: #0d5ffb;
						&.not-ck {
							color: #e8e8e8;
						}
					}
					&.less {
						border-right: 1px solid #e9e9e9;
					}
					&.add {
						border-left: 1px solid #e9e9e9;
					}

				}
			}
			.subScribe-return {
				.return {
					margin: 10px 0 15px 0;
					line-height: 10px;
					.desc {
						display: inline-block;
						vertical-align: top;
						line-height: 10px;
						.rn-data {
							display: inline-block;
							vertical-align: top;
							line-height: 10px;
							font-size: 10px;
						}
					}
					.recharge {
						display: inline-block;
						vertical-align: top;
						line-height: 10px;
						float: right;
						font-size: 10px;
						color: #0d5ffb;
					}
				}
				.voucher {
					line-height: 14px;
					.operat-btn {
						display: block;
						width: 30px;
						height: 14px;
						border-radius: 14px;
						float: right;
						background-color: #0d5ffb;
						position: relative;
						overflow: hidden;
						.operat-view {
							display: block;
							position: absolute;
							top: 2px;
							right: 2px;
							width: 10px;
							height: 10px;
							border-radius: 10px;
							background-color: #fff;
						}
					}
				}
			}
		}
		.voucher-wrapper {
			padding: 0 10px 10px 10px;
			.voucher-item {
				display: flex;
				margin-top: 10px;
				height: 22px;
				.voucher-name {
					position: relative;
					flex: 1;
					.sel-btn {
						display: block;
						position: absolute;
						left: 0;
						top: 4px;
						width: 12px;
						height: 12px;
						border: 1px solid #e7e7e7;
						border-radius: 3px;
						background-image: url(/static/images/selected.png);
						background-position: center;
						background-repeat: no-repeat;
						background-size: 5px auto;
					}
					.name {
						display: inline-block;
						font-size: 10px;
						color: #323232;
						line-height: 22px;
						padding-left: 17px;
					}
				}
				.voucher-operat {
					flex: 0 0 136px;
					width: 136px;
					.desc {
						display: inline-block;
						line-height: 22px;
						vertical-align: top;
						font-size: 9px;
						color: #969696;
					}
					.operating-wrapper {
						display: flex;
						width: 100px;
						float: right;
						border: 1px solid #e9e9e9;
						border-radius: 4px;
						height: 22px;
						vertical-align: top;
						.operat-input {
							flex: 1;
							.ipt {
								width: 100%;
								height: 100%;
								font-size: 9px;
								text-align: center;
								line-height: 20px;
							}
						}
						.btns {
							flex: 0 0 25px;
							width: 25px;
							.btn {
								width: 100%;
								height: 100%;
								border: none;
								background: transparent!important;
								font-size: 12px;
								color: #0d5ffb;
								&.not-ck {
									color: #e8e8e8;
								}
							}
							&.less {
								border-right: 1px solid #e9e9e9;
							}
							&.add {
								border-left: 1px solid #e9e9e9;
							}
						}
					}
				}
			}
		}
	}
	.subScribe-btn-wrapper {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 42px;
		z-index: 10001;
		background-color: #fafafa;
		&.border-1px {
			position: fixed;
		}
		&:after {
			top: 0;
			@include border-1px($color: #e7e7e7);
		}
		.subScribe-btn {
			margin: 5px 10px;
			.desc {
				display: block;
				width: 100%;
				height: 32px;
				background-color: #ff6600!important;
				color: #fff;
				font-size: 13px;
				text-align: center;
				border: none;
				border-radius: 4px;
			}
		}
	}
</style>
