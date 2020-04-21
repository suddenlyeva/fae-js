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
      symbol : '\\\\=',
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
      'true',
      'false',
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

function ParseEnvironment({tokens,parent,args}) {

  let environment = {}

  let vars = {}

  if (args) {
    for (let arg of args) {
      vars[arg] = { type: '<Undefined>' }
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
      vars[tokens[t].symbol] = { type: '<Undefined>' }
    }
    // Single statements
    else if (tokens[t].type == 'IDENTIFIER' || tokens[t].symbol == 'return') {
      let statement_start = t
      let assignment_index = null
      let is_return = tokens[t].symbol == 'return'

      // Look ahead for statement type and end
      while (tokens[t].symbol != ';') {
        if (tokens[t].type == 'ASSIGN') {
          if (assignment_index !== null) {
            throw ParserError(tokens[t], `Unexpected multiple assignments found in statement. Are you missing a ';'?`)
          }
          assignment_index = t
        }
        ++t
        if (!tokens[t]) {
          throw ParserError(tokens[statement_start], `Unexpected end of file in statement. Are you missing a ';'?`)
        }
      }

      // Return Statements 
      if (is_return) {
        let statement = {
          statement : 'RETURN',
          expression : ParseExpression({ tokens: tokens.slice(statement_start + 1, t - statement_start) })
        }
        environment.statements.push(statement)
        ++t
      }
      // Assignment Statements
      else if(assignment_index) {
        let assignment = {
          statement : 'ASSIGN',
          variable : ParseExpression({ tokens: tokens.slice(statement_start, assignment_index + 1) }),
          operator : tokens[assignment_index].symbol,
          expression : ParseExpression({ tokens: tokens.slice(assignment_index + 1, t + 1) })
        }
        environment.statements.push(assignment)
        ++t
      }
      // Normal Expressions
      else {
        let expression = {
          statement : 'EXPRESSION',
          expression : ParseExpression({ tokens: tokens.slice(statement_start, t - statement_start) })
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
    return { type : '<Invalid>' }
  }
}

function ParseSuffix({tokens}) {
  let left = ParseTerm({tokens})
  while(tokens[0].symbol == '.' || tokens[0].symbol == '(' || tokens[0].symbol == '[') {
    let operation = tokens[0].symbol

    // Dot Access
    if (operation == '.') {
      tokens.shift()
      if (tokens[0].type != 'IDENTIFIER') {
        throw ParserError(tokens[0], `Object access expected a valid identifier`)
      }
      let op = {
        left,
        operation,
        key : {
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
        left,
        operation,
        key : ParseExpression({tokens})
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
          tokens.shift()
          break;
        }
        else {
          throw ParserError(tokens[0], `Function call expected a valid expression. Are you missing a ')' or ','?`)
        }
      }

      let op = {
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
    tokens.shift()
    let op = {
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
    tokens.shift()
    let op = {
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
    tokens.shift()
    let op = {
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
    tokens.shift()
    let op = {
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
    tokens.shift()
    let op = {
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
    tokens.shift()
    let op = {
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
    tokens.shift()
    let op = {
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
    tokens.shift()
    let op = {
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
    tokens.shift()
    let op = {
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
    tokens.shift()
    let op = {
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
    tokens.shift()
    let op = {
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
    tokens.shift()
    let op = {
      left,
      operation,
      right : ParseLogicOr({tokens})
    }
    left = op
  }
  return left
}

function ParseConditionals({tokens}) {
  let left = ParseStringer({tokens})
  while(tokens[0].symbol == '?' || tokens[0].symbol == '\\' ) {
    let operation = tokens[0].symbol
    tokens.shift()
    let op = {
      left,
      operation,
      right : ParseStringer({tokens})
    }
    left = op
  }
  return left
}

function ParseExpression({tokens}) {
  return ParseConditionals({tokens})
}

try {
  let AST = ParseEnvironment({ tokens: token_list })
  console.log(JSON.stringify(AST, null, '   '))
}
catch (e) {
  console.error(e)
}