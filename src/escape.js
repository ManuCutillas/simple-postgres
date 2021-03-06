// from https://github.com/brianc/node-postgres/blob/master/lib/client.js
// ported from PostgreSQL 9.2.4 source code in src/interfaces/libpq/fe-exec.c

module.exports = {
  identifier: function identifier (str) {
    var escaped = '"'
    for (var i = 0; i < str.length; i++) {
      var c = str[i]
      if (c === '"') {
        escaped += c + c
      } else {
        escaped += c
      }
    }
    escaped += '"'
    return escaped
  },
  literal: function literal (str) {
    var hasBackslash = false
    var escaped = '\''
    for (var i = 0; i < str.length; i++) {
      var c = str[i]
      if (c === '\'') {
        escaped += c + c
      } else if (c === '\\') {
        escaped += c + c
        hasBackslash = true
      } else {
        escaped += c
      }
    }
    escaped += '\''
    if (hasBackslash === true) {
      escaped = ' E' + escaped
    }
    return escaped
  }
}
