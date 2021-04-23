var apply = {};

apply.validation_results = function(sheet) {
  var tasks_list, colors, bg_m, headers;
  headers = ssa.get_headers(sheet);
  tasks_list = ssa.get_vh(sheet).filter(function(task) {return ne(task['Executor']);});
  colors = tasks_list.map(function(task) {
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
};

apply.formats = function(sheet, startRow, startCol, m) {
  m.forEach(function(r, y) {
    r.forEach(function(h, x) {
      var cell;
      cell = sheet.getRange(startRow + y, startCol + x);
      for (var p in m[y][x]) {
        if (p == 'WrapStrategy') {
          switch (m[y][x][p]) {
          case 'WRAP':
            cell.setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
            break;
          case 'OVERFLOW':
            cell.setWrapStrategy(SpreadsheetApp.WrapStrategy.OVERFLOW);
            break;
          case 'CLIP':
            cell.setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
            break;
          }
        } else {
          cell['set' + p](m[y][x][p]);
        }
      }
    });
  });
};