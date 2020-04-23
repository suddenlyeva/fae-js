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
  // Logic

  // Less Equals
  else if (src[cur] == '<' && src[cur + 1] == '=') {
    token_list.push({
      id : token_list.length,
      type : 'OPERATOR',
      symbol : '<=',
      line : `${line}:${col}`
    })
    next()
    next()
  }

  // Greater Equals
  else if (src[cur] == '>' && src[cur + 1] == '=') {
    token_list.push({
      id : token_list.length,
      type : 'OPERATOR',
      symbol : '>=',
      line : `${line}:${col}`
    })
    next()
    next()
  }

  // Less
  else if (src[cur] == '<') {
    token_list.push({
      id : token_list.length,
      type : 'OPERATOR',
      symbol : '<',
      line : `${line}:${col}`
    })
    next()
  }

  // Greater
  else if (src[cur] == '>') {
    token_list.push({
      id : token_list.length,
      type : 'OPERATOR',
      symbol : '>',
      line : `${line}:${col}`
    })
    next()
  }

  // Equality
  else if (src[cur] == '=' && src[cur + 1] == '=') {
    token_list.push({
      id : token_list.length,
      type : 'OPERATOR',
      symbol : '==',
      line : `${line}:${col}`
    })
    next()
    next()
  }

  // Inequality
  else if (src[cur] == '=' && src[cur + 1] == '=') {
    token_list.push({
      id : token_list.length,
      type : 'OPERATOR',
      symbol : '==',
      line : `${line}:${col}`
    })
    next()
    next()
  }

  // Logical AND
  else if (src[cur] == '&' && src[cur + 1] == '&') {
    token_list.push({
      id : token_list.length,
      type : 'OPERATOR',
      symbol : '&&',
      line : `${line}:${col}`
    })
    next()
    next()
  }

  // Logical OR
  else if (src[cur] == '|' && src[cur + 1] == '|') {
    token_list.push({
      id : token_list.length,
      type : 'OPERATOR',
      symbol : '||',
      line : `${line}:${col}`
    })
    next()
    next()
  }

  // Logical NOT
  else if (src[cur] == '!') {
    token_list.push({
      id : token_list.length,
      type : 'OPERATOR',
      symbol : '!',
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

  // Remainder Equals
  else if (src[cur] == '%' && src[cur + 1] == '=') {
    token_list.push({
      id : token_list.length,
      type : 'ASSIGN',
      symbol : '%=',
      line : `${line}:${col}`
    })
    next()
    next()
  }

  // Power Equals
  else if (src[cur] == '^' && src[cur + 1] == '=') {
    token_list.push({
      id : token_list.length,
      type : 'ASSIGN',
      symbol : '^=',
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

  // Union Equals
  else if (src[cur] == ':' && src[cur + 1] == '=') {
    token_list.push({
      id : token_list.length,
      type : 'ASSIGN',
      symbol : ':=',
      line : `${line}:${col}`
    })
    next()
    next()
  }

  // Exists Equals
  else if (src[cur] == '?' && src[cur + 1] == '=') {
    token_list.push({
      id : token_list.length,
      type : 'ASSIGN',
      symbol : '?=',
      line : `${line}:${col}`
    })
    next()
    next()
  }

  // Null Equals
  else if (src[cur] == '\\' && src[cur + 1] == '=') {
    token_list.push({
      id : token_list.length,
      type : 'ASSIGN',
      symbol : '\\=',
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

  // Object Assignment
  else if (src[cur] == ':') {
    token_list.push({
      id : token_list.length,
      type : 'OPERATOR',
      symbol : ':',
      line : `${line}:${col}`
    })
    next()
  }

  // Type Check
  else if (src[cur] == '&') {
    token_list.push({
      id : token_list.length,
      type : 'OPERATOR',
      symbol : '&',
      line : `${line}:${col}`
    })
    next()
  }

  // Optional Switch
  else if (src[cur] == '?') {
    token_list.push({
      id : token_list.length,
      type : 'OPERATOR',
      symbol : '?',
      line : `${line}:${col}`
    })
    next()
  }

  // Default
  else if (src[cur] == '\\') {
    token_list.push({
      id : token_list.length,
      type : 'OPERATOR',
      symbol : '\\',
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

  // Remainder
  else if (src[cur] == '%') {
    token_list.push({
      id : token_list.length,
      type : 'OPERATOR',
      symbol : '%',
      line : `${line}:${col}`
    })
    next()
  }

  // Power
  else if (src[cur] == '^') {
    token_list.push({
      id : token_list.length,
      type : 'OPERATOR',
      symbol : '^',
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
    if (src[cur] == '.' && /\d/.test(src[cur+1])) {
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
  // String Literals

  else if (src[cur] == '"') {
    let symbol = src[cur]
    let lineinfo = `${line}:${col}`
    let escape = false
    next()
    while(src[cur] != '"' || escape) {
      if (!src[cur]) {
        throw Error(`At Line ${lineinfo} - End of string not found`)
      }
      if (src[cur] == '\\' && !escape) {
        escape = true
      }
      else {
        escape = false
      }
      symbol += src[cur]
      next()
    }
    next()
    symbol += src[cur]

    token_list.push({
      id : token_list.length,
      type : 'STRING',
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
    while(src[cur] && (isLetter(src[cur]) || src[cur] == '_' || /\d/.test(src[cur]))) {
      symbol += src[cur]
      next()
    }
    
    let keywords = [
      'else',
      'false',
      'for',
      'function', 
      'if',
      'in',
      'let', 
      'loop',
      'return',
      'task',
      'true',
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

token_list.push({
  id : token_list.length,
  type : 'EOF',
  symbol : null,
  line : `${line}:${col}`
})


///////////////////
//  P A R S E R  //
///////////////////

function ParserError(token, message) {
  return `ParserError at Line ${token.line} - ${message}`
}

function ParseEnvironment({tokens,parent,args}) {

  let environment = {}

  let vars = {}

  if (args) {
    for (let arg of args) {
      vars[arg] = { type: '<Undefined>' , value: null }
    }
  }

  environment.scope = { vars }
  if (parent) {
    environment.scope.parent = parent.scope
  }
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
        throw ParserError(tokens[t], `Expected '{' to begin the ${type} body`)
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
  for ( ; ; ) {

    // Let
    if (tokens[0].symbol == 'let') {
      tokens.shift()
      if (tokens[0].type != 'IDENTIFIER') {
        throw ParserError(tokens[0], 'Expected a valid identifier')
      }
      if (vars[tokens[0].symbol]) {
        throw ParserError(tokens[0], `Identifier "${tokens[0].symbol}" already exists in scope`)
      }
      vars[tokens[0].symbol] = { type: '<Undefined>', value: null }
    }

    // Loop
    else if (tokens[0].symbol == 'loop') {
      tokens.shift()
      let loop = { statement: 'LOOP' }

      if (tokens[0].symbol == '('){
        loop.statement = 'NLOOP'
        tokens.shift()
        loop.times = ParseExpression({tokens})
        if (tokens[0].symbol != ')') {
          throw ParserError(tokens[arg_start], `Expected ')' at the end of loop count`)
        }
        tokens.shift()
      }
      loop.body = ParseBlock({ tokens, parent: environment })
      environment.statements.push(loop)
    }

    // While and If
    else if (tokens[0].symbol == 'while' || tokens[0].symbol == 'if') {
      let type = tokens[0].symbol
      tokens.shift()
      let statement = { statement: type == 'while' ? 'WHILE' : 'IF'}

      if (tokens[0].symbol != '(') {
        throw ParserError(tokens[0], `Expected '(' at the start of ${type} condition`)
      }
      tokens.shift()

      statement.condition = ParseExpression({tokens})
      if (tokens[0].symbol != ')') {
        throw ParserError(tokens[arg_start], `Expected ')' at the end of ${type} condition`)
      }
      tokens.shift()

      statement.body = ParseBlock({ tokens, parent: environment })
      environment.statements.push(statement)
    }

    // Else and Else If
    else if (tokens[0].symbol == 'else') {
      tokens.shift()
      let statement = {}
      if (tokens[0].symbol == 'if') {
        statement.statement = 'ELSE_IF'
        tokens.shift()

        if (tokens[0].symbol != '(') {
          throw ParserError(tokens[0], `Expected '(' at the start of if condition`)
        }
        tokens.shift()
  
        statement.condition = ParseExpression({tokens})
        if (tokens[0].symbol != ')') {
          throw ParserError(tokens[arg_start], `Expected ')' at the end of if condition`)
        }
        tokens.shift()
      }
      else {
        statement.statement = 'ELSE'
      }

      statement.body = ParseBlock({ tokens, parent: environment })
      environment.statements.push(statement)
    }

    // For
    else if (tokens[0].symbol == 'for') {
      let statement = { statement: 'FOR' }
      tokens.shift()

      if (tokens[0].symbol != '(') {
        throw ParserError(tokens[0], `Expected '(' at the start of for loop arguments`)
      }
      tokens.shift()

      if (tokens[0].type != 'IDENTIFIER') {
        throw ParserError(tokens[0], `Expected valid identifier for loop iterator`)
      }
      statement.variable = tokens[0].symbol
      tokens.shift()

      if (tokens[0].symbol != 'in') {
        throw ParserError(tokens[arg_start], `Expected keyword 'in'`)
      }
      tokens.shift()
  
      statement.in = ParseExpression({tokens})

      if (tokens[0].symbol != ')') {
        throw ParserError(tokens[arg_start], `Expected ')' at the end of for loop arguments`)
      }
      tokens.shift()

      statement.body = ParseBlock({ tokens, parent: environment, args: [statement.variable] })
      environment.statements.push(statement)
    }

    // Single Statements
    else if (tokens[0].type == 'IDENTIFIER') {
      let statement = ParseStatement({tokens})
      environment.statements.push(statement)
    }

    // Return Statements
    else if (tokens[0].symbol == 'return') {
      tokens.shift()
      let expression = ParseExpression({tokens})
      environment.statements.push({
        statement: 'RETURN',
        expression
      })
      if (tokens[0].symbol != ';') {
        throw ParserError(tokens[0], `Expected ';' at end of statement`)
      }
      tokens.shift()
    }

    // Yield Statements
    else if (tokens[0].symbol == 'yield') {
      tokens.shift()
      if (tokens[0].symbol != ';') {
        throw ParserError(tokens[0], `Expected ';' at end of statement`)
      }
      tokens.shift()
    }

    else {
      return environment
    }
  }
}

function ParseTerm({tokens}) {
  // Numbers
  if (tokens[0].type == 'NUMBER') {
    let term = {
      type : '<Number>',
      value : Number(tokens[0].symbol)
    }
    tokens.shift()
    return term
  }
  // Booleans
  else if (tokens[0].symbol == 'true' || tokens[0].symbol == 'false') {
    let term = {
      type : '<Boolean>',
      value : tokens[0].symbol == 'true' ? true : false
    }
    tokens.shift()
    return term
  }
  // Strings
  else if (tokens[0].type == 'STRING') {
    let term = {
      type : '<String>',
      value : tokens[0].symbol.slice(1,-1)
    }
    tokens.shift()
    return term
  }
  // Identifiers
  else if (tokens[0].type == 'IDENTIFIER') {
    let term = {
      variable : tokens[0].symbol
    }
    tokens.shift()
    return term
  }
  // Arrays
  else if (tokens[0].symbol == '[') {
    let array = []
    while (tokens[0].symbol != ']') {
      tokens.shift()
      if (tokens[0].symbol == ']') {
        break
      }
      array.push(ParseExpression({tokens}))
      if (tokens[0].symbol == ';') {
        throw ParserError(tokens[0], `No matching ']' found in array initializer`)
      }
      if (tokens[0].symbol != ']' && tokens[0].symbol != ',' ) {
        throw ParserError(tokens[0], `Invalid expression in array initializer. Are you missing a ','?`)
      }
    }
    tokens.shift()
    let term = {
      init : '[]',
      type : '<Array>',
      value : array
    }
    return term
  }
  // Objects
  else if (tokens[0].symbol == '{') {
    let obj = {}
    while (tokens[0].symbol != '}') {
      tokens.shift()
      if (tokens[0].symbol == '}') {
        break
      }
      if (tokens[0].type != 'IDENTIFIER') {
        throw ParserError(tokens[0], `Not a valid name for object property`)
      }
      let key = tokens[0].symbol
      tokens.shift()
      if (tokens[0].symbol != ':') {
        throw ParserError(tokens[0], `Expected ':'`)
      }
      tokens.shift()
      obj[key] = ParseExpression({tokens})
      if (tokens[0].symbol != '}' && tokens[0].symbol != ',' ) {
        throw ParserError(tokens[0], `Invalid expression in object initializer. Are you missing a ','?`)
      }
    }
    tokens.shift()
    let term = {
      init : '{}',
      type : '<Object>',
      value : obj
    }
    return term
  }
  // Nested Expressions
  else if (tokens[0].symbol == '(') {
    let start_parentheses = tokens[0]
    tokens.shift()
    let term = ParseExpression({tokens})
    if (tokens[0].symbol != ')') {
      throw ParserError(start_parentheses, `No matching ')' found in expression term`)
    }
    tokens.shift()
    return term
  }
  // Just in case
  else {
    throw ParserError(tokens[0], `Invalid expression term`)
  }
}

function ParseSuffix({tokens}) {
  let left = ParseTerm({tokens})
  while(tokens[0].symbol == '.' || tokens[0].symbol == '(' || tokens[0].symbol == '[') {
    let operation = tokens[0].symbol
    let line = tokens[0].line

    // Dot Access
    if (operation == '.') {
      tokens.shift()
      if (tokens[0].type != 'IDENTIFIER') {
        throw ParserError(tokens[0], `Object access expected a valid identifier`)
      }
      let op = {
        line,
        left,
        operation,
        right : {
          type : '<String>',
          value : tokens[0].symbol
        }
      }
      left = op
      tokens.shift()
    }
    // Arraylike Access
    else if (operation == '[') {
      operation = '[]'
      tokens.shift()
      let op = {
        line,
        left,
        operation,
        right : ParseExpression({tokens})
      }
      left = op
      if (tokens[0].symbol != ']') {
        throw ParserError(tokens[0], `Arraylike access expected a valid expression. Are you missing a ']'?`)
      }
      tokens.shift()
    }
    // Function Call
    else if (operation == '(') {
      operation = '()'
      tokens.shift()
      let args = []

      while (tokens[0].symbol != ')') {
        args.push(ParseExpression({tokens}))
        if (tokens[0].symbol == ',') {
          tokens.shift()
        }
        else if (tokens[0].symbol == ')') {
          break;
        }
        else {
          throw ParserError(tokens[0], `Function call expected a valid expression. Are you missing a ')' or ','?`)
        }
      }
      tokens.shift()

      let op = {
        line,
        left,
        operation,
        args
      }
      left = op
    }
  }
  return left
}

function ParsePrefix({tokens}) {
  if(tokens[0].symbol == '-' || tokens[0].symbol == '!' || tokens[0].symbol == '|') {
    let operation = tokens[0].symbol
    let line = tokens[0].line
    tokens.shift()
    let op = {
      line,
      operation,
      right : ParsePrefix({tokens})
    }
    return op
  }
  else {
    return ParseSuffix({tokens})
  }
}

function ParsePower({tokens}) {
  let left = ParsePrefix({tokens})
  if(tokens[0].symbol == '^') {
    let operation = tokens[0].symbol
    let line = tokens[0].line
    tokens.shift()
    let op = {
      line,
      left,
      operation,
      right : ParsePower({tokens})
    }
    return op
  }
  else {
    return left
  }
}

function ParseProduct({tokens}) {
  let left = ParsePower({tokens})
  while(tokens[0].symbol == '*' || tokens[0].symbol == '/' || tokens[0].symbol == '%') {
    let operation = tokens[0].symbol
    let line = tokens[0].line
    tokens.shift()
    let op = {
      line,
      left,
      operation,
      right : ParsePower({tokens})
    }
    left = op
  }
  return left
}

function ParseSum({tokens}) {
  let left = ParseProduct({tokens})
  while(tokens[0].symbol == '+' || tokens[0].symbol == '-') {
    let operation = tokens[0].symbol
    let line = tokens[0].line
    tokens.shift()
    let op = {
      line,
      left,
      operation,
      right : ParseProduct({tokens})
    }
    left = op
  }
  return left
}

function ParseUnion({tokens}) {
  let left = ParseSum({tokens})
  while(tokens[0].symbol == ':') {
    let operation = tokens[0].symbol
    let line = tokens[0].line
    tokens.shift()
    let op = {
      line,
      left,
      operation,
      right : ParseSum({tokens})
    }
    left = op
  }
  return left
}

function ParseTypeOf({tokens}) {
  let left = ParseUnion({tokens})
  while(tokens[0].symbol == '&') {
    let operation = tokens[0].symbol
    let line = tokens[0].line
    tokens.shift()
    let op = {
      line,
      left,
      operation,
      right : ParseUnion({tokens})
    }
    left = op
  }
  return left
}

function ParseRange({tokens}) {
  let left = ParseTypeOf({tokens})
  while(tokens[0].symbol == '..') {
    let operation = tokens[0].symbol
    let line = tokens[0].line
    tokens.shift()
    let op = {
      line,
      left,
      operation,
      right : ParseTypeOf({tokens})
    }
    left = op
  }
  return left
}

function ParseComparison({tokens}) {
  let left = ParseRange({tokens})
  while(tokens[0].symbol == '<' || tokens[0].symbol == '>' || tokens[0].symbol == '<=' || tokens[0].symbol == '>=') {
    let operation = tokens[0].symbol
    let line = tokens[0].line
    tokens.shift()
    let op = {
      line,
      left,
      operation,
      right : ParseRange({tokens})
    }
    left = op
  }
  return left
}

function ParseEquality({tokens}) {
  let left = ParseComparison({tokens})
  while(tokens[0].symbol == '==' || tokens[0].symbol == '!=') {
    let operation = tokens[0].symbol
    let line = tokens[0].line
    tokens.shift()
    let op = {
      line,
      left,
      operation,
      right : ParseComparison({tokens})
    }
    left = op
  }
  return left
}

function ParseLogicAnd({tokens}) {
  let left = ParseEquality({tokens})
  while(tokens[0].symbol == '&&') {
    let operation = tokens[0].symbol
    let line = tokens[0].line
    tokens.shift()
    let op = {
      line,
      left,
      operation,
      right : ParseEquality({tokens})
    }
    left = op
  }
  return left
}

function ParseLogicOr({tokens}) {
  let left = ParseLogicAnd({tokens})
  while(tokens[0].symbol == '||') {
    let operation = tokens[0].symbol
    let line = tokens[0].line
    tokens.shift()
    let op = {
      line,
      left,
      operation,
      right : ParseLogicAnd({tokens})
    }
    left = op
  }
  return left
}

function ParseStringer({tokens}) {
  let left = ParseLogicOr({tokens})
  while(tokens[0].symbol == '~') {
    let operation = tokens[0].symbol
    let line = tokens[0].line
    tokens.shift()
    let op = {
      line,
      left,
      operation,
      right : ParseLogicOr({tokens})
    }
    left = op
  }
  return left
}

function ParseGate({tokens}) {
  let left = ParseStringer({tokens})
  while(tokens[0].symbol == '?' || tokens[0].symbol == '\\' ) {
    let operation = tokens[0].symbol
    let line = tokens[0].line
    tokens.shift()
    let op = {
      line,
      left,
      operation,
      right : ParseStringer({tokens})
    }
    left = op
  }
  return left
}

function ParseExpression({tokens}) {
  return ParseGate({tokens})
}

function ParseStatement({tokens}) {
  let left = ParseExpression({tokens})
  if (tokens[0].type == 'ASSIGN') {
    let operation = tokens[0].symbol
    let line = tokens[0].line
    tokens.shift()
    let op = {
      line,
      left,
      operation,
      right : ParseExpression({tokens})
    }
    left = op
  }
  if (tokens[0].symbol != ';') {
    throw ParserError(tokens[0], `Expected ';' at end of statement`)
  }
  tokens.shift()
  return {
    statement: 'EXPRESSION',
    expression: left
  }
}

function ParseBlock({tokens,parent,args}) {
  if (tokens[0].symbol != '{') {
    throw ParserError(tokens[0], `Expected '{' at start of code block`)
  }
  tokens.shift()
  let env = ParseEnvironment({tokens,parent,args})
  if (tokens[0].symbol != '}') {
    throw ParserError(tokens[0], `Expected '}' at end of code block`)
  }
  tokens.shift()
  return env
}

let AST
try {
  AST = ParseEnvironment({ tokens: token_list })
  if (token_list[0].type != 'EOF') {
    throw ParserError(token_list[0], `Invalid statement`)
  }
}
catch (e) {
  console.error(e)
}

/////////////////////////////
//  I N T E R P R E T E R  //
/////////////////////////////

let stack = []
let env = AST

stack.push_environment = (env, args = {}) => {
  let new_env = {
    scope : {
      parent: env.scope.parent,
      vars: JSON.parse(JSON.origStringify(env.scope.vars))
    },
    statements : JSON.parse(JSON.origStringify(env.statements))
  }
  for (let key in args) {
    new_env.scope.vars[key] = args[key]
  }
  stack.push(new_env)
}

stack.push(env)

function TypeError(line, message) {
  return `TypeError at Line ${line} - ${message}`
}

function search(variable) {
  let scope = env.scope
  while (scope != null) {
    if (scope.vars[variable]) {
      return scope.vars[variable]
    }
    else {
      scope = scope.parent
    }
  }
  throw `"${variable}" is undefined`
}

function interpret(stack) {
  let top = stack[stack.length - 1]

  // Advance to next statement
  if (top.statements != null) {
    env = top
    if (top.statements[0]) {
      stack.push(top.statements[0])
      top.statements.shift()
    }
    else {
      stack.pop()
    }
  }

  // Loop
  else if (top.statement == 'LOOP') {
    stack.push_environment(top.body)
  }

  // N Loop
  else if (top.statement == 'NLOOP') {
    if (top.times.variable) {
      top.times = search(top.times.variable)
    }
    if (!top.times.hasOwnProperty('value') || top.times.init) {
      stack.push(top.times)
    }
    else if (top.remaining == null) {
      top.remaining = Math.round(top.times.value)
    }
    else if (top.remaining) {
      stack.push_environment(top.body)
      --top.remaining
    }
    else {
      stack.pop()
    }
  }

  // While
  else if (top.statement == 'WHILE') {
    if (top.eval == null) {
      top.eval = JSON.parse(JSON.origStringify(top.condition))
    }
    if (top.eval.variable) {
      top.eval = search(top.eval.variable)
    }
    if (top.eval.hasOwnProperty('value') && !top.eval.init) {
      if (top.eval.value) {
        stack.push_environment(top.body)
        top.eval = null
      }
      else {
        stack.pop()
      }
    }
    else {
      stack.push(top.eval)
    }
  }

  // For
  else if (top.statement == 'FOR') {
    if (top.in.variable) {
      top.in = search(top.in.variable)
    }
    if (!top.in.hasOwnProperty('value') || top.in.init) {
      stack.push(top.in)
    }
    else if (top.at == null) {
      top.at = 0
    }
    else if (top.at < top.in.value.length) {
      let args = {}
      if (top.in.type == '<Array>') {
        args[top.variable] = {
          type: top.in.value[top.at].type,
          value: top.in.value[top.at].value
        }
      }
      else if (top.in.type == '<String>') {
        args[top.variable] = {
          type: '<String>',
          value: top.in.value[top.at]
        }
      }
      stack.push_environment(top.body,args)
      ++top.at
    }
    else {
      stack.pop()
    }
  }

  // Expressions
  else if (top.statement == 'EXPRESSION') {
    stack.pop()
    stack.push(top.expression)
  }
  // Traverse Left
  else if (top.left && (top.left.operation || top.left.init)) {
    stack.push(top.left)
  }
  // Leftside Variables
  else if (top.left && top.left.variable) {
    top.left = search(top.left.variable)
  }
  // Leftside Pointers
  else if (top.left && top.left.type == '<Pointer>') {
    top.left = top.left.value
  }

  // Truth Gate
  else if (top.operation == '?' && !top.left.value) {
    top.type = '<Empty>'
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Catch Gate
  else if (top.operation == '\\' && !!top.left.value) {
    top.type = top.left.type
    top.value = top.left.value
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Traverse Right
  else if (top.right && (top.right.operation || top.right.init)) {
    stack.push(top.right)
  }
  // Rightside Variables
  else if (top.right && top.right.variable) {
    top.right = search(top.right.variable)
  }
  // Rightside Pointers
  else if (top.right && top.right.type == '<Pointer>') {
    top.right = top.right.value
  }

  // Traverse Arrays
  else if (top.init == '[]') {
    if (top.at == null) {
      top.at = 0
    }
    else {
      top.at++
    }
    if (top.at < top.value.length) {
      let item = top.value[top.at]
      if (item.variable) {
        top.value[top.at] = search(item.variable)
      }
      if (item.operation || item.init) {
        stack.push(item)
      }
    }
    else {
      delete top.init
      delete top.at
      stack.pop()
    }
  }

  // Traverse Objects
  else if (top.init == '{}') {
    if (top.remaining == null) {
      top.remaining = Object.keys(top.value)
    }
    if (top.remaining.length) {
      let item = top.value[top.remaining[0]]
      if (item.variable) {
        top.value[top.remaining[0]] = search(item.variable)
      }
      if (item.operation || item.init) {
        stack.push(item)
      }
      top.remaining.shift()
    }
    else {
      delete top.init
      delete top.remaining
      stack.pop()
    }
  }

  // Passed Gates
  else if (top.operation == '\\' || top.operation == '?') {
    top.type = top.right.type
    top.value = top.right.value
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Skip Empty Assignments
  else if (top.right && top.right.type == '<Empty>') {
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  //
  // Operations

  // Dot Access
  else if (top.operation == '.') {
    top.type  = '<Pointer>'
    top.value = top.left.value[top.right.value]
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Arraylike Access
  else if (top.operation == '[]') {
    let left = top.left
    let right = top.right
    // Arrays
    if (left.type == '<Array>') {
      // Numerical Indexing
      if (right.type == '<Number>') {
        let index = Math.round(right.value)
        top.type  = '<Pointer>'
        top.value = left.value[index]
      }
      // Slice Indexing
      else if (right.type == '<Array>') {
        let slice = []
        for (let key of right.value) {
          if (key.type == '<Number>') {
            let index = Math.round(key.value)
            slice.push(left.value[index])
          }
        }
        top.type = '<Array>'
        top.value = slice
      }
    }
    // Strings
    else if (left.type == '<String>') {
      // Numerical Indexing
      if (right.type == '<Number>') {
        let index = Math.round(right.value)
        top.type  = '<String>'
        top.value = left.value[index]
      }
      // Slice Indexing
      else if (right.type == '<Array>') {
        let slice = ''
        for (let key of right.value) {
          if (key.type == '<Number>') {
            let index = Math.round(key.value)
            slice += left.value[index]
          }
        }
        top.type = '<String>'
        top.value = slice
      }
    }
    else if (left.type == '<Object>') {
      // String Access
      if (right.type == '<String>') {
        top.type  = '<Pointer>'
        top.value = left.value[right.value]
      }
    }
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // TODO: Function Call

  // Negative
  else if (top.operation == '-' && !top.left) {
    top.type  = '<Number>'
    top.value = -top.right.value
    delete top.operation
    delete top.line
    delete top.right
    stack.pop()
  }

  // Not
  else if (top.operation == '!') {
    top.type  = '<Boolean>'
    top.value = !top.right.value
    delete top.operation
    delete top.line
    delete top.right
    stack.pop()
  }

  // Absolute
  else if (top.operation == '|') {
    top.type  = '<Number>'
    top.value = Math.abs(top.right.value)
    delete top.operation
    delete top.line
    delete top.right
    stack.pop()
  }

  // Power
  else if (top.operation == '^') {
    top.type  = '<Number>'
    top.value = Math.pow(top.left.value, top.right.value)
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Multiply
  else if (top.operation == '*') {
    top.type  = '<Number>'
    top.value = top.left.value * top.right.value
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Divide
  else if (top.operation == '/') {
    top.type  = '<Number>'
    top.value = top.left.value / top.right.value
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Remainder
  else if (top.operation == '%') {
    top.type  = '<Number>'
    top.value = top.left.value % top.right.value
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Add
  else if (top.operation == '+') {
    top.type  = '<Number>'
    top.value = top.left.value + top.right.value
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Subtract
  else if (top.operation == '-') {
    top.type  = '<Number>'
    top.value = top.left.value - top.right.value
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Union
  else if (top.operation == ':') {
    top.type = '<Object>'
    top.value = {}
    let left = top.left.value
    let right = top.right.value
    for(let key in left) {
      top.value[key] = left[key]
    }
    for(let key in right) {
      top.value[key] = right[key]
    }
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Range
  else if (top.operation == '..') {
    top.type = '<Array>'
    top.value = []
    let left = Math.round(top.left.value)
    let right = Math.round(top.right.value)
    if (left <= right) {
      for(let i = left; i <= right; ++i) {
        top.value.push({
          type: '<Number>',
          value : i
        })
      }
    }
    else {
      for(let i = right; i >= left; --i) {
        top.value.push({
          type: '<Number>',
          value : i
        })
      }
    }
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Less Than
  else if (top.operation == '<') {
    top.type  = '<Boolean>'
    top.value = top.left.value < top.right.value
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Greater Than
  else if (top.operation == '>') {
    top.type  = '<Boolean>'
    top.value = top.left.value > top.right.value
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Less Equals
  else if (top.operation == '<=') {
    top.type  = '<Boolean>'
    top.value = top.left.value <= top.right.value
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Greater Equals
  else if (top.operation == '>=') {
    top.type  = '<Boolean>'
    top.value = top.left.value >= top.right.value
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Equality
  else if (top.operation == '==') {
    top.type  = '<Boolean>'
    top.value = top.left.value == top.right.value
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Inequality
  else if (top.operation == '!=') {
    top.type  = '<Boolean>'
    top.value = top.left.value != top.right.value
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // And
  else if (top.operation == '&&') {
    top.type  = '<Boolean>'
    top.value = top.left.value && top.right.value
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Or
  else if (top.operation == '||') {
    top.type  = '<Boolean>'
    top.value = top.left.value || top.right.value
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Stringer
  else if (top.operation == '~') {
    if (top.left.type == '<Array>' && top.right.type == '<Array>') {
      top.type  = '<Array>'
      top.value = top.left.value.concat(top.right.value)
    }
    else if (top.left.type == '<Array>') {
      top.type  = '<Array>'
      top.value = top.left.value
      top.value.push(top.right)
    }
    else {
      top.type  = '<String>'
      top.value = '' + top.left.value + top.right.value
    }
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Assign
  else if (top.operation == '=') {
    top.left.type = top.right.type == '<Undefined>' ? top.left.type : top.right.type
    top.left.value = top.right.value
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Power Assign
  else if (top.operation == '^=') {
    top.left.value = Math.pow(top.left.value,top.right.value)
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Multiply Assign
  else if (top.operation == '*=') {
    top.left.value *= top.right.value
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Divide Assign
  else if (top.operation == '/=') {
    top.left.value /= top.right.value
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Remainder Assign
  else if (top.operation == '%=') {
    top.left.value %= top.right.value
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Add Assign
  else if (top.operation == '+=') {
    top.left.value += top.right.value
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Subtract Assign
  else if (top.operation == '-=') {
    top.left.value -= top.right.value
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Union Assign
  else if (top.operation == ':=') {
    let left = top.left.value
    let right = top.right.value
    for (let key in right) {
      left[key] = right[key]
    }
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Stringer Assign
  else if (top.operation == '~=') {
    if (top.left.type == '<Array>' && top.right.type == '<Array>') {
      top.left.value = top.left.value.concat(top.right.value)
    }
    else if (top.left.type == '<Array>') {
      top.left.value.push(top.right)
    }
    else if (top.left.value == '<String>') {
      top.left.value += top.right.value
    }
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Optional Assign
  else if (top.operation == '?=') {
    if (!!top.right.value) {
      top.left.type = top.right.type
      top.left.value = top.right.value
    }
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Set if false
  else if (top.operation == '\=') {
    if (!top.left.value) {
      top.left.type = top.right.type
      top.left.value = top.right.value
    }
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

}

const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('line', (input) => {
  interpret(stack)
  console.log(JSON.stringify(stack, null, 3))
})