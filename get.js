var get = {};

get.settings = function(sheet) {
  var sheet, m, res, source_sheet;
  res = {};
  m = sheet.getDataRange().getValues();
  m.forEach(function(r, i) {
    var cell;
    cell = sheet.getRange(i + 1, 2);
    res[r[0]] = {  Background : cell.getBackground(),
      FontColor : cell.getFontColor(),
      FontWeight : cell.getFontWeight(),
      HorizontalAlignment : cell.getHorizontalAlignment(),
      WrapStrategy : cell.getWrapStrategy().toString(),
      VerticalAlignment : cell.getVerticalAlignment()
    };
  });
  return res;
};

get.tasks = function(sheet) {
  return ssa.get_vh(sheet)
    .filter(function(x) {return _.isDate(x['Due date']) && _.isDate(x['Start date']);})
    .map(function(x) {
      x['Duration'] = J_D(x['Due date']) - J_D(x['Start date']);
      return x;});
};

//GFolder->[Spreadsheet]
get.spreadsheets = function(folder, batch_size) {
  var file_iter, res, file, counter, cont;
  res = [];
  counter = 0;
  cont = true;
  file_iter = folder.getFilesByType('application/vnd.google-apps.spreadsheet');
  while (file_iter.hasNext() && cont) {
    file = file_iter.next();
    res.push(SpreadsheetApp.openById(file.getId()));
    if (batch_size) {
      counter++;
      cont = counter < batch_size;
    }
  }
  return res;
};

/*
  This function helps to copy formats and values from one spreadsheet to another
*/
//::Range->[[{Background: FontColor: Value: FontWeight: HorizontalAlignment}]]
get.formats = function(range) {
  return _.range(0, range.getHeight()).map(function(row) {
    return _.range(0, range.getWidth()).map(function(col) {
      var cell = range.getCell(row + 1, col + 1);
      return {
        Background : cell.getBackground(),
        FontColor : cell.getFontColor(),
        Value : cell.getValue(),
        FontWeight : cell.getFontWeight(),
        HorizontalAlignment : cell.getHorizontalAlignment()
      };
    });
  });
};

/*
  Very usefull function that returns hashmap where keys are names of the tabs in the spreadsheet
*/
//::GSpreadsheet->{<sheetId>:GSheet}
get.sheets_map = function(ss) {
  var res, sheets;
  sheets = ss.getSheets();
  res = {};
  sheets.forEach(function(sheet) {
    res[sheet.getName()] = sheet;
  });
  return res;
};

/*
  The most usefull function. Actually it is a just a alias to another
*/
//::String->GSheet
get.sheet = function(name) {return SpreadsheetApp.getActive().getSheetByName(name);};

get.config = function() {
  var sheet, m, res;
  sheet = SpreadsheetApp.getActive().getSheetByName('config');
  m = sheet.getDataRange().getValues().slice(1);
  res = {};
  m.forEach(function(r) {res[r[0]] = r[1];});
  return res;
};

//get 0.6.0