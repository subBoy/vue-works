<template>
	<div class="title-wrapper bg-0">
		<span class="history-btn"></span>{{topTitle.name}}
	</div>
</template>

<script>
	export default {
		props: {
			topTitle: {
				type: Object
			}
		}
	};
</script>

<style lang="scss">
	.title-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 46px;
		line-height: 46px;
		font-size: 16px;
		color: #fff;
		text-align: center;
		&.bg-0 {
			background: linear-gradient(to right,  #3dc7ff 0%, #1a78fc 100%);
		}
		.history-btn {
			display: block;
			width: 36px;
			height: 46px;
			position: absolute;
			left: 0;
			top: 0;
			background-image: url(/static/images/goBack.png);
			background-repeat: no-repeat;
			background-size: 16px;
			background-position: center;
		}
	}
</style>
