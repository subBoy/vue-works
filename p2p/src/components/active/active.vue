<template>
	<div v-show="activeStatus" class="active-wrapper" :class="{'active-hide': activeHide}" ref="appA">
		<div class="active-icon"></div>
		<ul class="active-list" id="active-list">
			<li class="active-item" v-for="item in active"><a class="text" :href="item.link">{{item.desc}}</a></li>
		</ul>
		<div class="active-close" @click="activeClose($event)"></div>
	</div>
</template>

<script>
	import axios from 'axios';

	const ERR_OK = 0;

	export default {
		props: {
			interval: {
				type: Number,
				default: 3000
			},
			duration: {
				type: Number,
				default: 600
			},
			direction: {
				validator (val) {
					return val === 'up' || val === 'down';
				},
				default: 'up'
			}
		},
		data () {
			return {
				active: {
					type: Object
				},
				activeStatus: true,
				activeHide: false,
				height: '',
				length: 0,
				currentIndex: 0
			};
		},
		created () {
			let _this = this;
			axios.get('/api/active').then(function (response) {
				response = response.data;
				if (response.errno === ERR_OK) {
					_this.active = response.data;
					_this.$nextTick(() => {
						_this.fixList();
						_this.start();
					});
				}
			});
		},
		methods: {
			/*
			 * 根据方向将第一个或最后一个item复制添加到列表最后或前面，保证下一次轮播连贯
			 * 将单个item高度设置为广播视窗高度
			 */
			fixList () {
				let cloneNode;
				let activeList = document.getElementById('active-list');
				let firstItem = activeList.firstElementChild;
				// 根据item高度设置视窗container高度
				this.length = activeList.children.length;
				this.height = firstItem.offsetHeight;
				if (this.direction === 'up') {
					// 向上则clone第一个item置于列表末端
					cloneNode = firstItem.cloneNode(true);
					activeList.appendChild(cloneNode);
				} else {
					// 向下则clone最后一个item置于列表首部
					cloneNode = activeList.lastElementChild.cloneNode(true);
					activeList.insertBefore(cloneNode, firstItem);
				}
			},
			/*
			 * 启动轮播
			 */
			start () {
				let currenTransitionTime;
				let currenTranslateY;
				let activeList = document.getElementById('active-list');

				// 方向向下，列表初始时跳转到最后item
				if (this.direction === 'down') this.quickJump(false);

				setInterval(() => {
					if (this.direction === 'up') {
						this.currentIndex += 1;
					} else {
						this.currentIndex -= 1;
					}

					// 正常轮播transition时间为用户设置duration时间
					currenTransitionTime = 'transform ' + this.duration + 'ms ease-in-out';
					this.setTransition(activeList, currenTransitionTime);

					// 正常轮播每次currenTranslateY增加一个item高度
					if (this.direction === 'up') {
						currenTranslateY = -this.currentIndex * this.height + 'px';
					} else {
						currenTranslateY = -(this.currentIndex + 1) * this.height + 'px';
					}

					this.setTransform(activeList, 'translate3d(0,' + currenTranslateY + ',0)');

					// 当滑动到首尾边界替补item时，需即刻跳转到正确item位置
					if (this.currentIndex === this.length) {
						setTimeout(() => {
							this.quickJump(true);
						}, this.duration);
					} else if (this.currentIndex === -1) {
						setTimeout(() => {
							this.quickJump(false);
						}, this.duration);
					}
				}, this.interval + this.duration);
			},
			/*
			 * 设置transition 0ms，再设置translatet位置启动跳转
			 * 由于跳转前后展现的内容完全一样，肉眼看不到跳转过程
			 */
			quickJump (toFirst) {
				let currenTranslateY;
				let currenTransitionTime = 'transform 0ms ease-in-out';
				let activeList = document.getElementById('active-list');

				this.setTransition(activeList, currenTransitionTime);

				if (toFirst) {
					// 跳转到首个item
					this.currentIndex = 0;
					currenTranslateY = '0px';
				} else {
					this.currentIndex = this.length - 1;
					currenTranslateY = -(this.currentIndex + 1) * this.height + 'px';
				}

				this.setTransform(activeList, 'translate3d(0,' + currenTranslateY + ',0)');
			},
			/*
			 * transition添加浏览器前缀
			 * transform同
			 */
			setTransition (ele, val) {
				ele.style.transition = val;
				ele.style.WebkitTransition = '-webkit-' + val;
				ele.style.MozTransition = '-moz-' + val;
				ele.style.OTransition = '-o-' + val;
			},
			setTransform (ele, val) {
				ele.style.transform = val;
				ele.style.WebkitTransform = val;
				ele.style.MozTransform = val;
				ele.style.OTransform = val;
			},
			// 隐藏公告栏
			activeClose (event) {
				if (!event._constructed) {
          return;
        };
				this.activeHide = !this.activeHide;
				let _this = this;
				setTimeout(function () {
					_this.activeStatus = !_this.activeStatus;
					this.$emit('scrollId');
				}, 500);
			}
		}
	};
</script>

<style lang="scss">
	.active-wrapper {
		display: flex;
		height: 20px;
		background-image: linear-gradient(to left, #3bc4ff, #3dc7ff);
		overflow: hidden;
		transition: all 0.5s;
		&.active-hide {
			transform: translate3d(-100%, 0, 0);
		}
		.active-icon {
			flex: 0 0 25px;
			margin-right: 5px;
			width: 25px;
			background-image: url(/static/images/active-ic.png);
			background-position: center right;
			background-size: 11px 11px;
			background-repeat: no-repeat;
		}
		.active-list {
			flex: 1;
			.active-item .text {
				display: block;
				font-size: 9px;
				line-height: 20px;
				white-space:nowrap;
				overflow:hidden;
				text-overflow:ellipsis;
				color: #fff;
			}
		}
		.active-close {
			flex: 0 0 28px;
			width: 28px;
			margin-left: 5px;
			background-image: url(/static/images/active-close.png);
			background-repeat: no-repeat;
			background-position: center;
			background-size: 6px;
		}
	}
</style>
