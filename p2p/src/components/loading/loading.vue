<template>
	<div class="loading-wrapper"></div>
</template>

<script>
	export default {};
</script>

<style lang="scss">
	.loading-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 99;
		background: #fff url(/static/images/loading.gif) center center no-repeat;
		background-size: 150px 150px;
	}
</style>
