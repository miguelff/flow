define(function(){
	var param = function(name) {
		value = (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[])[1];
		if(value){
			value = decodeURI(value);
		}
		return value;
	}
	
	return {
		param: param
	}
});