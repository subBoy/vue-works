<template>
	<div class="v-index-wrapper">
		<div class="index-wrapper">
			<loading v-if="loaded"></loading>
			<div class="index-box" ref="indexWrapper">
				<div class="index-content">
					<Vhead @load="loading" @scrollId="idScroll"></Vhead>
					<active @scrollId="idScroll"></active>
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

	export default {
		data () {
			return {
				loaded: true
			};
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
            click: true,
            probeType: 3
          });
	        this.indexScroll.on('scroll', function (pos) {
						// console.log(Math.abs(Math.round(pos.y)));
						// console.log(Math.round(pos.y));
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
    &.slideLeft-enter {
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
