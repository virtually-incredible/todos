function process_module_tests() {
  return ;
}

function test_process_apply() {
  return jUnit.test_case('', {
    'test applying filters on input records' : function() {
      //process.apply({executor:'LOGAN', status:'Overdue', month:'All'});
      process.apply({executor : 'AILEEN', status : 'Done', month : 'July 2021'});
    }
  });
}