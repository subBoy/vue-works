<template>
	<div class="footer-wrapper border-1px">
		<ul class="footer-nav">
			<li class="footer-item">
				<router-link class="ft-common idx-icon" to="/index">首页</router-link>
			</li>
			<li class="footer-item">
				<router-link class="ft-list-hook" to="/list"><img src="/static/images/list-ic_01.png" width="45" height="65" alt=""></router-link>
			</li>
			<li class="footer-item">
				<router-link class="ft-common user-ic" to="/user">我的</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
	};
</script>
<style lang="scss">
	@import '../../common/scss/mixin.scss';

	.footer-wrapper {
		position: fixed!important;
		width: 100%;
		height: 46px;
		left: 0;
		bottom: 0;
		background-color: #fafafa;
		z-index: 9999;
		&:after {
			top: 0;
			@include border-1px($color: #ececec);
		}
		.footer-nav {
			display: flex;
			.footer-item {
				position: relative;
				height: 46px;
				flex: 1;
				text-align: center;
				.ft-common {
					display: inline-block;
					margin: 10px auto 0 auto;
					padding-top: 22px;
					width: 45px;
					background-repeat: no-repeat;
					background-position: top center;
					line-height: 12px;
					font-size: 10px;
					color: #464646;
					&.active {
						color: #1267FC;
					}
					&.idx-icon {
						background-image: url(/static/images/idx-icon.png);
						background-size: 19px auto;
						&.active {
							background-image: url(/static/images/idx-icon-1.png);
						}
					}
					&.user-ic {
						background-image: url(/static/images/user-ic.png);
						background-size: 16px auto;
						&.active {
							background-image: url(/static/images/user-ic-1.png);
						}
					}
				}
				.ft-list-hook {
					display: inline-block;
					position: absolute;
					bottom: 0;
					left: 50%;
					margin-left: -22.5px;
					z-index: 999;
				}
			}
		}
	}
</style>
