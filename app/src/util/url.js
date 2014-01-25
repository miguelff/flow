define(function () {

  var _param = function (name) {
    value = (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [])[1];
    if (value) {
      value = decodeURI(value);
    }
    return value;
  }

  return {
    param: _param
  }
});