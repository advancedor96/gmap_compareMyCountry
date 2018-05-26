function buildFunctions() {

	var arr = [];

	for (var i = 0; i < 3; i++) {
		arr.push(
			(function (a1) {
				return function(){  console.log(a1)  };
			}(i))
		)
	}

	return arr;
}


var fs = buildFunctions();
console.log(fs[0]);
fs[0]();
fs[1]();
fs[2]();