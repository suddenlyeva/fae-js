var fs = require('fs')
require("json-circular-stringify");

var src = fs.readFileSync('test.fae', 'utf8')

function isLetter(c) {
  return c.toLowerCase() != c.toUpperCase()
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
    next()
    while(src[cur] != '"') {
      if (!src[cur] || src[cur] == '\n' ) {
        throw Error(`At Line ${lineinfo} - End of string not found`)
      }
      if (src[cur] == '\\') {
        next()
        if (src[cur] == '"') {
          symbol += src[cur]
          next()
        }
        else if (src[cur] == 'n') {
          symbol += '\n'
          next()
        }
        else if (src[cur] == 't') {
          symbol += '\t'
          next()
        }
        else {
          throw Error(`At Line ${lineinfo} - Invalid escape character.`)
        }
      }
      else {
        symbol += src[cur]
        next()
      }
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

function ParseEnvironment({tokens,args}) {

  let environment = {}
  let vars = args

  environment.vars = vars
  environment.statements = []

  //
  // Function Look-Ahead
  let t = 0
  while (t < tokens.length) {
    // Function and Task Declarations
    if (tokens[t].symbol == 'function' || tokens[t].symbol == 'task') {
      let extension = ''
      let func_start = tokens[t]
      let type = tokens[t].symbol == 'function' ? 'FUNCTION' : 'TASK'
      ++t
      if (tokens[t].symbol == '<') {
        ++t
        if (tokens[t].type != 'IDENTIFIER' && tokens[t].symbol != '*') {
          throw ParserError(tokens[t], 'Expected a valid type identifier')
        }
        extension = `<${tokens[t].symbol}>`
        ++t
        if (tokens[t].symbol != '>') {
          throw ParserError(tokens[t], `Expected '>'`)
        }
        ++t
      }
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
      let passed_args = {}
      for (let arg of func.args) {
        passed_args[arg] = {
          type: '<Undefined>',
          value: null
        }
      }
      func.body = ParseEnvironment({
        tokens: func_tokens, 
        args: passed_args
      })
      if (type == 'TASK') {
        func.body.running = {
            type : '<Boolean>',
            value : true
        }
      }
      if (extension) {
        if (!vars[extension]) {
          vars[extension] = {}
        }
        vars[extension][id] = func
      }
      else {
        vars[id] = func
      }
      let start_id = tokens.indexOf(func_start)
      tokens.splice(start_id, t - start_id)
      t = start_id
    }
    else if (tokens[t].symbol == '{') {
      ++t
      let depth = 1
      while (depth > 0) {
        if (tokens[t].symbol == '{') {
          ++depth
        }
        if (tokens[t].symbol == '}') {
          --depth
        }
        ++t
      }
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
      loop.body = ParseBlock({tokens})
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

      statement.body = ParseBlock({tokens})
      environment.statements.push(statement)
    }

    // Else and Else If
    else if (tokens[0].symbol == 'else') {
      let top = environment.statements[environment.statements.length - 1]
      while (top.else) {
        top = top.else
      }
      if (top.statement != 'IF' && top.statement != 'ELIF') {
        throw ParserError(tokens[0], `Else statement does not follow if block`)
      }
      tokens.shift()
      let statement = {}
      if (tokens[0].symbol == 'if') {
        statement.statement = 'ELIF'
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

      statement.body = ParseBlock({tokens})
      top.else = statement
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

      let args = {}
      args[statement.variable] = {
        type: '<Undefined>',
        value: null
      }

      statement.body = ParseBlock({ tokens, args })
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
      environment.statements.push({
        statement: 'YIELD'
      })
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
  // Type Constructors
  else if (tokens[0].symbol == '<') {
    let polytype = []
    let term
    while (tokens[0].symbol != '>') {
      tokens.shift()
      if (tokens[0].type != 'IDENTIFIER') {
        throw ParserError(tokens[0], `Expected a valid identifier in type constructor`)
      }
      if (['Number','String','Boolean','Array'].includes(tokens[0].symbol)) {
        term = {
          type: `<${tokens[0].symbol}>`,
          value: 
            tokens[0].symbol == 'Number' ? 0 :
            tokens[0].symbol == 'String' ? '' :
            tokens[0].symbol == 'Boolean' ? false :
            []
        }
        tokens.shift()
        if (tokens[0].symbol == ',' ) {
          throw ParserError(tokens[0], `Primitives can't be used in a union type constructor.`)
        }
        if (tokens[0].symbol != '>') {
          throw ParserError(tokens[0], ` Expected '>' in type constructor.`)
        }
        break
      }
      polytype.push(tokens[0].symbol)
      tokens.shift()
      if (tokens[0].symbol != '>' && tokens[0].symbol != ',' ) {
        throw ParserError(tokens[0], `Expected '>' or ',' in type constructor.`)
      }
    }
    tokens.shift()
    if (polytype.length) {
      term = {
        init: '<>',
        type: '<Object>',
        polytype,
        value: {}
      }
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
  while(tokens[0].symbol == '.' || tokens[0].symbol == '(' || tokens[0].symbol == '[' || tokens[0].symbol == '<') {
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
      if (tokens[0].symbol == '(') {
        op.operation = '.extension'
      }
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
    // Typecast
    else if (operation == '<') {
      if (tokens[1].type == 'IDENTIFIER' 
      && tokens[2] && (tokens[2].symbol == '>' || tokens[2].symbol == ',')) {
        operation = '<>'
        let single = tokens[2].symbol == '>'
        let right = ParseTerm({tokens})
        let op = {
          line,
          left,
          operation,
          single,
          right
        }
        left = op
      }
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

function ParseRange({tokens}) {
  let left = ParseUnion({tokens})
  while(tokens[0].symbol == '..') {
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

function ParseComparison({tokens}) {
  let left = ParseRange({tokens})
  if(tokens[0].symbol == '<' || tokens[0].symbol == '>' || tokens[0].symbol == '<=' || tokens[0].symbol == '>=') {
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
  if(tokens[0].symbol == '==' || tokens[0].symbol == '!=' || tokens[0].symbol == '&' ) {
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

function ParseBlock({tokens,args}) {
  if (tokens[0].symbol != '{') {
    throw ParserError(tokens[0], `Expected '{' at start of code block`)
  }
  tokens.shift()
  let env = ParseEnvironment({tokens,args})
  if (tokens[0].symbol != '}') {
    throw ParserError(tokens[0], `Expected '}' at end of code block`)
  }
  tokens.shift()
  return env
}

///////////////////////////////////////
//  S T A N D A R D   L I B R A R Y  //
///////////////////////////////////////

let std = {
  print: {
    native(thing) {
      if (thing.type == '<Object>') {
        process.stdout.write(JSON.stringify(thing, null, 2))
      }
      else {
        process.stdout.write(thing.value.toString())
      }
      return { type: '<Void>' }
    }
  },
  Object: {
    type: '<Object>',
    value: {}
  }
}

std['<Number>'] = {
  String: {
    native(number) {
      return {
        type: '<String>',
        value: number.value.toString()
      }
    }
  },
  Boolean: {
    native(number) {
      return {
        type: '<Boolean>',
        value: number.value !== 0
      }
    }
  }
}

std['<String>'] = {
  Boolean: {
    native(string) {
      return {
        type: '<Boolean>',
        value: string.value !== ''
      }
    }
  },
  String: {
    native(string) {
      return string
    }
  },
}

std['<Array>'] = {
  Boolean: {
    native(array) {
      return {
        type: '<Boolean>',
        value: array.value.length !== 0
      }
    }
  },
  contains: {
    native(array, item) {
      return {
        type: '<Boolean>',
        value: !!array.value.find(i => i.value === item.value)
      }
    }
  }
}

std['<Object>'] = {
  Boolean: {
    native(object) {
      return {
        type: '<Boolean>',
        value: Object.keys(object.value).length !== 0
      }
    }
  },
  String: {
    native(object) {
      return {
        type: '<String>',
        value: JSON.stringify(object, null, 2)
      }
    }
  },
  keys: {
    native(object) {
      let keys = []
      for (let key of Object.keys(object.value)) {
        keys.push({
          type: '<String>',
          value: key
        })
      }
      return {
        type: '<Array>',
        value: keys
      }
    }
  }
}

std['<*>'] = {
  type: {
    native(any) {
      return {
        type: '<String>',
        value: any.type
      }
    }
  },
}

let AST
try {
  AST = ParseEnvironment({ tokens: token_list, args: std })
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

let env = AST

function create_stack(env) {
  let stack = []
  
  stack.push_environment = (pushed_env, args = {}) => {
    // let statements = []
    // for (let statement of env.statements) {
    //   let new_statement = {}
    //   for (let key of Object.keys(statement)) {
    //     if (key == 'body' || key == 'else') {
    //       new_statement[key] = statement[key]
    //     }
    //     else {
    //       new_statement[key] = JSON.parse(JSON.origStringify(statement[key]))
    //     }
    //   }
    //   statements.push(new_statement)
    // }
    // let new_env = {
    //   scope : env.scope,
    //   statements,
    //   running : env.running
    // }
    // new_env.scope.vars = {}
    // for (let key in env.scope.vars) {
    //   if (env.scope.vars[key].hasOwnProperty('value')) {
    //     new_env.scope.vars[key] = JSON.parse(JSON.origStringify(env.scope.vars[key]))
    //   }
    //   else {
    //     new_env.scope.vars[key] = env.scope.vars[key]
    //   }
    // }
    let new_env = JSON.parse(JSON.origStringify(pushed_env))
    for (let key in args) {
      new_env.vars[key] = args[key]
    }
    new_env.parent = env
    env = new_env
    stack.push(new_env)
    return new_env
  }

  if (env) stack.push(env)
  return stack
}

let machine = {
  threads : [create_stack(env)],
  at : 0
}

machine.create_thread = (env, args = {}) => {
  let new_stack = create_stack()
  new_stack.push_environment(env,args)
  machine.at++
  machine.threads.splice(machine.at,0,new_stack)
}

machine.advance = () => {
  while (machine.at >= 0) {
    while(interpret(machine.threads[machine.at])) {}
    if (!machine.threads[machine.at].length) {
      machine.threads.splice(machine.at,1)
    }
    machine.at--
  }

  machine.at = machine.threads.length - 1
}

// machine.advance = () => {
//   if (machine.at >= 0) {
//     if(!interpret(machine.threads[machine.at])) {
//       if (!machine.threads[machine.at].length) {
//         machine.threads.splice(machine.at,1)
//       }
//       machine.at--
//     }
//   }
//   else {
//     machine.at = machine.threads.length - 1
//   }
// }

function TypeError(line, message) {
  return `TypeError at Line ${line} - ${message}`
}
    
function same_type(left, right) {
  if (left.type != right.type) {
    return false
  }
  if (left.type == '<Object>') {
    if (Object.keys(right.value).length === 0) {
      return true
    }
    for (let key in right.value) {
      if (!left.value[key]) {
        return false
      }
      if (!same_type(left.value[key],right.value[key])) {
        return false
      }
    }
  }
  return true
}

function search(variable) {
  let scope = env
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

function try_search(variable,{type,polytype}) {
  let scope = env
  while (scope != null) {
    if (type) {
      if (polytype) {
        for (let t of polytype) {
          if (scope.vars[`<${t}>`] && scope.vars[`<${t}>`][variable]) {
            return scope.vars[`<${t}>`][variable]
          }
        }
      }
      if (scope.vars[type] && scope.vars[type][variable]) {
        return scope.vars[type][variable]
      }
      if (type == '<Object>' && scope.vars[`<*>`] && scope.vars[`<*>`][variable]) {
        return scope.vars[`<*>`][variable]
      }
    }
    if (scope.vars[variable]) {
      return scope.vars[variable]
    }
    else {
      scope = scope.parent
    }
  }
  return null
}

function interpret(stack) {
  if (!stack.length) {
    return false
  }
  
  let top = stack[stack.length - 1]

  // Advance to next statement
  if (top.statements != null) {
    env = top
    if (top.statements[0]) {
      stack.push(top.statements[0])
      top.statements.shift()
    }
    else {
      if (top.running) {
        top.running.value = false
      }
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
        delete top.eval
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
    if (top.eval == null) {
      top.eval = JSON.parse(JSON.origStringify(top.in))
    }
    if (top.eval.variable) {
      top.eval = search(top.eval.variable)
    }
    if (!top.eval.hasOwnProperty('value') || top.eval.init) {
      stack.push(top.eval)
    }
    else if (top.at == null) {
      top.at = 0
    }
    else if (top.at < top.eval.value.length) {
      let args = {}
      if (top.eval.type == '<Array>') {
        args[top.variable] = {
          type: top.eval.value[top.at].type,
          value: top.eval.value[top.at].value
        }
      }
      else if (top.eval.type == '<String>') {
        args[top.variable] = {
          type: '<String>',
          value: top.eval.value[top.at]
        }
      }
      stack.push_environment(top.body,args)
      delete top.eval
      ++top.at
    }
    else {
      stack.pop()
    }
  }

  // If Elif
  else if (top.statement == 'IF' || top.statement == 'ELIF') {
    if (top.condition.variable) {
      top.condition = search(top.condition.variable)
    }
    if (!top.condition.hasOwnProperty('value') || top.condition.init) {
      stack.push(top.condition)
    }
    else {
      stack.pop()
      if (top.condition.value) {
        stack.push_environment(top.body)
      }
      else if (top.else) {
        stack.push(top.else)
      }
    }
  }

  // Else
  else if (top.statement == 'ELSE') {
    stack.pop()
    stack.push_environment(top.body)
  }

  // Expressions
  else if (top.statement == 'EXPRESSION') {
    stack.pop()
    if (top.expression.operation || top.expression.init) {
      stack.push(top.expression)
    }
  }

  // Return Statements
  else if (top.statement == 'RETURN') {
    if (top.expression.variable) {
      top.expression = search(top.expression.variable)
    }
    if (top.expression.operation || top.expression.init) {
      stack.push(top.expression)
    }
    else {
      env.value = top.expression.value
      env.polytype = top.expression.polytype
      env.type = top.expression.type
      stack.pop()
    }
  }

  // Yield Statements
  else if (top.statement == 'YIELD') {
    stack.pop()
    return false
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
    top.polytype = top.left.polytype
    top.value = top.left.value
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // And Left
  else if (top.operation == '&&' && !top.left.value) {
    top.type  = '<Boolean>'
    top.value = false
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Or Left
  else if (top.operation == '||' && !!top.left.value) {
    top.type  = '<Boolean>'
    top.value = true
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

  // Type Constructors
  else if (top.init == '<>') {
    for (let type of top.polytype) {
      let template = search(type)
      if (template.polytype) {
        top.polytype = top.polytype.concat(template.polytype)
      }
      for (let key in template.value) {
        top.value[key] = JSON.parse(JSON.origStringify(template.value[key]))
      }
    }

    delete top.init
    stack.pop()
  }

  // Passed Gates
  else if (top.operation == '\\' || top.operation == '?') {
    top.type = top.right.type
    top.polytype = top.right.polytype
    top.value = top.right.value
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Passed Logic
  else if (top.operation == '&&' || top.operation == '||') {
    top.type  = '<Boolean>'
    top.value = !!top.right.value
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
    if (!top.value) {
      top.value = {
        type: '<Undefined>',
        value: null,
        set: {
          key: top.right.value,
          obj: top.left.value
        }
      }
    }
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Dot Access
  else if (top.operation == '.extension') {
    top.type  = '<Pointer>'
    top.value = try_search(top.right.value,top.left)
    if (!top.value) {
      throw TypeError(top.line, `Extension function "${top.right.value}" not found for ${top.left.type}.`)
    }
    top.value.caller = top.left
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

  // Function Call
  else if (top.operation == '()') {
    if (top.at == null) {
      top.at = 0
    }
    else {
      top.at++
    }
    if (top.at < top.args.length) {
      let item = top.args[top.at]
      if (item.variable) {
        top.args[top.at] = search(item.variable)
      }
      if (item.operation || item.init) {
        stack.push(item)
      }
    }
    else if (top.left.native != null) {
      if (top.left.caller) {
        top.args.unshift(top.left.caller)
        delete top.left.caller
      }
      let ret = top.left.native(...top.args)
      top.type = ret.type
      top.polytype = ret.polytype
      top.value = ret.value
      delete top.args
      delete top.operation
      delete top.line
      delete top.left
      delete top.at
      stack.pop()
    }
    else if (top.fn == null) {
      let args = {}
      if (top.left.caller) {
        args.this = top.left.caller
        delete top.left.caller
      }
      for (let i =  0; i < top.args.length && i < top.left.args.length; i++) {
        args[top.left.args[i]] = top.args[i]
      }
      if (top.left.type == 'TASK') {
        machine.create_thread(top.left.body, args)
        top.type = '<Pointer>'
        top.value = top.left.body.running
        delete top.args
        delete top.operation
        delete top.line
        delete top.left
        delete top.at
        stack.pop()
      }
      else {
        top.fn = stack.push_environment(top.left.body, args)
      }
    }
    else {
      top.type = top.fn.type
      top.value = top.fn.value
      delete top.args
      delete top.operation
      delete top.line
      delete top.left
      delete top.at
      delete top.fn
      stack.pop()
    }
  }

  // Type Cast
  else if (top.operation == '<>') {

    if (same_type(top.left, top.right)) {
      top.type = top.right.type
      top.polytype = 
        top.left.polytype && top.right.polytype ? top.left.polytype.concat(top.right.polytype) :
        top.left.polytype || top.right.polytype
      top.value = top.left.value
      delete top.line
      delete top.operation
      delete top.single
      delete top.right
    }
    else if (top.single) {

      let type = top.right.polytype ? top.right.polytype[0] : top.right.type.slice(1,-1);

      let conversion = try_search(type,top.left)
      if (conversion) {
        conversion.caller = top.left
        top.operation = '()'
        top.args = []
        top.left = {
          type: '<Pointer>',
          value: conversion
        }
        delete top.right
        delete top.single
      }
      else {
        throw TypeError(top.line, `No extension found for converting ${top.left.type} to <${type}>.`)
      }
    }
    else {
      throw TypeError(top.line, `Object key mismatch in multitype cast operation.`)
    }
  }

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
    let left = top.left.value
    let right = top.right.value
    top.type = '<Object>'
    top.polytype = 
      top.left.polytype && top.right.polytype ? top.left.polytype.concat(top.right.polytype) :
      top.left.polytype || top.right.polytype
    top.value = {}
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

  // Type Check
  else if (top.operation == '&') {
    top.type  = '<Boolean>'
    if (!top.left) {
      throw top.line
    }
    top.value = same_type(top.left, top.right)
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
    if (top.left.set) {
      top.left.set.obj[top.left.set.key] = top.right
    }
    else {
      top.left.type = top.right.type
      top.left.polytype = top.right.polytype
      top.left.value = top.right.value
    }
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
    top.left.polytype = 
      top.left.polytype && top.right.polytype ? top.left.polytype.concat(top.right.polytype) :
      top.left.polytype || top.right.polytype
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
      delete top.operation
      delete top.line
      delete top.left
      delete top.right
      stack.pop()
    }
    else if (top.left.type == '<Array>') {
      top.left.value.push(top.right)
      delete top.operation
      delete top.line
      delete top.left
      delete top.right
      stack.pop()
    }
    else if (top.left.type == '<String>') {
      if (top.right.type == '<String>') {
        top.left.value += top.right.value
        delete top.operation
        delete top.line
        delete top.left
        delete top.right
        stack.pop()
      }
      else {
        top.right = {
          line: top.line,
          left: top.right,
          operation: '<>',
          single: true,
          right: {
            type: '<String>',
            value: ''
          }
        }
      }
    }
    else {
      throw TypeError(top.line, `"~=" expected <Object> or <String>, found ${top.left.type}`)
    }
  }

  // Optional Assign
  else if (top.operation == '?=') {
    if (!!top.right.value) {
      top.left.type = top.right.type
      top.left.polytype = top.right.polytype
      top.left.value = top.right.value
    }
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }

  // Set if false
  else if (top.operation == '\\=') {
    if (!top.left.value) {
      top.left.type = top.right.type
      top.left.polytype = top.right.polytype
      top.left.value = top.right.value
    }
    delete top.operation
    delete top.line
    delete top.left
    delete top.right
    stack.pop()
  }
  return true
}

const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

machine.advance()
if (!machine.threads.length) {
  rl.close()
}
rl.on('line', (input) => {
  machine.advance()
  if (!machine.threads.length) {
    rl.close()
  }
})