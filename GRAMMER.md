# Grammer

this document defines the formal grammar of **FluxLang** using EBNF.

---

## Program Structure

```ebnf
program        ::= { statement }
```

---

## Statements

```ebnf
statement      ::= assignment
                 | functionDecl
                 | returnStmt
                 | printStmt
                 | exprStmt
```

---

## Assignment

```ebnf
assignment     ::= identifier "=" expression
```

---

## Functions

```ebnf
functionDecl   ::= "fun" identifier "(" [ paramList ] ")" block

paramList      ::= identifier { "," identifier }

block          ::= "{" { statement } "}"
```

---

## Return

```ebnf
returnStmt     ::= "return" expression
```

---

## Print

```ebnf
printStmt      ::= "print" "(" [ argList ] ")"
```

---

## Expressions

```ebnf
exprStmt       ::= expression

expression     ::= addition

addition       ::= multiplication { ("+" | "-") multiplication }

multiplication ::= call { ("*" | "/") call }

call           ::= primary { "(" [ argList ] ")" }

argList        ::= expression { "," expression }
```

---

## Primary Expressions

```ebnf
primary        ::= number
                 | string
                 | identifier
                 | "(" expression ")"
```

---

## Lexical Rules

```ebnf
identifier     ::= letter { letter | digit | "_" }

number         ::= digit { digit }

string         ::= '"' { character } '"'
```

---

## notes

- newline acts as statement separators
- `+` is used for both numeric addition and string concatenation
- function calls can be nested:
  `print(add(1, other(2)))`

---
