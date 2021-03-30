function onOpen() {
  var submenu = [
    {name : "Refresh summary", functionName : "refresh_summary"}

  ];
  SpreadsheetApp.getActiveSpreadsheet().addMenu('More actions', submenu);
}

function onEdit(e) {
  var range, sheet_name, sheet, headers, col, row;
  range = e.range;
  col = range.getLastColumn();
  row = range.getLastRow();
  sheet = range.getSheet();
  on_edit(sheet, row, col);
}

function on_edit(sheet, row, col) {
  var sheet_name, headers, xs, cols, tasks_list, bg_m;
  sheet_name = sheet.getName();
  if (sheet_name == 'input') {
    headers = ssa.get_headers(sheet);
    xs = ['Start date', 'Due date'].map(function(p) {return headers.indexOf(p);});
    cols = xs.map(function(x) {return x + 1;});
    if (cols.indexOf(col) > -1 || true) {
      tasks_list = ssa.get_vh(sheet).filter(function(task) {return ne(task['Executor']);});
      var colors = tasks_list.map(function(task) {
        var p1, p2, color1, color2;
        p1 = _.isDate(task['Start date']);
        p2 = _.isDate(task['Due date']);
        color1 = p1 ? 'white' : 'red';
        color2 = p2 ? 'white' : 'red';
        return {'Start date' : color1, 'Due date' : color2};
      });
      sheet.clearFormats();
      bg_m = colors.map(function(x) {
        return headers.map(function(header) {
          if (x[header]) {
            return x[header];
          } else {
            return 'white';
          }
        });
      });
      sheet.getRange(2, 1, bg_m.length, bg_m[0].length).setBackgrounds(bg_m);
    }
    refresh_summary();
  }
}

function refresh_summary() {
  var sheet, xs, ex_map, threshold, settings, m, dest_sheet;
  threshold = 7;
  sheet = get.sheet('input');
  xs = get.tasks(sheet);
  ex_map = gen.ex_map(xs, threshold);
  settings = get.settings(get.sheet('settings'));
  m = gen.result_matrix(ex_map, settings);
  dest_sheet = get.sheet('summary');
  dest_sheet.clear();
  apply.formats(dest_sheet, 1, 1, m);
}