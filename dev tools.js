function move_test_data_outside() {
  //эта фунцкия мне может ещё много раз славно послужить
  //на тот случай, когда сразу сделать как надо лень или нужно спешить. Хотя кого я обманываю!
  //ATTENTION - remove tabs with datasets and testboard to outer storage
  var sheets_map, s, ds, ts, sm, ss, dest_ds_ss;
  ss = SpreadsheetApp.getActive();
  sm = get.sheets_map(ss);
  ds = keys(sm).filter(function(s) {return s.indexOf('dataset') > -1;});
  ts = keys(sm).filter(function(s) {return s.indexOf('testboard') > -1;});

  function process(pair) {
    var xs, id, dest_ss;
    xs = pair[0];
    id = pair[1];
    dest_ss = SpreadsheetApp.openById(id);
    xs.forEach(function(sheet_name) {
      var source_sheet, m, dest_sheet;
      source_sheet = sm[sheet_name];
      m = source_sheet.getDataRange().getValues();
      dest_sheet = dest_ss.getSheetByName(sheet_name);
      if (dest_sheet == null) {dest_sheet = dest_ss.insertSheet(sheet_name);}
      dest_sheet.getRange(1, 1, m.length, m[0].length).setValues(m);
      crop.sheet(dest_sheet);
      ss.deleteSheet(source_sheet);
    });
  }

  [[ds, DATASETS_IDS[0]], [ts, TESTBOARDS_IDS[0]]].forEach(process);
}