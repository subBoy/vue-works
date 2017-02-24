<template>
	<div>
		<Guide :update="update" v-if="update"></Guide>
		<div class="index">
			<Vhead></Vhead>
		</div>
	</div>
</template>

<script>
	import Guide from 'components/guide/guide';
	import Vhead from 'components/header/vhead';
	// import axios from 'axios';

	// const ERR_OK = 0;

	export default {
		data () {
			return {
				update: false
			};
		},
		created () {
		},
		components: {
			Guide,
			Vhead
		}
	};
</script>

<style>
</style>
