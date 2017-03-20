<template>
	<div class="sign-wrapper">
		<Vtitle :topTitle="titleData"></Vtitle>
		<div class="sign-logo"></div>
		<slot name="signContent"></slot>
		<div class="sign-footer"><div class="txt-desc">已有账号？立即登录</div></div>
	</div>
</template>

<script>
	import Vtitle from 'components/title/title';

	export default {
		data () {
			return {
				titleData: {
					name: '',
					classNum: 1
				}
			};
		},
		components: {
			Vtitle
		}
	};
</script>

<style lang="scss">
	.sign-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		min-height: 560px;
		overflow: hidden;
		z-index: 10000;
		background-image: url(/static/images/login-bg.jpg);
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center;
		transition: all 0.3s;
		transform: translate3d(0, 0, 0);
		&.slideRight-enter, &.slideRight-leace-active {
			transform: translate3d(100%, 0, 0);
		}
		.sign-logo {
			margin-top: 46px;
			width: 100%;
			height: 120px;
			background-image: url(/static/images/sign-logo.png);
			background-repeat: no-repeat;
			background-position: bottom center;
			background-size: 85px 68px;
		}
		.sign-footer {
			position: fixed;
			left: 0;
			bottom: 15px;
			width: 100%;
			.txt-desc {
				line-height: 30px;
				margin: 0 45px;
				height: 30px;
				border: 1px solid #fff;
				border-radius: 30px;
				color: #fff;
				text-align: center;
				font-size: 11px;
			}
		}
	}
</style>
