<template>
	<div class="users-wrapper">
		<div class="users-content">
			<Vtitle :topTitle="titleData"></Vtitle>
		</div>
	</div>
</template>

<script>
	import Vtitle from 'components/title/title';

	export default {
		props: {
		},
		data () {
			return {
				titleData: {
					name: '我的账户',
					classN: 1
				}
			};
		},
		created () {
		},
		components: {
			Vtitle
		}
	};
</script>

<style lang="scss">
	.users-wrapper {
		position: absolute;
		top: 0;
		bottom: 47px;
		width: 100%;
		overflow: hidden;
		transition: all 0.5s;
		z-index: 98;
		background-color: #ef0;
		transform: translate3d(0, 0, 0);
    &.slideRight-enter {
    	z-index: 100;
    	transform: translate3d(100%, 0, 0);
    }
    .users-content {
    	padding-bottom: 18px;
    }
	}
</style>
