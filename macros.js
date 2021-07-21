function dateBetween() {
  var spreadsheet = SpreadsheetApp.getActive();
  spreadsheet.getRange('D1').activate();
  var criteria = SpreadsheetApp.newFilterCriteria()
    .whenNumberBetween(44348, 44376)//06/01/2021
    .build();
  spreadsheet.getActiveSheet().getFilter().setColumnFilterCriteria(4, criteria);
};