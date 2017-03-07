<template>
	<div class="v-index-wrapper">
		<Guide :update="update" @notGui="notGuide"></Guide>
		<div class="index-wrapper">
			<loading v-if="loaded"></loading>
			<div class="index-box" ref="indexWrapper">
				<div>
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
	import Guide from 'components/guide/guide';
	import Vhead from 'components/header/vhead';
	import active from 'components/active/active';
	import Bg from 'components/bg/bg';
	import Latest from 'components/latestProject/Latest';
	import loading from 'components/loading/loading';
	import {saveToLocal} from 'common/js/store';
	import {urlParse} from 'common/js/util';
  import axios from 'axios';

	const ERR_OK = 0;

	export default {
		data () {
			return {
				update: {
					id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
				},
				loaded: true
			};
		},
		created () {
			let _this = this;
			axios.get('/api/update?id=' + _this.update.id).then(function (response) {
				response = response.data;
				if (response.errno === ERR_OK) {
					_this.update = Object.assign({}, _this.update, response.data);
				}
		  });
		},
		methods: {
			notGuide () {
				saveToLocal(this.update.id, 'updatehHind', false);
			},
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
			Guide,
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
    &.slideLeft-enter, &.slideLeft-leave-active {
    	z-index: 100;
    	transform: translate3d(-100%, 0, 0);
    }
	}
	.index-wrapper {
		position: absolute;
		top: 0;
		bottom: 65px;
		width: 100%;
    overflow: hidden;
    .index-box {
    	width: 100%;
    	height: 100%;
    }
	}
</style>
