<template>
	<Sign ref="signBox" :signFooter="signFooter" :signBottom="signBottom" :input="input">
		<div class="signIn-wrapper" slot="signContent">
			<div class="signIn">
				<div class="signIn-content" ref="signInContent">
					<div class="signIn-ct-item">
						<div class="signIn-input border-1px"><input ref="phoneNumber" class="input-text" type="tel" placeholder="请输入手机号码" @focus="show" data-layout="numeric" readonly="readonly"></div>
					</div>
					<div class="signIn-ct-item">
						<div class="signIn-input border-1px">
							<input v-if="passwordStutas" v-model="passwordVal" ref="passwordWrapper" class="input-text" type="text" placeholder="请输入登录密码(8~16位字符串)" @focus="show" data-layout="compact" readonly="readonly">
							<input v-if="!passwordStutas" v-model="passwordVal" ref="passwordWrapper" class="input-text" type="password" placeholder="请输入登录密码" @focus="show" data-layout="compact" readonly="readonly">
						</div>
						<div class="sh-password-btn" :class="{'sBtn': passwordStutas}" @click="shPassWord"></div>
					</div>
				</div>
				<div class="signIn-submit-btn" @click="submitSignIn">登录</div>
				<p class="forgetPassword" @click="forgetpb">忘记密码？</p>
			</div>
		</div>
		<vue-touch-keyboard slot="vue-keyboard" id="keyboard" ref="vueKeyboard" v-if="visible" :layout="layout" :cancel="hide" :accept="accept" :input="input" :next="next" :options="options"></vue-touch-keyboard>
	</Sign>
</template>

<script>
	import Vue from 'vue';
	import VueTouchKeyboard from 'components/keyboard';
	import Sign from 'components/sign/sign';

	Vue.use(VueTouchKeyboard);

	export default {
		data () {
			return {
				passwordStutas: false,
				passwordVal: '',
				signFooter: {
					descTxt: '还没有账号？立即注册',
					routerPath: 'signUp',
					show: true
				},
				visible: false,
				allLayouts: VueTouchKeyboard.layouts,
				layout: VueTouchKeyboard.layouts['compact'],
				// layout: 'mini',
				input: null,
				options: {
					useKbEvents: true
				},
				signBottom: 0
			};
		},
		methods: {
			forgetpb () {
				this.$router.push('/forgetpb');
			},
			shPassWord () {
				this.passwordVal = this.$refs.passwordWrapper.value;
				this.passwordStutas = !this.passwordStutas;
			},
			hide () {
				this.visible = false;
			},
			accept (text) {
				this.hide();
			},
			next () {
				this.passwordVal = this.$refs.passwordWrapper.value;
				let inputs = this.$refs.signInContent.querySelectorAll('input');
				let found = false;
				[].forEach.call(inputs, (item, i) => {
					if (!found && item === this.input && i < inputs.length - 1) {
						found = true;
						this.$nextTick(() => {
							inputs[i + 1].focus();
						});
					}
				});
				if (!found) {
					this.input.blur();
					this.hide();
					this.signBottom = 0;
				}
			},
			show (e) {
				this.input = e.target;
				this.layout = e.target.dataset.layout; // html5自定义data-前缀就被称为data属性(data-layout);
				if (!this.visible) {
					this.visible = true;
				}
				this.$nextTick(() => {
					this.signBottom = this.$refs.vueKeyboard.$el.scrollHeight;
					this.$refs.signBox.intoView();
				});
			},
			verify () {
				let _valPh = this.$refs.phoneNumber.value;
				if (_valPh !== '15256025969') {
					this.$store.commit('setErrorTxt', '用户名不存在，请重新输入！');
					this.$store.commit('setErrorStatus', true);
					return false;
				}

				let _valPw = this.$refs.passwordWrapper.value;
				this.passwordVal = this.$refs.passwordWrapper.value;
				if (_valPw !== '123456') {
					this.$store.commit('setErrorTxt', '用户名或密码错误，请重新输入！');
					this.$store.commit('setErrorStatus', true);
					return false;
				}

				this.$store.commit('setErrorStatus', false);
				this.$store.commit('setErrorTxt', '');
			},
			submitSignIn () {
				this.input.blur();
				this.hide();
				this.signBottom = 0;
				this.verify();
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.input = this.$refs.signInContent.querySelector('input');
			});
		},
		components: {
			Sign
		}
	};
</script>

<style lang="scss">
	@import '../../common/scss/mixin.scss';

	.signIn-wrapper {
		padding: 20px 0 75px 0;
		.signIn {
			padding: 0 25px;
			.signIn-content {
				.signIn-ct-item {
					position: relative;
					display: flex;
					margin-top: 10px;
					.signIn-input {
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
			.signIn-submit-btn {
				margin: 20px 20px 10px 20px;
				line-height: 40px;
				height: 40px;
				text-align: center;
				color: #fff;
				font-size: 15px;
				border-radius: 40px;
				background-color: #02358e;
			}
			.forgetPassword {
				font-size: 12px;
				text-align: center;
				color: #fff;
			}
		}
	}
</style>
