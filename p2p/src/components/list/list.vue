<template>
	<div class="lists-wrapper"></div>
</template>

<script>
	export default {
		props: {
			projectId: {
				type: String
			}
		},
		created () {
			this.$nextTick(() => {
				console.log(this.projectId);
			});
		}
	};
</script>

<style lang="scss">
	.lists-wrapper {
		position: absolute;
		top: 0;
		bottom: 65px;
		width: 100%;
		overflow: hidden;
		transition: all 0.5s;
		z-index: 98;
		background-color: #000;
		transform: translate3d(0, 0, 0);
    &.slideRight-enter, &.slideLeft-leave-active {
    	z-index: 100;
    	transform: translate3d(100%, 0, 0);
    }
    // &.slideLeft-enter, &.slideLeft-leave-active {
    // 	z-index: 100;
    // 	transform: translate3d(-100%, 0, 0);
    // }
 	}
</style>
