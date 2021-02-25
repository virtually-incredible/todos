var apply = {};

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