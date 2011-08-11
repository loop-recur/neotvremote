when = function(arg,f){
	var bool = (typeof arg == "boolean") ? arg : arg();
	if(bool) f();
}
