<template>
	<div class="lists-wrapper">
		<Vtitle :topTitle="titleData"></Vtitle>
		<div class="Refresh" :style="{top: refreshTop + 'px'}"></div>
		<div class="onloading" :class="{'loaded': dataLength === listsDatas.length}" :style="{bottom: refreshBottom + 'px'}"><span class="desc" v-if="dataLength === listsDatas.length">已经没有更多！！！</span></div>
		<div class="lists-content" ref="listsWrapper">
			<div class="lists-tiem-wrapper" ref="listTiemWrapper">
				<h3 class="ensure"><span class="desc">网贷存管通，看得见的保障</span></h3>
				<ul class="lists-tiem-list">
					<li class="lists-tiem border-1px" v-for="(item, index) in listData" ref="countWrapper">
						<h3 class="name">{{item.name}}</h3>
						<div class="list-tiem-info">
							<div class="list-tiem-bg" :class="classList[index]"></div>
							<div class="list-tiem-canvas">
								<canvas class="canvasStyl" :id="'proId' + item.id" width="1000" height= "1000"></canvas>
								<div class="tiem-return">
									<p class="return-txt">
										<span class="num">{{parseFloat(item.interestRate).toFixed(2)}}</span>
										<span v-if="item.Hike && item.Hike !== 0" class="num">+{{parseFloat(item.Hike).toFixed(1)}}</span>
										<span class="unit">%</span>
									</p>
									<p class="desc">预期年化收益率</p>
								</div>
							</div>
						</div>
						<p class="latest-info-list">
							<span class="Quota latest-info-item"><span class="term-wrapper">融资额：<em class="styl">{{item.Quota}}</em>万元</span></span>
							<span class="term latest-info-item"><span class="term-wrapper">期限：<em class="styl">{{item.term}}</em>个月</span></span>
						</p>
						<div class="details-btn" :class="classList[index]" :startTime="item.startTime" :scheDule="item.schedule"></div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import Vtitle from 'components/title/title';
	import {toCanvas} from 'common/js/canvas';
	import axios from 'axios';

	const ERR_OK = 0;
	let loadingBl = true;

	export default {
		data () {
			return {
				titleData: {
					name: '理财产品',
					classNum: 0
				},
				listsDatas: [],
				viewDatas: [],
				startIndex: 0,
				initLength: 0,
				dataLength: 0,
				classList: [],
				refreshTop: -30,
				refreshBottom: -30
			};
		},
		created () {
			this.loadingData();
			let _h = 0;
			let _ch = 0;
			_h = document.body.offsetHeight;
			_ch = _h - 110;
			this.initLength = Math.ceil(_ch / 200);
			// 初始化
			this.startIndex = 0;
			this.dataLength = this.initLength;
		},
		computed: {
			listData () {
				let i = 0;
				let _this = this;
				if (this.dataLength <= this.listsDatas.length) {
					for (i = this.startIndex; i < this.dataLength; i++) {
						this.viewDatas[i] = this.listsDatas[i];
						(function(i) {
							_this.$nextTick(function () {
								if (_this.listsDatas[i].schedule !== 0) {
									toCanvas('proId' + _this.listsDatas[i].id, _this.listsDatas[i].schedule, Math.PI * 0, Math.PI * 2, Math.PI * 2, Math.PI * 0, 470, 50);
								}
							});
						})(i);
					};
				} else {
					for (i = this.startIndex; i < this.listsDatas.length; i++) {
						this.viewDatas[i] = this.listsDatas[i];
						(function(i) {
							_this.$nextTick(function () {
								if (_this.listsDatas[i].schedule !== 0) {
									toCanvas('proId' + _this.listsDatas[i].id, _this.listsDatas[i].schedule, Math.PI * 0, Math.PI * 2, Math.PI * 2, Math.PI * 0, 470, 50);
								}
							});
						})(i);
					};
				}
				loadingBl = true;
				_this.$nextTick(function () {
					_this._initScroll();
					_this.refreshBottom = -30;
				});
				return this.viewDatas;
			}
		},
		methods: {
			loadingData () {
				let _this = this;
				axios.get('/api/projectList').then(function(response) {
					response = response.data;
					if (response.errno === ERR_OK) {
						_this.listsDatas = response.data;
						for (var i = 0; i < response.data.length; i++) {
							let nowTime = new Date().getTime();
							let startTime = new Date(response.data[i].startTime).getTime();
							if (nowTime >= startTime) {
								_this.classList.push('started');
							} else {
								_this.classList.push('startBefore');
							}
						};
					}
				});
			},
			_initScroll (event) {
        if (!this.listScroll) {
          this.listScroll = new BScroll(this.$refs.listsWrapper, {
            click: true,
            probeType: 3
          });
          let _this = this;
          this.listScroll.on('scroll', function (pos) {
						let _y = Math.round(pos.y);
						_this.refreshTop = _y;
						// 下拉刷新
						if (_y > 50) {
							_this.refreshTop = 50;
							if (_y > 70 && loadingBl) {
								_this.listScroll.scrollTo(0, 70, 0);
								loadingBl = false;
								// window.setTimeout(function () { // 为了模拟数据加载时间间隔
								// 	_this.loadingData();
								// 	_this.startIndex = 0;
								// 	_this.dataLength = _this.initLength;
								// }, 300);
								window.location.reload(true);
							}
						};
						// 上拉加载
						let _adsY = Math.abs(Math.round(pos.y));
						let _viewh = document.body.offsetHeight - 110;
						let _boxh = _this.$refs.listTiemWrapper.offsetHeight;
						let adsY = _boxh - _viewh + 40;
						if (_y < 0 && loadingBl) {
							_this.refreshBottom = _adsY - _boxh + _viewh;
							if (_adsY > adsY) {
								_this.refreshBottom = 70;
								let loadL = _this.dataLength + (_this.initLength * 2);
								if (loadL >= _this.listsDatas.length) {
									loadL = _this.listsDatas.length;
								}
								loadingBl = false;
								window.setTimeout(function () { // 为了模拟数据加载时间间隔
									_this.startIndex = _this.dataLength;
									_this.dataLength = loadL;
								}, 300);
							}
						} else {
							_this.refreshBottom = _adsY - _boxh + _viewh;
						}
	        });
        } else {
          this.listScroll.refresh();
        };

        if (this.$refs.countWrapper) {
					let countDatas = this.$refs.countWrapper;
					let len = countDatas.length;
					let _this = this;
					for (var i = 0; i < len; i++) {
						(function (i) {
							let stTime = countDatas[i].getElementsByClassName('details-btn')[0].getAttribute('startTime');
							let seDule = countDatas[i].getElementsByClassName('details-btn')[0].getAttribute('scheDule');
							_this.countDowns(stTime, seDule, i, countDatas[i].getElementsByClassName('details-btn')[0]);
						})(i);
					};
        }
      },
      countDowns (date, schedule, index, obj) {
				let txt = '';
				let _this = this;
				function setInter () {
					let _date = new Date(date).getTime();
					let _now = new Date().getTime();
					let _differ = parseInt(_now - _date);
					if (_differ >= 0) {
						if (schedule === '100') {
							txt = '已售罄';
						} else {
							txt = '立即购买';
						}
					} else {
						let _d, _h, _m, _s;
						_differ = -parseInt(_differ / 1000);
						_d = parseInt(_differ / 24 / 3600);
						_h = parseInt((_differ % (24 * 3600)) / 3600);
						_m = parseInt(((_differ % (24 * 3600)) % 3600) / 60);
						_s = parseInt(((_differ % (24 * 3600)) % 3600) % 60);
						_d = _this.padLeftZero(_d + '');
						_h = _this.padLeftZero(_h + '');
						_m = _this.padLeftZero(_m + '');
						_s = _this.padLeftZero(_s + '');
						txt = _d + '天' + _h + '小时' + _m + '分钟' + _s + '秒' + ' ' + '开放投资';
					}
					obj.innerHTML = txt;
				};
				setInter();
				setInterval(setInter, 1000);
			},
			padLeftZero (str) {
			  return ('00' + str).substr(str.length);
			}
		},
		components: {
			Vtitle
		}
	};
</script>

<style lang="scss">
	@import '../../common/scss/mixin.scss';

	.lists-wrapper {
		position: absolute;
		top: 0;
		bottom: 0;
		width: 100%;
		overflow: hidden;
		transition: all 0.5s;
		z-index: 98;
		background-color: #fff;
		transform: translate3d(0, 0, 0);
    &.slideRight-enter {
    	z-index: 100;
    	transform: translate3d(100%, 0, 0);
    }
    .Refresh {
    	position: fixed;
    	top: -30px;
    	left: 50%;
    	margin-left: -14px;
    	width: 28px;
    	height: 28px;
    	background-image: url(/static/images/Refresh.gif);
    	background-repeat: no-repeat;
    	background-position: center;
    	background-size: 25px 27px;
    }
    .onloading {
    	position: fixed;
    	bottom: -30px;
    	left: 50%;
    	margin-left: -14px;
    	width: 28px;
    	height: 28px;
    	background-image: url(/static/images/Refresh.gif);
    	background-repeat: no-repeat;
    	background-position: center;
    	background-size: 25px 27px;
    	&.loaded {
    		background-image: none;
    		.desc {
    			display: block;
    			position: absolute;
    			left: 50%;
    			top: 0;
    			width: 200px;
    			margin-left: -100px;
    			text-align: center;
    			font-size: 10px;
    			line-height: 28px;
    			color: #ececec;
    		}
    	}
    }
    .lists-content {
    	position: absolute;
			top: 46px;
			bottom: 47px;
			width: 100%;
			overflow: hidden;
    }
    .lists-tiem-wrapper {
    	padding-bottom: 18px;
    	.ensure {
    		height: 30px;
    		text-align: center;
    		background-color: #fafafa;
    		.desc {
    			display: inline-block;
    			line-height: 30px;
    			font-size: 9px;
    			color: #1a78fc;
    			padding-left: 24px;
    			background-repeat: no-repeat;
    			background-position: left center;
    			background-size: 19px;
    			@include bg-img($url:'/static/images/b-icon');
    		}
    	}
    	.lists-tiem-list {
    		.lists-tiem {
    			padding: 0 10px 10px 10px;
    			&:after {
    				bottom: 0;
    				@include border-1px($color: #ececec);
    			}
    			.name {
						line-height: 30px;
						font-size: 11px;
						color: #464646;
    			}
    			.list-tiem-info {
    				position: relative;
    				text-align: center;
    				.list-tiem-canvas {
    					position: absolute;
    					left: 50%;
    					top: 0;
    					width: 100px;
    					height: 100px;
    					margin-left: -50px;
    					.canvasStyl {
    						transform:scale(0.1, 0.1);
								transform-origin: 0 0;
    					}
    					.tiem-return {
    						position: absolute;
    						top: 0;
    						left: 0;
    						width: 100%;
    						z-index: 1;
    						text-align: center;
    						color: #2085fd;
    						.return-txt {
									font-size: 0;
									margin: 40px 0 5px 0;
									.num {
										font-size: 18px;
									}
									.unit {
										font-size: 12px;
									}
    						}
    						.desc {
    							font-size: 8px;
    						}
    					}
    				}
    				.list-tiem-bg {
    					margin: 0 auto 10px auto;
    					width: 100px;
    					height: 100px;
    					background-repeat: no-repeat;
    					background-position: center;
    					background-size: 100px 100px;
    					&.started {
								background-image: url(/static/images/list-icon-1.png);
								animation: an1 2s linear infinite alternate;
								transform-origin: 50% 50%;
    					}
    					&.startBefore{
    						background-image: url(/static/images/list-icon.png);
    					}
    				}
    			}
    		}
    	}
    	.latest-info-list {
    		display: flex;
    		padding: 0 30px 10px 30px;
    		font-size: 0;
    		.latest-info-item {
    			display: inline-block;
    			flex: 1;
					font-size: 10px;
					color: #969696;
					.term-wrapper {
  					display: inline-block;
  					padding-left: 17px;
  					background-repeat: no-repeat;
						background-position: left 0;
						background-size: 14px 12px;
						.styl {
							font-size: 14px;
						}
  				}
  				&.Quota {
  					border-right: 1px solid #ececec;
    				.term-wrapper {
    					@include bg-img($url:'/static/images/q-icon');
    				}
    			}
    			&.term {
    				.term-wrapper {
    					@include bg-img($url:'/static/images/term-icon');
    					float: right;
    				}
    			}
    		}
    	}
    	.details-btn {
    		margin: 0 auto;
    		width: 170px;
    		height: 26px;
    		line-height: 26px;
    		border-radius: 26px;
    		color: #fff;
    		text-align: center;
    		font-size: 10px;
				&.started {
					background-color: #f60;
				}
				&.startBefore{
					background-color: #c8c8c8;
				}
    	}
    }
 	}
 	@keyframes an1{
    from{
    	transform: rotate(5deg);
    }
    to{
    	transform: rotate(-5deg);
    }
	}
</style>
