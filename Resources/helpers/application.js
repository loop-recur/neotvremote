Helpers.Application = {};

Helpers.Application.isAndroid = function() {
	return Ti.Platform.osname == 'android';
}

Helpers.Application.addDp = function() {
		var array = Helpers.Application._buildArray(Helpers.Application.addDp.arguments);
    var ints = map(Helpers.Application.extractInteger, array);
    var sum = reduce('x+y', 0, ints);
    return sum + "dp";
}

Helpers.Application.extractInteger = function(str) {
    var str = new String(str);
    return parseInt(str.replace("dp", ""));
}

Helpers.Application._buildArray = function(arguments) {
	var array = [];
	for (var i=0; i < arguments.length; i++) {
		array.push(arguments[i]);
	};
	return array;
}