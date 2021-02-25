var gen = {};

gen.result_matrix = function(ex_map, settings) {
  var m, maximum, ongoings, overdues, dones, ex_h;
  m = [];
  for (var executor in ex_map) {
    ex_h = _.extend({}, {Value : executor}, settings['executor']);
    ongoings = ex_map[executor]['ongoing'].map(function(x) {
      return _.extend({}, {Value : x}, settings['ongoing']);
    });
    overdues = ex_map[executor]['overdue'].map(function(x) {
      return _.extend({}, {Value : x}, settings['ovedue']);
    });
    dones = ex_map[executor]['done'].map(function(x) {
      return _.extend({}, {Value : x}, settings['done']);
    });
    m.push([ex_h]
      .concat(ongoings)
      .concat(overdues)
      .concat(dones)
    );
  }
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

gen.ex_map = function(xs, threshold) {
  var ex_map;
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
      if (x['Duration'] <= threshold) {
        ex_map[executor]['overdue'].push(x['Description']);
      } else {
        ex_map[executor]['ongoing'].push(x['Description']);
      }
    }
  });
  return ex_map;
};