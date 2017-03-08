<template>
	<div class="v-index-wrapper">
		<div class="index-wrapper">
			<loading v-if="loaded"></loading>
			<div class="index-box" ref="indexWrapper">
				<div class="index-content">
					<Vhead @load="loading" @scrollId="idScroll"></Vhead>
					<active @scrollId="idScroll" :activeData="activeData"></active>
					<Bg @scrollId="idScroll"></Bg>
					<Latest></Latest>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  import BScroll from 'better-scroll';
	import Vhead from 'components/header/vhead';
	import active from 'components/active/active';
	import Bg from 'components/bg/bg';
	import Latest from 'components/latestProject/Latest';
	import loading from 'components/loading/loading';
	import axios from 'axios';

	const ERR_OK = 0;

	export default {
		data () {
			return {
				loaded: true,
				activeData: []
			};
		},
		created () {
			let _this = this;
			axios.get('/api/active').then(function (response) {
				response = response.data;
				if (response.errno === ERR_OK) {
					_this.activeData = response.data;
				}
			});
		},
		methods: {
			loading () {
				this.loaded = !this.loaded;
			},
			idScroll () {
				this.$nextTick(() => {
					this._initScroll();
				});
			},
			_initScroll (event) {
        if (!this.indexScroll) {
          this.indexScroll = new BScroll(this.$refs.indexWrapper, {
            click: true
          });
        } else {
          this.indexScroll.refresh();
        }
      }
		},
		components: {
			Vhead,
			active,
			Bg,
			Latest,
			loading
		}
	};
</script>


<style lang="scss">
	.v-index-wrapper {
		position: relative;
		width: 100%;
		height: 100%;
		transition: all 0.5s;
    z-index: 98;
    transform: translate3d(0, 0, 0);
    background-color: #fff;
    &.slideRight-enter {
    	z-index: 100;
    	transform: translate3d(-100%, 0, 0);
    }
	}
	.index-wrapper {
		position: absolute;
		top: 0;
		bottom: 47px;
		width: 100%;
    overflow: hidden;
    .index-box {
    	width: 100%;
    	height: 100%;
    	.index-content {
    		padding-bottom: 18px;
    	}
    }
	}
</style>
