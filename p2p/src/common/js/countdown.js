export function countDowns (date, schedule) {
	let txt = '';
	let _date = new Date(date).getTime();
	let _now = new Date().getTime();
	let _differ = parseInt(_now - _date);
	if (_differ >= 0) {
		if (schedule === 100) {
			txt = '已售罄';
		} else {
			txt = '立即购买';
		}
	} else {
		let _d, _h; // _m, _s;
		_differ = parseInt(_differ / 1000);
		_d = parseInt(_differ / 24 / 3600);
		_h = parseInt(_differ / 24 % 3600);
		console.log(_d + '... ' + _h);
	}
	return txt;
}
