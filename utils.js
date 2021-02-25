//::Bool->Bool
not = function(x) {return !x;};

//::Bool->Bool->Bool
or = function(a, b) {return a || b;};

//::Bool->Bool->Bool
and = function(a, b) {return a && b;};

numsort = function(a, b) {return Number(a) - Number(b);};

lc = function(x) {return x.toLowerCase();};

takeWhile = function(p, xs) {
  var res, drop;
  drop = false;
  res = [];
  xs.forEach(function(x) {
    if (p(x) && !drop) {res.push(x);}
    else {
      drop = true;
    }
  });
  return res;
};

//::Concatable->Concatable->Concatable
concat = function(a, b) {
  if (_.isArray(a) && _.isArray(b)) {return a.concat(b);}
  if (_.isString(a) && _.isString(b)) {return a + b;}
};

//::a->a->Bool
le = function(x,y) {return x <= y;};
less = function(x,y) {return x < y;};

//::a->a->Bool
ge = function(x,y) {return x >= y;};
greater = function(x,y) {return x > y;};

function normalize_name(x) {
  return x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();
}

num = function(x) {return Number(x);};

//::Date->Iso8601
to_iso8601 = function(js_date) {
  var arr, year, month, day, time, time_offset;
  arr = js_date.toString().split(' ');
  year = arr[3];
  day = arr[2];
  month = lz(js_date.getMonth() + 1);
  time = arr[4];
  time_offset = arr[5].slice(3);
  return [year, month, day].join('-') + 'T' + time + time_offset;
};

//::Url->String->String
link = function(url, string) {
  return '<a href="' + url + '">' + string + '</a>';
};

//::String->Bool
empty = function(x) {return typeof x == 'string' &&  x == '';};

//::String->Bool
ne = function(x) {return !empty(x);};

clog = function(x) {Logger.log(x);};

//::Function->Function->Function
compose = function(f, g) {
  return function(x) {
    return f(g(x));
  };
};

copy = function(x) {return JSON.parse(JSON.stringify(x));};

//::a->a->a
sum = function(a, b) {return a + b;};

concat = function(a, b) {return a.toString() + b.toString();};

//::a->Bool
ndef = function(x) {
  if (typeof x == 'undefined') return true;
  if (x == null) return true;
  else return false;
};

//::a->Bool
def = function(x) {return !ndef(x);};//shortcut for == undefined;

keys = function(x) {return Object.keys(x);};

hyperlink = function(x, name) {return '=HYPERLINK("' + x[name].db_link + '", "' + name + '")';};

//::[Hashtable] -> String -> Hhi
vh_to_hhi = function (vh, key_field) {
  var res;
  res = {};
  vh.forEach(function(h, i) {
    res[h[key_field]] = {idx : i, h : h};
  });
  return res;
};

//::[Hashtable] -> String -> Hh
vh_to_hh = function(vh, key_field) {
  var res;
  res = {};
  vh.forEach(function(h, i) {
    res[h[key_field]] = h;
  });
  return res;
};

//::[Hashtable] -> String->Stirng-> Object
vh_to_h = function(vh, key_field, value_field) {
  var res;
  res = {};
  vh.forEach(function(h, i) {
    res[h[key_field]] = h[value_field];
  });
  return res;
};

//::a->a->a
sum = function(a, b) {return a + b;};

//::Int->Int->Int
div = function(x, n) {return Math.floor(x / n);};

//::String->String
l4z = function(x) {return ('000' + x).substr(-4);};

//::String->String
lz = function(x) {return ('00' + x).substr(-2);};

hh_to_vh = function(hh) {return Object.keys(hh).map(function(key) {return hh[key];});};

function trim(x) {return x.trim();}

function blow(h, prop, value) {
  value = value;
  if (h[prop] == undefined) h[prop] = value;
  return h;
}

lenz = function(p, pred) {return function(x,y) {return pred(x[p], y[p]);};};

function existy(x) {return x !== null && x !== undefined && x !== '';}

function truthy(x) {return (x !== false) && existy(x);}

//::(a->Boolean)->SortResult
function comparator(pred) {
  return function(x, y) {
    if (truthy(pred(x, y))) {
      return -1;
    } else {
      if (truthy(pred(y, x))) {
        return 1;
      } else {
        return 0;
      }
    }
  };
}

function iter_to_vh(iter) {
  var r;
  r = [];
  while (iter.hasNext()) {
    r.push(iter.next());
  };
  return r;
}

function autoresize_columns(sheet) {
  var cols, i;
  sheet.getLastColumn();
  for (i = 1;i <= cols;i++) {
    sheet.autoResizeColumn(i);
  }
};

var compose = function(f, g) {
  return function(x) {
    return f(g(x));
  };
};

function cut_last(s) {
  if (s == '') return s;
  return s.substr(0, s.length - 1);
}

//::Int -> Stirng
function n_to_a1(a) {//RC -> A1
  var asc1,asc2, m, p, first;
  n = a - 1;
  p = n % 26;
  m = (n - p) / 26;
  asc2 = ('A'.charCodeAt(0)) + p ;
  first = m ? String.fromCharCode(('A'.charCodeAt(0)) + (m - 1)) : '';
  return  first + String.fromCharCode(asc2);
}

//::String -> Int
function a1_to_n(s) {
  var n, i, d, sum, base;
  sum = 0;base = 26;
  n = s.length;
  for (i = 0;i < n;i++) {
    d = s.charCodeAt(i) - 'A'.charCodeAt(0) + 1;
    sum += Math.pow(base, n - i - 1) * d;
  }
  return sum;
}

max = function(arr) {return Math.max.apply(null, arr);};

function identity(x) {return x;};

//::String -> String
function cdr(s) {return s.substr(-s.length + 1);};