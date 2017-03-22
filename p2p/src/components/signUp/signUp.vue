<template>
	<Sign ref="signBox" :signFooter="signFooter" :signBottom="signBottom" :input="input">
		<div class="signUp-wrapper" slot="signContent">
			<div class="signUp">
				<div class="select-type">
					<ul class="select-list">
						<li class="select-item" :class="{'selected': selectType === 0}" @click="selectedTz">成为投资用户</li>
						<li class="select-item" :class="{'selected': selectType === 1}" @click="selectedJk">成为借款用户</li>
					</ul>
				</div>
				<div class="signUp-content" ref="signUpContent">
					<div class="signUp-ct-item">
						<div class="signUp-input border-1px"><input ref="phoneNumber" class="input-text" type="tel" placeholder="请输入手机号码" @focus="show" data-layout="numeric" readonly="readonly"></div>
					</div>
					<div class="signUp-ct-item">
						<div class="signUp-input border-1px">
							<input v-if="passwordStutas" v-model="passwordVal" ref="passwordWrapper" class="input-text" type="text" placeholder="请输入注册密码(8~16位字符串)" @focus="show" data-layout="compact" readonly="readonly">
							<input v-if="!passwordStutas" v-model="passwordVal" ref="passwordWrapper" class="input-text" type="password" placeholder="请输入注册密码(8~16位字符串)" @focus="show" data-layout="compact" readonly="readonly">
						</div>
						<div class="sh-password-btn" :class="{'sBtn': passwordStutas}" @click="shPassWord"></div>
					</div>
					<div class="signUp-ct-item">
						<div class="signUp-input border-1px"><input ref="codeNumber" class="input-text" type="tel" placeholder="请输入验证码" @focus="show" data-layout="numeric" readonly="readonly"></div>
						<div class="getCode-btn">获取验证码</div>
					</div>
					<div class="signUp-ct-item">
						<div class="signUp-input border-1px"><input class="input-text" type="text" placeholder="邀请人(选填)" @focus="show" data-layout="compact" readonly="readonly"></div>
					</div>
				</div>
				<div class="signUp-submit-btn" @click="submitSignUp">同意协议并注册</div>
				<p class="potocol"><span class="icon" :class="{'agree': agreeStatus}" @click="potocolStatus"></span>《有人贷网站服务协议》</p>
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
				selectType: 0,
				passwordStutas: false,
				passwordVal: '',
				agreeStatus: true,
				signFooter: {
					descTxt: '已有账号？立即登录',
					routerPath: 'signIn',
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
			selectedTz () {
				this.selectType = 0;
			},
			selectedJk () {
				this.selectType = 1;
			},
			shPassWord () {
				this.passwordVal = this.$refs.passwordWrapper.value;
				this.passwordStutas = !this.passwordStutas;
			},
			potocolStatus () {
				this.agreeStatus = !this.agreeStatus;
			},
			hide () {
				this.visible = false;
			},
			accept (text) {
				this.hide();
			},
			next () {
				this.passwordVal = this.$refs.passwordWrapper.value;
				let inputs = this.$refs.signUpContent.querySelectorAll('input');
				let found = false;
				[].forEach.call(inputs, (item, i) => {
					if (!found && item === this.input && i < inputs.length - 1) {
						found = true;
						this.$nextTick(() => {
							if (i === 0) {
								if (!this.verify_phone()) {
									inputs[i].focus();
									return false;
								}
							} else if (i === 1) {
								if (!this.verify_password()) {
									inputs[i].focus();
									return false;
								}
							} else if (i === 2) {
								if (!this.verify_code()) {
									inputs[i].focus();
									return false;
								}
							} else if (i === 3) {
								if (!this.verify_password()) {
									inputs[i].focus();
									return false;
								}
							}
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
			verify_phone () {
				let _val = this.$refs.phoneNumber.value;
				if (!_val && _val === '') {
					this.$store.commit('setErrorTxt', '手机号码不能为空，请输入手机号码！');
					this.$store.commit('setErrorStatus', true);
					return false;
				}

				if (!(/^1[3|4|5|8][0-9]\d{8,8}$/.test(_val))) {
					this.$store.commit('setErrorTxt', '手机号码不存在，请重新输入！');
					this.$store.commit('setErrorStatus', true);
					return false;
				}

				this.$store.commit('setErrorStatus', false);
				this.$store.commit('setErrorTxt', '');

				return true;
			},
			verify_password () {
				let _val = this.$refs.passwordWrapper.value;
				this.passwordVal = this.$refs.passwordWrapper.value;
				if (_val === '') {
					this.$store.commit('setErrorTxt', '注册密码不能为空，请输入注册密码！');
					this.$store.commit('setErrorStatus', true);
					return false;
				}

				if (!(/^(\w){8,16}$/.test(_val))) {
					this.$store.commit('setErrorTxt', '注册密码只能是8-16位且不能含有特殊字符，请重新输入！');
					this.$store.commit('setErrorStatus', true);
					return false;
				}

				this.$store.commit('setErrorStatus', false);
				this.$store.commit('setErrorTxt', '');

				return true;
			},
			verify_code () {
				let _val = this.$refs.codeNumber.value;
				if (!_val && _val === '') {
					this.$store.commit('setErrorTxt', '手机验证码不能为空，手机验证码！');
					this.$store.commit('setErrorStatus', true);
					return false;
				}
				if (_val !== '123456') {
					this.$store.commit('setErrorTxt', '手机验证码错误，请重新输入！');
					this.$store.commit('setErrorStatus', true);
					return false;
				}

				this.$store.commit('setErrorStatus', false);
				this.$store.commit('setErrorTxt', '');

				return true;
			},
			verify_http () {
				if (!this.agreeStatus) {
					this.$store.commit('setErrorTxt', '请先阅读有人贷网站服务协议,并勾选！');
					this.$store.commit('setErrorStatus', true);
					return false;
				}

				this.$store.commit('setErrorStatus', false);
				this.$store.commit('setErrorTxt', '');

				return true;
			},
			submitSignUp () {
				this.input.blur();
				this.hide();
				this.signBottom = 0;
				this.passwordVal = this.$refs.passwordWrapper.value;
				if (!this.verify_phone()) {
					return false;
				}

				if (!this.verify_password()) {
					return false;
				}

				if (!this.verify_code()) {
					return false;
				}

				if (!this.verify_http()) {
					return false;
				}

				this.$router.push('/realname');
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.input = this.$refs.signUpContent.querySelector('input');
			});
		},
		components: {
			Sign
		}
	};
</script>

<style lang="scss">
	@import '../../common/scss/mixin.scss';

	.signUp-wrapper {
		padding: 20px 0 75px 0;
		.signUp {
			padding: 0 25px;
			.select-type {
				padding: 0 10px;
				.select-list {
					display: flex;
					.select-item {
						flex: 1;
						margin: 0 10px;
						text-align: center;
						border: 1px solid #c0dbf1;
						color: #fff;
						height: 27px;
						line-height: 27px;
						border-radius: 27px;
						font-size: 10px;
						transition: all 0.3s;
						&.selected {
							background-color: #c0dbf1;
							color: #02358e;
						}
					}
				}
			}
			.signUp-content {
				.signUp-ct-item {
					position: relative;
					display: flex;
					margin-top: 10px;
					.signUp-input {
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
					.getCode-btn {
						flex: 0 0 100px;
						line-height: 38px;
						margin-left: 10px;
						width: 100px;
						height: 38px;
						font-size: 12px;
						border-radius: 38px;
						text-align: center;
						color: #fff;
						background-color: #02358e;
					}
				}
			}
			.signUp-submit-btn {
				margin: 20px 20px 10px 20px;
				line-height: 40px;
				height: 40px;
				text-align: center;
				color: #fff;
				font-size: 15px;
				border-radius: 40px;
				background-color: #02358e;
			}
			.potocol {
				line-height: 12px;
				text-align: center;
				color: #fff;
				font-size: 12px;
				.icon {
					display: inline-block;
					vertical-align: top;
					width: 12px;
					height: 12px;
					border-radius: 2px;
					border: 1px solid #fff;
					&.agree {
						background-image: url(/static/images/true.png);
						background-position: center;
						background-repeat: no-repeat;
						background-size: 6px 5px;
					}
				}
			}
		}
	}
</style>
