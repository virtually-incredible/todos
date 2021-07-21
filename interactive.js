function onOpen() {
  var submenu = [
    {name : "Refresh summary", functionName : "refresh_summary"},
    {name : "Open sidebar", functionName : "open_sidebar"}
  ];
  SpreadsheetApp.getActiveSpreadsheet().addMenu('More actions', submenu);
}

function open_sidebar() {
  var html, sheet;
  html = HtmlService.createTemplateFromFile('sidebar').evaluate().setTitle('Sidebar');
  SpreadsheetApp.getUi().showSidebar(html);
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
  var sheet_name;
  sheet_name = sheet.getName();
  if (sheet_name == 'input') {
    if (col == 5) {//suppose that it is Done field
      rearrange_input(sheet);
    }
    apply.validation_results(sheet);
    refresh_summary();
  }
}

function refresh_summary() {
  var sheet, xs, ex_map, today, settings, m, dest_sheet;
  today = new Date();
  sheet = get.sheet('input');
  xs = get.tasks(sheet);
  ex_map = gen.ex_map(xs, today);
  settings = get.settings(get.sheet('settings'));
  m = gen.result_matrix(ex_map, settings);
  dest_sheet = get.sheet('summary');
  dest_sheet.clear();
  apply.formats(dest_sheet, 1, 1, m);
}