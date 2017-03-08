<template>
	<div class="lists-wrapper">
		<Vtitle :topTitle="titleData"></Vtitle>
		<div class="lists-content" ref="listsWrapper">
			<div class="lists-tiem-wrapper">
				<h3 class="ensure"><span class="desc">网贷存管通，看得见的保障</span></h3>
				<ul class="lists-tiem-list">
					<li class="lists-tiem border-1px" v-for="item in listData">
						<h3 class="name">{{item.name}}</h3>
						<div class="list-tiem-info">
							<div class="list-tiem-bg"></div>
							<div class="list-tiem-canvas">
								<canvas :id="item.id" width="100" height= "100"></canvas>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll';
	import Vtitle from 'components/title/title';
	import axios from 'axios';

	const ERR_OK = 0;

	export default {
		data () {
			return {
				titleData: {
					name: '理财产品',
					classNum: 0
				},
				listsDatas: [],
				startIndex: 0,
				dataLength: 2
			};
		},
		created () {
			let _this = this;
			axios.get('/api/projectList').then(function(response) {
				response = response.data;
				if (response.errno === ERR_OK) {
					console.log(response);
					_this.listsDatas = response.data;
				}
			});
		},
		computed: {
			listData () {
				let listes = [];
				let i = 0;
				if (this.dataLength <= this.listsDatas.length) {
					for (i = this.startIndex; i < this.dataLength; i++) {
						listes.push(this.listsDatas[i]);
					};
				} else {
					for (i = this.startIndex; i < this.listsDatas.length; i++) {
						listes.push(this.listsDatas[i]);
					};
				}
				return listes;
			}
		},
		motheds: {
			_initScroll (event) {
        if (!this.listScroll) {
          this.listScroll = new BScroll(this.$refs.listsWrapper, {
            click: true,
            probeType: 3
          });
          this.indexScroll.on('scroll', function (pos) {
						// console.log(Math.abs(Math.round(pos.y)));
						// console.log(Math.round(pos.y));
	        });
        } else {
          this.listScroll.refresh();
        }
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
    			padding: 0 10px;
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
    				}
    				.list-tiem-bg {
    					margin: 0 auto 10px auto;
    					width: 100px;
    					height: 100px;
    					background-image: url(/static/images/list-icon.png);
    					background-repeat: no-repeat;
    					background-position: center;
    					background-size: 100px 100px;
    				}
    			}
    		}
    	}
    }
 	}
</style>
