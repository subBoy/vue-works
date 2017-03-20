<template>
	<Sign>
		<div class="signOn-wrapper" slot="signContent">
			<div class="signOn">
				<div class="select-type">
					<ul class="select-list">
						<li class="select-item" :class="{'selected': selectType === 0}" @click="selectedTz">成为投资用户</li>
						<li class="select-item" :class="{'selected': selectType === 1}" @click="selectedJk">成为借款用户</li>
					</ul>
				</div>
				<div class="signOn-content">
					<div class="signOn-ct-item">
						<div class="signOn-input border-1px"><input class="input-text" type="tel" placeholder="请输入手机号码"></div>
					</div>
					<div class="signOn-ct-item">
						<div class="signOn-input border-1px">
							<input v-if="passwordStutas" v-model="passwordVal" class="input-text" type="text" placeholder="请输入登录密码(8~16位字符串)">
							<input v-if="!passwordStutas" v-model="passwordVal" class="input-text" type="password" placeholder="请输入登录密码(8~16位字符串)">
						</div>
						<div class="sh-password-btn" :class="{'sBtn': passwordStutas}" @click="shPassWord"></div>
					</div>
					<div class="signOn-ct-item">
						<div class="signOn-input border-1px"><input class="input-text" type="tel" placeholder="请输入验证码"></div>
						<div class="getCode-btn">获取验证码</div>
					</div>
					<div class="signOn-ct-item">
						<div class="signOn-input border-1px"><input class="input-text" type="text" placeholder="邀请人(选填)"></div>
					</div>
				</div>
				<div class="signOn-submit-btn">同意协议并注册</div>
				<p class="potocol"><span class="icon" :class="{'agree': agreeStatus}" @click="potocolStatus"></span>《有人贷网站服务协议》</p>
			</div>
		</div>
	</Sign>
</template>

<script>
	import Sign from 'components/sign/sign';
	export default {
		data () {
			return {
				selectType: 0,
				passwordStutas: false,
				passwordVal: '',
				agreeStatus: true
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
				this.passwordStutas = !this.passwordStutas;
			},
			potocolStatus () {
				this.agreeStatus = !this.agreeStatus;
			}
		},
		components: {
			Sign
		}
	};
</script>

<style lang="scss">
	@import '../../common/scss/mixin.scss';

	.signOn-wrapper {
		padding-top: 20px;
		.signOn {
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
			.signOn-content {
				.signOn-ct-item {
					position: relative;
					display: flex;
					margin-top: 10px;
					.signOn-input {
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
						&.sBtn {
							background-image: url(/static/images/spassword.png);
							background-size: 15px 8px;
						}
					}
					.getCode-btn {
						flex: 0 0 80px;
						line-height: 38px;
						margin-left: 10px;
						width: 80px;
						height: 38px;
						font-size: 12px;
						border-radius: 38px;
						text-align: center;
						color: #fff;
						background-color: #02358e;
					}
				}
			}
			.signOn-submit-btn {
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
