<template>
	<transition name="fade">
		<div class="_confirm_bg" v-show="confirmContent.Status">
			<div class="_confirm_content">
				<div class="_confirm_text">{{confirmContent.Title}}</div>
				<div class="_confirm_btnW border-1px">
					<div v-if="confirmContent.cancelText" class="_confirm_btnA confirm_btn border-1px-lr" @click="cancelFuc">{{confirmContent.cancelText}}</div>
					<div v-if="confirmContent.okText" class="_confirm_btnB confirm_btn" @click="okFuc">{{confirmContent.okText}}</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>

	export default {
		methods: {
			cancelFuc () {
				let cancelVal = this.confirmContent.cancelOperate;
				if (cancelVal !== 0) {
					this.$router.push(cancelVal);
				}
				this.$store.commit('setConfirmFalse');
			},
			okFuc () {
				let okVal = this.confirmContent.okOperate;
				if (okVal !== 0) {
					this.$router.push(okVal);
				}
				this.$store.commit('setConfirmFalse');
			}
		},
		computed: {
			confirmContent () {
				return this.$store.state.confirmContent;
			}
		}
	};
</script>

<style lang="scss">
	@import '../../common/scss/mixin.scss';

	._confirm_bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 20000;
		opacity: 1;
		background-color: rgba(0, 0, 0, 0.5);
		transition: all 0.5s;
		&.fade-enter, &.fade-leave-active {
			opacity: 0;
		}
		._confirm_content {
			position: relative;
			top: 50%;
			transform: translate3d(0, -50% , 0);
			margin: 0 auto;
			width: 60%;
			border-radius: 4px;
			background-color: #fff;
			box-shadow: 0px 0px 4px 0px #000;
			._confirm_text {
				padding: 10px;
				line-height: 16px;
				color: #323232;
				text-align: center;
				font-size: 12px;
			}
			._confirm_btnW {
				display: flex;
				margin-top: 5px;
				&:after {
					top: 0;
					@include border-1px($color: #ececec);
				}
				.confirm_btn {
					flex: 1;
					line-height: 32px;
					text-align: center;
					font-size: 13px;
					color: #1267FC;
					&._confirm_btnA {
						color: #969696;
						&:after {
							right: 0;
							@include border-1px-lr($color: #ececec);
						}
					}
				}
			}
		}
	}
</style>
