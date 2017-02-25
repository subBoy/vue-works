<template>
	<div>
		<!-- v-if="update.updatehHind" -->
		<Guide :update="update" @notGui="notGuide"></Guide>
		<div class="index">
			<Vhead></Vhead>
		</div>
	</div>
</template>

<script>
	import Guide from 'components/guide/guide';
	import Vhead from 'components/header/vhead';
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
			axios.get('/api/update?id=' + this.update.id)
				.then(function (response) {
					if (response.data.errno === ERR_OK) {
						this.update = Object.assign({}, this.update, response.data.data);
					}
			  })
			  .catch(function (response) {
			  });
		},
		methods: {
			notGuide () {
				// this.update = false;
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
