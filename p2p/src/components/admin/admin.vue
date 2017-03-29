<template>
	<div class="container">
		<form class="form-wrapper">
			<div class="form-group">
				<span class="flex-styl inputTitle">项目编号</span>
				<span class="flex-styl input-wrapper"><input type="text" class="form-control" @focus="clearErr" ref="itemNumberVal"></span>
				<span class="flex-styl inputUnit"></span>
			</div>
			<div class="form-group">
				<span class="flex-styl inputTitle">项目名称</span>
				<span class="flex-styl input-wrapper"><input type="text" class="form-control" @focus="clearErr" ref="itemNameVal"></span>
				<span class="flex-styl inputUnit"></span>
			</div>
			<div class="form-group">
				<span class="flex-styl inputTitle">筹集金额</span>
				<span class="flex-styl input-wrapper"><input type="text" class="form-control" @focus="clearErr" ref="raiseAmountVal"></span>
				<span class="flex-styl inputUnit">万元</span>
			</div>
			<div class="form-group">
				<span class="flex-styl inputTitle">借款期限</span>
				<span class="flex-styl input-wrapper"><input type="text" class="form-control" @focus="clearErr" ref="borrowingPeriodVal"></span>
				<span class="flex-styl inputUnit">个月</span>
			</div>
			<div class="form-group">
				<span class="flex-styl inputTitle">年化收益率</span>
				<span class="flex-styl input-wrapper"><input type="text" class="form-control" @focus="clearErr" ref="rateReturnVal"></span>
				<span class="flex-styl inputUnit">%</span>
			</div>
			<div class="form-group">
				<span class="flex-styl inputTitle">赠送收益率</span>
				<span class="flex-styl input-wrapper"><input type="tel" class="form-control" ref="giftReturnVal"></span>
				<span class="flex-styl inputUnit">%</span>
			</div>
			<div class="form-group">
				<span class="flex-styl inputTitle">起售时间</span>
				<span class="flex-styl input-wrapper"><input type="datetime-local" class="form-control" @focus="clearErr" ref="startTimeVal"></span>
				<span class="flex-styl inputUnit"></span>
			</div>
			<div class="form-group">
				<span class="flex-styl inputTitle"></span>
				<span class="flex-styl input-wrapper"><span class="form-submit" @click="submitData">确认提交</span></span>
				<span class="flex-styl inputUnit"></span>
			</div>
		</form>
	</div>
</template>

<script>
	import axios from 'axios';

	export default {
		data () {
			return {
				formData: {
					itemNumber: '',
					itemName: '',
					raiseAmount: 0,
					borrowingPeriod: 0,
					rateReturn: '0.00',
					giftReturn: '0.0',
					startTime: ''
				}
			};
		},
		methods: {
			clearErr () {
				this.$store.commit('setErrorStatus', false);
				this.$store.commit('setErrorTxt', '');
			},
			submitData () {
				let itemNumber = this.$refs.itemNumberVal.value;
				let itemName = this.$refs.itemNameVal.value;
				let raiseAmount = this.$refs.raiseAmountVal.value;
				let borrowingPeriod = this.$refs.borrowingPeriodVal.value;
				let rateReturn = this.$refs.rateReturnVal.value;
				let giftReturn = this.$refs.giftReturnVal.value;
				let startTime = this.$refs.startTimeVal.value;

				if (itemNumber === '') {
					this.$store.commit('setErrorTxt', '请填写项目编号！');
					this.$store.commit('setErrorStatus', true);
					return;
				}

				if (itemName === '') {
					this.$store.commit('setErrorTxt', '请填写项目名称！');
					this.$store.commit('setErrorStatus', true);
					return;
				}

				if (raiseAmount === '') {
					this.$store.commit('setErrorTxt', '请填写筹集金额！');
					this.$store.commit('setErrorStatus', true);
					return;
				}

				if (borrowingPeriod === '') {
					this.$store.commit('setErrorTxt', '请填写借款期限！');
					this.$store.commit('setErrorStatus', true);
					return;
				}

				if (rateReturn === '') {
					this.$store.commit('setErrorTxt', '请填写年化收益率！');
					this.$store.commit('setErrorStatus', true);
					return;
				}

				if (giftReturn === '') {
					giftReturn = 0;
				}

				if (startTime === '') {
					this.$store.commit('setErrorTxt', '请填写起售时间！');
					this.$store.commit('setErrorStatus', true);
					return;
				}

				this.clearErr();

				this.formData.itemNumber = itemNumber;
				this.formData.itemName = itemName;
				this.formData.raiseAmount = raiseAmount;
				this.formData.borrowingPeriod = borrowingPeriod;
				this.formData.rateReturn = rateReturn;
				this.formData.giftReturn = giftReturn;
				this.formData.startTime = startTime;

				axios.post('/increase/project', this.formData)
					.then(function (response) {
						console.log(response);
					})
					.catch(function (error) {
						console.log(error);
					});
			}
		}
	};
</script>

<style lang="scss">
	.container {
		padding: 10px;
		.form-group {
			display: flex;
			margin-bottom: 15px;
			.flex-styl {
				display: inline-block;
				&.inputTitle {
					flex: 0 0 65px;
					line-height: 30px;
					margin-right: 10px;
					width: 65px;
					color: #323232;
					font-size: 12px;
					text-align: right;
				}
				&.input-wrapper {
					flex: 1;
					.form-control {
						width: 95%;
						padding-left: 5%;
						height: 30px;
						line-height: 30px;
						font-size: 12px;
						border: 1px solid #f7f7f7;
						border-radius: 3px;
					}
					.form-submit {
						display: inline-block;
						width: 100%;
						height: 30px;
						line-height: 30px;
						font-size: 12px;
						border: 1px solid #f7f7f7;
						border-radius: 3px;
						text-align: center;
					}
				}
				&.inputUnit {
					flex: 0 0 30px;
					margin-left: 10px;
					line-height: 30px;
					font-size: 12px;
					color:#323232;
				}
			}
		}
	}
</style>
