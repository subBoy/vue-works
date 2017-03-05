export function toCanvas (id, progress, circleStartAngle, circleEndAngle, circleAngle, rcircleR, linewidth) {
	// canvas进度条
	// circleStartAngle 全部计划的起始角度
	// circleEndAngle 全部计划的结束角度
	// circleStartAngle 全部计划的总弧度
  let canvas = document.getElementById(id);
  let ctx = canvas.getContext('2d');
  let percent = progress;  // 最终百分比
  let circleX = canvas.width / 2; // 中心x坐标
  let circleY = canvas.height / 2; // 中心y坐标
  let radius = rcircleR; // 圆环半径
  let lineWidth = linewidth;  // 圆形线条的宽度
  let fontSize = 0; // 字体大小
  // 两端圆点
  // function smallcircle1 (cx, cy, r) {
		// ctx.beginPath();
		// // ctx.moveTo(cx + r, cy);
		// ctx.lineWidth = 1;
		// ctx.fillStyle = '#06a8f3';
		// ctx.arc(cx, cy, r, 0, Math.PI * 2);
		// ctx.fill();
  // }
	// function smallcircle2 (cx, cy, r) {
	// 	ctx.beginPath();
	// 	// ctx.moveTo(cx + r, cy);
	// 	ctx.lineWidth = 1;
	// 	ctx.fillStyle = '#00f8bb';
	// 	ctx.arc(cx, cy, r, 0, Math.PI * 2);
	// 	ctx.fill();
	// }

	// 画圆
	function circle (cx, cy, r) {
		ctx.beginPath();
		// ctx.moveTo(cx + r, cy);
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = '#eee';
		ctx.arc(cx, cy, r, circleStartAngle, circleEndAngle);
		ctx.stroke();
	}

	// 画弧线
	function sector (cx, cy, r, startAngle, endAngle, anti) {
		ctx.beginPath();
		// ctx.moveTo(cx, cy + r); // 从圆形底部开始画
		ctx.lineWidth = lineWidth;

		// 渐变色 - 可自定义
		let linGrad = ctx.createLinearGradient(
			circleX - radius - lineWidth, circleY, circleX + radius + lineWidth, circleY
		);
		linGrad.addColorStop(0.0, '#0b5afb');
		// linGrad.addColorStop(0.5, '#9bc4eb');
		linGrad.addColorStop(1.0, '#3ec1ff');
		ctx.strokeStyle = linGrad;

		// 圆弧两端的样式
		ctx.lineCap = 'round';

		// 圆弧
		ctx.arc(cx, cy, r, startAngle, startAngle + endAngle / 100 * circleAngle, false);
		ctx.stroke();
	}

	// 刷新
	function loading () {
		if (process >= percent) {
			clearInterval(circleLoading);
		}
		// 清除canvas内容
		ctx.clearRect(0, 0, circleX * 2, circleY * 2);

		// 中间的字
		ctx.font = fontSize + 'px April';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = '#999';
		ctx.fillText(parseFloat(process).toFixed(2) + '%', circleX, circleY);

		// 圆形
		circle(circleX, circleY, radius);

		// 圆弧
		sector(circleX, circleY, radius, Math.PI * 1, process);
		// 两端圆点
		// smallcircle1(150 + Math.cos(2 * Math.PI / 360 * 120) * 100, 150 + Math.sin(2 * Math.PI / 360 * 120) * 100, 5);
		// smallcircle2(150 + Math.cos(2 * Math.PI / 360 * (120 + process * 3)) * 100, 150 + Math.sin(2 * Math.PI / 360 * (120 + process * 3)) * 100, 5);
		// 控制结束时动画的速度
		if (process / percent > 0.90) {
			process += 0.30;
		} else if (process / percent > 0.80) {
			process += 0.55;
		} else if (process / percent > 0.70) {
			process += 0.75;
		} else {
			process += 1.0;
		}
		if (process > percent) {
			process = percent;
		}
	}
	let process = 0.0;  // 进度
	let circleLoading = window.setInterval(function () {
		loading();
	}, 20);
};
