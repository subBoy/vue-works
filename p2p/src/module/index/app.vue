<template>
	<div>
		<Guide :update="update" @notGui="notGuide"></Guide>
		<div class="index">
			<Vhead></Vhead>
		</div>
	</div>
</template>

<script>
	import Guide from 'components/guide/guide';
	import Vhead from 'components/header/vhead';
	import {saveToLocal} from 'common/js/store';
	import {urlParse} from 'common/js/util';
  import axios from 'axios';

	const ERR_OK = 0;

	export default {
		data () {
			return {
				update: {
					id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
				}
			};
		},
		created () {
			let _this = this;
			axios.get('/api/update?id=' + _this.update.id).then(function (response) {
				response = response.data;
				if (response.errno === ERR_OK) {
					_this.update = Object.assign({}, _this.update, response.data);
				}
		  });
		},
		methods: {
			notGuide () {
				saveToLocal(this.update.id, 'updatehHind', false);
			}
		},
		components: {
			Guide,
			Vhead
		}
	};
</script>

<style>
</style>
