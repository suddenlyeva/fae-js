var fs = require('fs')

var src = fs.readFileSync('test.fae', 'utf8')

/////////////////
//  L E X E R  //
/////////////////
let line = 1
let token_list = []
let cur = 0

while (cur < src.length) {
  
  // Skip Newlines and add to Line Number
  if (src[cur] == '\n') {
    ++line
    ++cur
  }
  
  // Skip whitespace
  else if (/\s/g.test(src[cur])) {
    ++cur
  }

  // Numbers
  else if (/\d/.test(src[cur])) {
    let symbol = ''
    while (/\d/.test(src[cur])) {
      symbol += src[cur]
      ++cur
    }
    if (src[cur] == '.') {
      symbol += src[cur]
      ++cur
      while (/\d/.test(src[cur])) {
        symbol += src[cur]
        ++cur
      }
    }

    token_list.push({
      id : token_list.length,
      type : 'NUMBER',
      symbol,
      line : `${line}:${Math.floor(cur/line)}`
    })

  }

  // Addition
  else if (src[cur] == '+') {
    token_list.push({
      id : token_list.length,
      type : 'BIN_OP',
      symbol : '+',
      line : `${line}:${Math.floor(cur/line)}`
    })
    ++cur
  }

  // Just in Case ?w?
  else {
    ++cur
  }

}

console.log(token_list)