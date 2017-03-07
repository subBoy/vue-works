<template>
	<div class="v-app">
		<transition :name="transitionName">
			<router-view></router-view>
		</transition>
		<Vfoot></Vfoot>
	</div>
</template>

<script>
	import Vindex from 'components/index/index';
	import Vfoot from 'components/footer/footer';
	export default {
		data () {
			return {
				transitionName: ''
			};
		},
		watch: {
			'$route' (to, from) {
				const toDepth = to.path + '';
				const fromDepth = from.path + '';
				if (toDepth === '/index') {
					this.transitionName = 'slideLeft';
					return;
				}
				if (fromDepth === '/index' && toDepth === '/list') {
					this.transitionName = 'slideRight';
					return;
				}
				if (fromDepth === '/user' && toDepth === '/list') {
					this.transitionName = 'slideLeft';
					return;
				}
				this.transitionName = 'slideLeft';
			}
		},
		components: {
			Vindex,
			Vfoot
		}
	};
</script>


<style lang="scss">
	.v-app {
		height: 100%;
	}
	// .slideLeft-enter {
	// 	transform: translate3d(-100%, 0 , 0);
	// 	background-color: #000;
	// }
	// .slideLeft-enter-active {
	// 	transform: translate3d(0, 0 , 0);
	// 	background-color: #000;
	// }
	// .slideRight-enter {
	// 	transform: translate3d(100%, 0 , 0);
	// 	background-color: #000;
	// }
	// .slideRight-enter-active {
	// 	transform: translate3d(0, 0 , 0);
	// 	background-color: #000;
	// }
</style>
