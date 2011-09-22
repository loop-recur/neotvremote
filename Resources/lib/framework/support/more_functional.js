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

log = function(s) {
	Ti.API.info(s);
	return s;
}

apply = function(f, args) {
	return f.apply(f, args);
}

cons = function(xs, other) {
	return [xs].concat(other);
}

repeat = function(arg, n) {	
	return nTimes(n, id.curry(arg));
}

fmap = function(fun, functor) {
	return functor.fmap(fun);
}

index = function(i, xs) {
	return xs[i];
}

random = function(i) {
	return Math.floor(Math.random()*i);
}

groups_of = function(n, xs) {
	if(xs.length === 0) return [];
	return cons(take(n, xs), groups_of(n, drop(n,xs)));
}

uniq = function(xs) {
	var newArray = [];
	
	for(var i=0;i<xs.length;i++ ) {
		if(newArray.indexOf(xs[i]) < 0) newArray.push(xs[i]);
	};
	return newArray;
}
