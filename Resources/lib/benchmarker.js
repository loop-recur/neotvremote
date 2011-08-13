var Benchmarker = function() {
	
	function run(test){
		var start = (new Date).getTime(), diff = 0;
    test();
    return (new Date).getTime() - start;
	}
	
	return { run : run }
}();