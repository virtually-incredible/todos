function highlight_invalid_data() {
  var list_source_sheet, tasks_list, invalid, bg_m, dest_sheet;
  list_source_sheet = get.sheet('input');
  tasks_list = ssa.get_vh(list_source_sheet).filter(function(task) {return ne(task['Executor']);});
  bg_m = tasks_list.map(function(task) {
    var p1, p2, color1, color2;
    p1 = _.isDate(task['Start date']);
    p2 = _.isDate(task['Due date']);
    color1 = p1 ? 'white' : 'red';
    color2 = p2 ? 'white' : 'red';
    return [color1, color2];
  });
  dest_sheet = list_source_sheet;
  dest_sheet.clearFormats();
  dest_sheet.getRange(2, 3, bg_m.length, bg_m[0].length).setBackgrounds(bg_m);
}
