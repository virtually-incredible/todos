var process = {};

process.filter_settings = function() {
  var executors, months;
  months = ['All'].concat(gen.months(new Date(), 12));
  executors = ['All'].concat(_.uniq(get.executors(get.sheet('executors'))).sort());
  return {type : 'filter_settings', data : {executors : executors, months : months}};
};

process.apply = function(data, sheet) {
  var ss, range, filter, c1, c2, c3, c4, c5, executor, status, month_of_year, arr, year, month, first_day, last_day, from, to,
    today, tomorrow;
  executor = data.executor;
  status = data.status;
  month_of_year = data.month;
  ss = SpreadsheetApp.getActiveSpreadsheet();
  sheet = sheet || get.sheet('input');
  filter = sheet.getFilter();
  if (filter) filter.remove();
  if ([executor, status, month_of_year].every(function(x) {return x == 'All';})) {
    //case with no filters
    return {type : 'apply'};
  }
  range = sheet.getDataRange();
  filter = range.createFilter();

  if (executor != 'All') {
    c1 = SpreadsheetApp.newFilterCriteria();
    c1.whenTextEqualTo(executor);
    filter.setColumnFilterCriteria(1, c1.build());
  }

  if (status == 'All') {
    if (month_of_year != 'All') {
      arr = month_of_year.split(' ');
      year = arr[1];
      month = MONTHS.indexOf(arr[0]) + 1;
      first_day = new Date([year, month, '1'].join('/'));
      last_day = dnt.last_day_of_month(first_day);
      c4 = SpreadsheetApp.newFilterCriteria();
      c4.whenNumberBetween(excel_date(first_day), excel_date(last_day));
      filter.setColumnFilterCriteria(4, c4.build());
    }
  } else {
    c2 = SpreadsheetApp.newFilterCriteria();
    if (status == 'Done') {
      c2.whenTextEqualTo('TRUE');
    } else {
      c2.whenTextEqualTo('FALSE');
    }
    filter.setColumnFilterCriteria(5, c2.build());

    c3 = SpreadsheetApp.newFilterCriteria();
    if (month_of_year == 'All') {
      if (status == 'Overdue') {
        c3.whenDateBefore(SpreadsheetApp.RelativeDate.TOMORROW);
      }
      if (status == 'Ongoing') {
        c3.whenDateAfter(SpreadsheetApp.RelativeDate.TODAY);
      }
      filter.setColumnFilterCriteria(4, c3.build());
    } else {
      //specific status and specific month
      arr = month_of_year.split(' ');
      year = arr[1];
      month = MONTHS.indexOf(arr[0]) + 1;
      first_day = new Date([year, month, '1'].join('/'));
      last_day = dnt.last_day_of_month(first_day);
      today = new Date();
      tomorrow = dnt.add_days(today, 1);
      if (status == 'Pending' || status == 'Done') {
        from = first_day;to = last_day;
      }
      if (status == 'Overdue') {
        from = first_day;to = today;
      }
      if (status == 'Ongoing') {
        from = tomorrow;to = last_day;
      }
      clog(from);
      clog(to);
      c3.whenNumberBetween(excel_date(from), excel_date(to));
      filter.setColumnFilterCriteria(4, c3.build());
    }
  }
};
