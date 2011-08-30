when = function(arg,f){
	var bool = (typeof arg == "boolean") ? arg : arg();
	if(bool) f();
}

take = function(n, array) {
	var newArray = [];
	
	for(var i=0;i<array.length;i++ ) {
		if(array[i] != null) newArray.push(array[i]);
		if(newArray.length>=n) break;
	};
	return newArray;
}


nTimes = function(times, fun) {
	var time = 0;
	
	for(var i=0;i<times;i++ ){
		setTimeout(fun, time);
		time += 250;
	}
}