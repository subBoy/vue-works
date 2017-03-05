<template>
	<div class="details-wrapper"></div>
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
	.details-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transition: all 0.5s;
		transform: translate3d(100%, 0 , 0);
		background-color: #000;
		z-index: 999;
	}
</style>
