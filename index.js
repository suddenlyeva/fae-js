var fs = require('fs')
require("json-circular-stringify");

var src = fs.readFileSync('test.fae', 'utf8')

function isLetter(c) {
  return c.toLowerCase() != c.toUpperCase();
}

/////////////////
//  L E X E R  //
/////////////////
let line = 1
let col = 1
let token_list = []
let cur = 0
let next = () => {
  ++cur
  ++col
}

while (cur < src.length) {
  
  //
  // Skips

  // Skip Newlines and add to Line Number
  if (src[cur] == '\n') {
    ++line
    col = 0
    next()
  }
  
  // Skip whitespace
  else if (/\s/g.test(src[cur])) {
    next()
  }
  
  // Skip Line Comments
  else if (src[cur] == '/' && src[cur + 1] == '/') {
    while(src[cur] != '\n') {
      next()
    }
    ++line
    col = 0
    next()
  }
  
  // Skip Block Comments
  else if (src[cur] == '/' && src[cur + 1] == '*') {
    while(src[cur] != '/' || src[cur - 1] != '*') {
      if (src[cur] == '\n') {
        ++line
      }
      next()
    }
    next()
  }

  //
  // Brackets

  // Open Curly
  else if (src[cur] == '{') {
    token_list.push({
      id : token_list.length,
      type : 'BRACKET',
      symbol : '{',
      line : `${line}:${col}`
    })
    next()
  }

  // Close Curly
  else if (src[cur] == '}') {
    token_list.push({
      id : token_list.length,
      type : 'BRACKET',
      symbol : '}',
      line : `${line}:${col}`
    })
    next()
  }

  // Open Round
  else if (src[cur] == '(') {
    token_list.push({
      id : token_list.length,
      type : 'BRACKET',
      symbol : '(',
      line : `${line}:${col}`
    })
    next()
  }

  // Close Round
  else if (src[cur] == ')') {
    token_list.push({
      id : token_list.length,
      type : 'BRACKET',
      symbol : ')',
      line : `${line}:${col}`
    })
    next()
  }

  // Open Square
  else if (src[cur] == '[') {
    token_list.push({
      id : token_list.length,
      type : 'BRACKET',
      symbol : '[',
      line : `${line}:${col}`
    })
    next()
  }

  // Close Square
  else if (src[cur] == ']') {
    token_list.push({
      id : token_list.length,
      type : 'BRACKET',
      symbol : ']',
      line : `${line}:${col}`
    })
    next()
  }

  //
  // Delimiters

  // Semicolon
  else if (src[cur] == ';') {
    token_list.push({
      id : token_list.length,
      type : 'DELIMITER',
      symbol : ';',
      line : `${line}:${col}`
    })
    next()
  }

  // Comma
  else if (src[cur] == ',') {
    token_list.push({
      id : token_list.length,
      type : 'DELIMITER',
      symbol : ',',
      line : `${line}:${col}`
    })
    next()
  }

  //
  // Assignments

  // Plus Equals
  else if (src[cur] == '+' && src[cur + 1] == '=') {
    token_list.push({
      id : token_list.length,
      type : 'ASSIGN',
      symbol : '+=',
      line : `${line}:${col}`
    })
    next()
    next()
  }

  // Minus Equals
  else if (src[cur] == '-' && src[cur + 1] == '=') {
    token_list.push({
      id : token_list.length,
      type : 'ASSIGN',
      symbol : '-=',
      line : `${line}:${col}`
    })
    next()
    next()
  }

  // Times Equals
  else if (src[cur] == '*' && src[cur + 1] == '=') {
    token_list.push({
      id : token_list.length,
      type : 'ASSIGN',
      symbol : '*=',
      line : `${line}:${col}`
    })
    next()
    next()
  }

  // Divide Equals
  else if (src[cur] == '/' && src[cur + 1] == '=') {
    token_list.push({
      id : token_list.length,
      type : 'ASSIGN',
      symbol : '/=',
      line : `${line}:${col}`
    })
    next()
    next()
  }

  // String Equals
  else if (src[cur] == '~' && src[cur + 1] == '=') {
    token_list.push({
      id : token_list.length,
      type : 'ASSIGN',
      symbol : '~=',
      line : `${line}:${col}`
    })
    next()
    next()
  }

  // Equals
  else if (src[cur] == '=') {
    token_list.push({
      id : token_list.length,
      type : 'ASSIGN',
      symbol : '=',
      line : `${line}:${col}`
    })
    next()
  }

  //
  // Operators

  // Range
  else if (src[cur] == '.' && src[cur + 1] == '.') {
    token_list.push({
      id : token_list.length,
      type : 'OPERATOR',
      symbol : '..',
      line : `${line}:${col}`
    })
    next()
    next()
  }

  // Access
  else if (src[cur] == '.') {
    token_list.push({
      id : token_list.length,
      type : 'OPERATOR',
      symbol : '.',
      line : `${line}:${col}`
    })
    next()
  }

  // Object Union
  else if (src[cur] == ':') {
    token_list.push({
      id : token_list.length,
      type : 'OPERATOR',
      symbol : ':',
      line : `${line}:${col}`
    })
    next()
  }

  // Arrow
  else if (src[cur] == '-' && src[cur + 1] == '>') {
    token_list.push({
      id : token_list.length,
      type : 'OPERATOR',
      symbol : '->',
      line : `${line}:${col}`
    })
    next()
    next()
  }

  // Addition
  else if (src[cur] == '+') {
    token_list.push({
      id : token_list.length,
      type : 'OPERATOR',
      symbol : '+',
      line : `${line}:${col}`
    })
    next()
  }

  // Subtraction
  else if (src[cur] == '-') {
    token_list.push({
      id : token_list.length,
      type : 'OPERATOR',
      symbol : '-',
      line : `${line}:${col}`
    })
    next()
  }

  // Multiplication
  else if (src[cur] == '*') {
    token_list.push({
      id : token_list.length,
      type : 'OPERATOR',
      symbol : '*',
      line : `${line}:${col}`
    })
    next()
  }

  // Division
  else if (src[cur] == '/') {
    token_list.push({
      id : token_list.length,
      type : 'OPERATOR',
      symbol : '/',
      line : `${line}:${col}`
    })
    next()
  }

  // String
  else if (src[cur] == '~') {
    token_list.push({
      id : token_list.length,
      type : 'OPERATOR',
      symbol : '~',
      line : `${line}:${col}`
    })
    next()
  }

  //
  // Numbers

  else if (/\d/.test(src[cur])) {
    let symbol = ''
    let lineinfo = `${line}:${col}`
    while (/\d/.test(src[cur])) {
      symbol += src[cur]
      next()
    }
    if (src[cur] == '.') {
      symbol += src[cur]
      next()
      while (/\d/.test(src[cur])) {
        symbol += src[cur]
        next()
      }
    }

    token_list.push({
      id : token_list.length,
      type : 'NUMBER',
      symbol,
      line : lineinfo
    })

  }

  //
  // Words

  else if (isLetter(src[cur]) || src[cur] == '@') {
    let symbol = src[cur]
    let is_event = src[cur] == '@'
    let lineinfo = `${line}:${col}`
    next()
    while(isLetter(src[cur]) || src[cur] == '_' || /\d/.test(src[cur])) {
      symbol += src[cur]
      next()
    }
    
    let keywords = [
      'else',
      'for',
      'function', 
      'if',
      'in',
      'let', 
      'loop',
      'return',
      'task',
      'type',
      'while',
      'yield',
    ]

    if(keywords.includes(symbol)) {
      token_list.push({
        id : token_list.length,
        type : 'KEYWORD',
        symbol,
        line : lineinfo
      })
    }
    else {
      token_list.push({
        id : token_list.length,
        type : is_event ? 'EVENT' : 'IDENTIFIER',
        symbol,
        line : lineinfo
      })
    }

  }

  //
  // Invalid

  else {

    token_list.push({
      id : token_list.length,
      type : 'INVALID',
      symbol : src[cur],
      line : `${line}:${col}`
    })

    next()
  }

}


///////////////////
//  P A R S E R  //
///////////////////

function ParserError(token, message) {
  return `ParserError at Line ${token.line} - ${message}`
}

function GetVariable(scope, id) {
  while(scope) {
    if (scope.vars[id]) {
      return scope.vars[id]
    }
    scope = scope.parent
  }
  return null
}

function ParseEnvironment({tokens,parent,args}) {

  let environment = {}

  let vars = {}

  if (args) {
    for (let arg of args) {
      vars[arg] = { type: 'UNDEFINED' }
    }
  }

  environment.scope = { parent, vars }
  environment.statements = []

  //
  // Function Look-Ahead
  let t = 0
  while (t < tokens.length) {
    // Function and Task Declarations
    if (tokens[t].symbol == 'function' || tokens[t].symbol == 'task') {
      let func_start = tokens[t]
      let type = tokens[t].symbol == 'function' ? 'FUNCTION' : 'TASK'
      ++t
      if (tokens[t].type != 'IDENTIFIER') {
        throw ParserError(tokens[t], 'Expected a valid identifier')
      }
      if (vars[tokens[t].symbol]) {
        throw ParserError(tokens[t], `Identifier "${tokens[t].symbol}" already exists in scope`)
      }
      let id = tokens[t].symbol
      let func = {}
      func.type = type
      func.args = []
      ++t
      // Arguments list
      if (tokens[t].symbol != '(') {
        throw ParserError(tokens[t], "Expected '('")
      }
      ++t
      while (tokens[t].type == 'IDENTIFIER') {
        func.args.push(tokens[t].symbol)
        ++t
        if (tokens[t].symbol == ',') {
          ++t
          if (tokens[t].type != 'IDENTIFIER') {
            throw ParserError(tokens[t], 'Expected a valid argument name')
          }
        }
      }
      if (tokens[t].symbol != ')') {
        throw ParserError(tokens[t], "Expected ')'")
      }
      ++t
      // Function/Task Body
      if (tokens[t].symbol != '{') {
        throw ParserError(tokens[t], `Expected the beginning of a ${type} body`)
      }
      ++t
      let block_start = t
      let depth = 1
      while (depth > 0) {
        if (!tokens[t]) {
          throw ParserError(func_start, `Expected '}' at the end of the ${type} body`)
        }
        if (tokens[t].symbol == '{') {
          ++depth
        }
        if (tokens[t].symbol == '}') {
          --depth
        }
        ++t
      }
      let func_tokens = tokens.slice(block_start, t)
      func.body = ParseEnvironment({
        tokens: func_tokens, 
        parent: environment.scope, 
        args: func.args
      })
      // func.value = { type: 'UNDEFINED' }
      vars[id] = func
      let start_id = tokens.indexOf(func_start)
      tokens.splice(start_id, t - start_id)
      t = start_id
    }
    else {
      ++t
    }
  }

  //
  // Parse Statements
  t = 0
  while (t < tokens.length) {
    // Variable Declarations
    if (tokens[t].symbol == 'let') {
      ++t
      if (tokens[t].type != 'IDENTIFIER') {
        throw ParserError(tokens[t], 'Expected a valid identifier')
      }
      if (vars[tokens[t].symbol]) {
        throw ParserError(tokens[t], `Identifier "${tokens[t].symbol}" already exists in scope`)
      }
      vars[tokens[t].symbol] = { type: 'UNDEFINED' }
    }
    // Single statements
    else if (tokens[t].type == 'IDENTIFIER' || tokens[t].symbol == 'return') {
      let statement_start = t
      let assignment_index = null
      let is_return = tokens[t].symbol == 'return'

      // Look ahead for statement type and end
      while (tokens[t].symbol != ';') {
        if (!tokens[t]) {
          throw ParserError(tokens[t], `Unexpected end of file. Are you missing a ';'?`)
        }
        if (tokens[t].type == 'ASSIGN') {
          if (assignment_index !== null) {
            throw ParserError(tokens[t], `Unexpected multiple assignments found in statement. Are you missing a ';'?`)
          }
          assignment_index = t
        }
        ++t
      }

      // Return Statements 
      if (is_return) {
        let statement = {
          statement : 'RETURN',
          expression : tokens.slice(statement_start + 1, t - statement_start)
        }
        environment.statements.push(statement)
        ++t
      }
      // Assignment Statements
      else if(assignment_index) {
        let assignment = {
          statement : 'ASSIGN',
          variable : tokens.slice(statement_start, assignment_index),
          operator : tokens[assignment_index].symbol,
          expression : tokens.slice(assignment_index + 1, t)
        }
        environment.statements.push(assignment)
        ++t
      }
      // Normal Expressions
      else {
        let expression = {
          statement : 'EXPRESSION',
          expression : tokens.slice(statement_start, t - statement_start)
        }
        environment.statements.push(expression)
        ++t
      }
    }
    else {
      ++t
    }
  }

  return environment
}

try {
  let AST = ParseEnvironment({ tokens: token_list })
  console.log(JSON.stringify(AST, null, '  '))
}
catch (e) {
  console.error(e)
}