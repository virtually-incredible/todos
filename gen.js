var gen = {};

gen.months = function(date, n) {
  var fm_to_s, fm, fms;
  fm_to_s = function(fm) {return MONTHS[fm[0]] + ' ' + fm[1];};
  fm = dnt.get_full_month(date);
  fms = _.range(0, 12).map(function(i) {return dnt.add_months(fm, i);});
  return fms.map(fm_to_s);
};

gen.result_matrix = function(ex_map, settings) {
  var m, maximum, executors;
  m = [];
  executors = keys(ex_map).sort();
  executors.forEach(function(executor) {
    var ongoings, overdues, ex_h;
    ex_h = _.extend({}, {Value : executor}, settings['executor']);
    ongoings = ex_map[executor]['ongoing'].map(function(x) {
      return _.extend({}, {Value : x}, settings['ongoing']);
    });
    overdues = ex_map[executor]['overdue'].map(function(x) {
      return _.extend({}, {Value : x}, settings['ovedue']);
    });
    m.push([ex_h]
      .concat(overdues)
      .concat(ongoings)
    );
  });
  maximum = max(m.map(function(r) {return r.length;}));
  m = m.map(function(r) {
    return r
      .concat(_.range(0, maximum - r.length)
        .map(function() {return gen.format('', 'white', 'black', 'normal', 'LEFT');}));
  });

  m = _.unzip(m);
  return m;
};

gen.format = function(value, bg, fc, fw, ha, wrap, va) {
  return {  Background : bg,
    FontColor : fc,
    Value : value,
    FontWeight : fw,
    HorizontalAlignment : DocumentApp.HorizontalAlignment[ha],
    WrapStrategy : wrap,
    VerticalAlignment : va,
  };
};

gen.ex_map = function(xs, today) {
  var ex_map, threshold;
  threshold = J_I(today);
  ex_map = {};
  xs.forEach(function(x) {
    var executor;
    executor = x['Executor'];
    blow(ex_map, executor, {});
    blow(ex_map[executor], 'ongoing', []);
    blow(ex_map[executor], 'overdue', []);
    blow(ex_map[executor], 'done', []);
    if (x['Done']) {
      ex_map[executor]['done'].push(x['Description']);
    } else {
      if (J_I(x['Due date']) < threshold) {
        ex_map[executor]['overdue'].push(x['Description']);
      } else {
        ex_map[executor]['ongoing'].push(x['Description']);
      }
    }
  });
  return ex_map;
};