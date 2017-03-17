<template>
	<transition name="fade">
		<div class="_confirm_bg">
			<div class="_confirm_content">
				<div class="_confirm_text">{{title}}</div>
				<div class="_confirm_btnW">
					<div class="_confirm_btnA confirm_btn">{{cancelText}}</div>
					<div class="_confirm_btnB confirm_btn">{{okText}}</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	export default {

	};
</script>

<style lang="scss">
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
	}
</style>
