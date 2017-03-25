<template>
	<transition name="slide">
		<div class="error-wrapper" v-show="errorStatus">
			{{errorTxt}}
			<div class="error-close-btn" @click="setStatus"></div>
		</div>
	</transition>
</template>
<script>
	export default {
		methods: {
			setStatus () {
				this.$store.commit('setErrorStatus', false);
				this.$store.commit('setErrorTxt', '');
			}
		},
		computed: {
			errorStatus () {
				return this.$store.state.errorStatus;
			},
			errorTxt () {
				return this.$store.state.errorTxt;
			}
		}
	};
</script>

<style lang="scss">
	.error-wrapper {
		position: fixed;
		left: 0;
		right: 0;
		padding: 20px 20px 10px 12px;
		line-height: 16px;
		z-index: 20000;
		background-color: #fb3e4e;
		color: #fff;
		font-size: 14px;
		transition: all 0.3s;
		transform: translate3d(0, 0, 0);
		&.slide-enter, &.slide-leave-active {
			transform: translate3d(0, -100%, 0);
		}
		.error-close-btn {
			position: absolute;
			right: 0;
			top: 0;
			height: 20px;
			width: 30px;
			background: url(/static/images/err-close-btn.png) center center no-repeat;
			background-size: 10px 10px;
		}
	}
</style>
