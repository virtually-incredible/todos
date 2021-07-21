function include_all(n) {
  var core;
  n = n || 0;
  core = ['wrap_', 'convert_', 'process_', 'utils_', 'main_'];
  var modules = [core];
  return modules[n].map(function(module) {return include(module);}).reduce(concat);
}

//server module v0.1. by yyk@mail.ru
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
    .getContent();
}

function server_request(x) {
  if (process[x.type] !== undefined) {return process[x.type](x.data);}
  else {return {type : 'error', data : 'unknown request'};};
}