<template>
	<div class="lists-wrapper">
		<div class="lists-content">
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
					name: '理财产品',
					classN: 0
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
	.lists-wrapper {
		position: absolute;
		top: 0;
		bottom: 47px;
		width: 100%;
		overflow: hidden;
		transition: all 0.5s;
		z-index: 98;
		background-color: #000;
		transform: translate3d(0, 0, 0);
    &.slideRight-enter {
    	z-index: 100;
    	transform: translate3d(100%, 0, 0);
    }
    .lists-content {
    	padding-bottom: 18px;
    }
 	}
</style>
