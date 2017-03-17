<template>
	<div class="title-wrapper" :class="className">
		<span class="history-btn" @click="goHistory()"></span>{{topTitle.name}}
		<slot name="detailLink"></slot>
	</div>
</template>

<script>
	export default {
		props: {
			topTitle: {
				type: Object
			},
			setOnck: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			goHistory () {
				if (this.setOnck) {
					this.$emit('setSubFalse');
				} else {
					this.$router.go(-1);
				}
			}
		},
		computed: {
			className () {
				return 'bg-' + this.topTitle.classNum;
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
		z-index: 10;
		&.bg-0 {
			background: linear-gradient(to right,  #3dc7ff 0%, #1a78fc 100%);
		}
		.history-btn {
			display: block;
			position: absolute;
			left: 0;
			top: 0;
			width: 36px;
			height: 46px;
			background-image: url(/static/images/goBack.png);
			background-repeat: no-repeat;
			background-size: 16px;
			background-position: center;
		}
		.detail-link {
			display: block;
			position: absolute;
			right: 0;
			top: 0;
			line-height: 46px;
			width: 38px;
			height: 46px;
			text-align: center;
			font-size: 9px;
		}
	}
</style>
