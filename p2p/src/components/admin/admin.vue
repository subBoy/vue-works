<template>
	<div class="container">
		<form method="post" action="/admin/project" class="form-wrapper">
			<div class="form-group">
				<span class="inputTitle">项目编号</span>
				<span class="input-wrapper"><input type="text" class="form-control"></span>
			</div>
			<div class="form-group">
				<span class="inputTitle">项目名称</span>
				<span class="input-wrapper"><input type="text" class="form-control"></span>
			</div>
			<div class="form-group">
				<span class="inputTitle">筹集金额</span>
				<span class="input-wrapper"><input type="text" class="form-control"></span>
				<span class="inputUnit">万元</span>
			</div>
			<div class="form-group">
				<span class="inputTitle">借款期限</span>
				<span class="input-wrapper"><input type="text" class="form-control"></span>
				<span class="inputUnit">个月</span>
			</div>
			<div class="form-group">
				<span class="inputTitle">年化收益率</span>
				<span class="input-wrapper"><input type="text" class="form-control"></span>
				<span class="inputUnit">%</span>
			</div>
			<div class="form-group">
				<span class="inputTitle">增加收益率</span>
				<span class="input-wrapper"><input type="tel" class="form-control"></span>
				<span class="inputUnit">%</span>
			</div>
			<div class="form-group">
				<span class="inputTitle">起售时间</span>
				<span class="input-wrapper"><input type="datetime" class="form-control"></span>
			</div>
		</form>
	</div>
</template>

<script>
	export default {

	};
</script>

<style>
	.container {

	}
</style>
