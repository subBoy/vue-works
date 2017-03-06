<template>
	<div class="strength-bg-wrapper" ref="appA">
		<ul class="strength-bg-list">
			<li class="strength-bg-item" v-for="item in strength">
				<a :href="item.link" class="link"><img :src="item.icon" class="map" width="44"></a>
				<p class="text">{{item.desc}}</p>
			</li>
		</ul>
	</div>
</template>

<script>
	import axios from 'axios';

	const ERR_OK = 0;

	export default {
		data () {
			return {
				strength: {
					type: Object
				}
			};
		},
		created () {
			let _this = this;
			axios.get('/api/strength').then(function (response) {
				response = response.data;
				if (response.errno === ERR_OK) {
					_this.strength = response.data;
					_this.$nextTick(function () {
						_this.$emit('scrollId');
						_this.loadImage(_this.strength[0].icon, _this.call);
					});
				}
			});
		},
		methods: {
			loadImage (url, callback) {
		    let img = new Image();
		    img.onload = function () {
	        img.onload = null;
	        callback();
		    };
		    img.src = url;
			},
			call () {
				this.$emit('scrollId');
			}
		}
	};
</script>

<style lang="scss">
	.strength-bg-wrapper {
		padding: 10px 0;
		background-color: #fafafa;
		.strength-bg-list {
			display: flex;
			.strength-bg-item {
				flex: 1;
				text-align: center;
				.link {
					display: inline-block;
					margin: 0 auto;
				}
				.text {
					margin-top: 5px;
					line-height: 12px;
					font-size: 11px;
					color: #464646;
				}
			}
		}
	}
</style>
