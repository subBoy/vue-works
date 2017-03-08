<template>
	<div class="v-app">
		<Guide :update="update" @notGui="notGuide"></Guide>
		<transition :name="transitionName">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</transition>
		<keep-alive>
			<Vfoot></Vfoot>
		</keep-alive>
	</div>
</template>

<script>
	import Guide from 'components/guide/guide';
	import Vindex from 'components/index/index';
	import Vfoot from 'components/footer/footer';
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
				transitionName: ''
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
			}
		},
		watch: {
			'$route' (to, from) {
				// const toDepth = to.path + '';
				// if (toDepth === '/index') {
				// 	this.transitionName = 'slideLeft';
				// 	return;
				// }
				this.transitionName = 'slideRight';
			}
		},
		components: {
			Guide,
			Vindex,
			Vfoot
		}
	};
</script>


<style lang="scss">
	.v-app {
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
</style>
