<template>
	<div class="v-app">
		<Error></Error>
		<Guide :update="update" @notGui="notGuide"></Guide>
		<transition :name="transitionName">
			<keep-alive>
				<router-view :projectDatas="projectDatas"></router-view>
			</keep-alive>
		</transition>
		<keep-alive>
			<Vfoot></Vfoot>
		</keep-alive>
		<SubScribe ref="SubScribe"></SubScribe>
		<Confirm></Confirm>
	</div>
</template>

<script>
	import Guide from 'components/guide/guide';
	import Vindex from 'components/index/index';
	import Vfoot from 'components/footer/footer';
	import SubScribe from 'components/subScribe/subScribe';
	import Confirm from 'components/confirm/confirm';
	import Error from 'components/error/error';
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
				transitionName: '',
				subScribeStatus: false,
				projectDatas: []
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
			axios.get('/api/latestProject').then(function (response) {
				response = response.data;
				if (response.errno === ERR_OK) {
					_this.projectDatas = response.data;
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
				this.$store.commit('setErrorStatus', false);
				this.$store.commit('setErrorTxt', '');
				this.transitionName = 'slideRight';
			}
		},
		components: {
			Guide,
			Vindex,
			Vfoot,
			SubScribe,
			Confirm,
			Error
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
