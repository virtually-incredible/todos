function rearrange_input(sheet) {
  var xs, valid, invalid, sheet;
  var cmp = function(a, b) {
    if (a > b) return +1;
    if (a < b) return -1;
    return 0;
  };
  xs = ssa.get_vh(sheet);
  valid  = _.filter(xs, valid_task);
  invalid = _.reject(xs, valid_task);
  valid = valid.sort(function(a, b) {
    return cmp(a['Done'], b['Done']) || cmp(b['Due date'], a['Due date']);
  });
  ssa.put_vh(sheet, valid.concat(invalid));
}