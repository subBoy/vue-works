<template>
	<Sign ref="signBox" :signFooter="signFooter" :signBottom="signBottom" :input="input">
		<div class="real-wrapper" slot="signContent">
			<div class="real">
				<div class="real-desc">为了更好体验有人贷为您提供的服务，请完成以下内容的填写！</div>
				<div class="real-content" ref="realContent">
					<div class="real-ct-item">
						<div class="real-input border-1px"><input ref="actualName" @focus="focusFuc" class="input-text" type="text" placeholder="请输入真实姓名"></div>
					</div>
					<div class="real-ct-item">
						<div class="real-input border-1px">
							<input ref="IDC" @focus="focusFuc" class="input-text" type="tel" placeholder="请输入身份证号">
						</div>
					</div>
				</div>
				<div class="real-submit-btn" @click="submitreal">开通存管通</div>
			</div>
		</div>
	</Sign>
</template>

<script>
	import Sign from 'components/sign/sign';

	export default {
		data () {
			return {
				signFooter: {
					descTxt: '',
					routerPath: '',
					show: false
				},
				input: null,
				signBottom: 0
			};
		},
		methods: {
			verify () {
				let _valPh = this.$refs.actualName.value;
				let _valPw = this.$refs.IDC.value;
				if (_valPh !== '张嚣' || _valPw !== '340826199211104077') {
					this.$store.commit('setErrorTxt', '真实姓名与身份证号不符！');
					this.$store.commit('setErrorStatus', true);
					return false;
				}

				this.$store.commit('setErrorStatus', false);
				this.$store.commit('setErrorTxt', '');
			},
			focusFuc (e) {
				this.input = e.target;
				this.signBottom = 0;
			},
			submitreal () {
				this.input.blur();
				this.signBottom = 0;
				this.verify();
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.input = this.$refs.realContent.querySelector('input');
			});
		},
		components: {
			Sign
		}
	};
</script>

<style lang="scss">
	@import '../../common/scss/mixin.scss';

	.real-wrapper {
		padding: 20px 0 75px 0;
		.real {
			padding: 0 25px;
			.real-desc {
				line-height: 12px;
				font-size: 10px;
				color: #fff;
			}
			.real-content {
				.real-ct-item {
					position: relative;
					display: flex;
					margin-top: 10px;
					.real-input {
						flex: 1;
						&:after {
							bottom: 0;
							@include border-1px($color: #ffffff);
						}
						.input-text {
							width: 100%;
							height: 38px;
							line-height: 38px;
							font-size: 12px;
							color: #fff;
							&:-moz-placeholder {
							  color: #fff;
							}
							&::-moz-placeholder {
							  color: #fff;
							}
							&:-ms-input-placeholder{
							  color: #fff;
							}
							&::-webkit-input-placeholder {
							  color: #fff;
							}
							&:focus {
								border-color: #66afe9;
								outline: 0;
								box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
							}
						}
					}
					.sh-password-btn {
						position: absolute;
						right: 0;
						bottom: 0;
						width: 38px;
						height: 38px;
						background-image: url(/static/images/hpassword.png);
						background-position: center;
						background-size: 16px 6px;
						background-repeat: no-repeat;
						z-index: 10;
						&.sBtn {
							background-image: url(/static/images/spassword.png);
							background-size: 15px 8px;
						}
					}
				}
			}
			.real-submit-btn {
				margin: 20px 20px 10px 20px;
				line-height: 40px;
				height: 40px;
				text-align: center;
				color: #fff;
				font-size: 15px;
				border-radius: 40px;
				background-color: #02358e;
			}
		}
	}
</style>
