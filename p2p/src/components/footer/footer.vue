<template>
	<div class="footer-wrapper">
		<ul class="footer-nav">
			<li class="footer-item">
				<router-link class="ft-common idx-icon" to="/">首页</router-link>
			</li>
			<li class="footer-item">
				<router-link class="ft-list-hook" to="/module/index"><img src="/static/images/list-ic_01.png" width="45" height="65" alt=""></router-link>
			</li>
			<li class="footer-item">
				<router-link class="ft-common user-ic" to="/module/user">我的</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
	};
</script>
<style lang="scss">
	.footer-wrapper {
		position: fixed;
		width: 100%;
		height: 46px;
		left: 0;
		bottom: 0;
		border-top: 1px solid #ececec;
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
					&.idx-icon {
						background-image: url(/static/images/idx-icon.png);
						background-size: 19px auto;
					}
					&.user-ic {
						background-image: url(/static/images/user-ic.png);
						background-size: 16px auto;
					}
				}
				.ft-list-hook {
					display: inline-block;
					position: absolute;
					bottom: 0;
					left: 50%;
					margin-left: -22.5px;
				}
			}
		}
	}
</style>
