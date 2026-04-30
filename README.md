# FluxLang

a tiny interpreted programming language written in TypeScript.

for the formal grammar, see [GRAMMER.md](GRAMMER.md).

---

## Features

- variables and assignments
- numbers and strings
- `print()` for output
- functions with `fun`
- `return` statements
- basic arithmetic expressions

---

## Example

```txt
x = 1 + 1
y = "hello"

print(x, y)

fun add(a, b) {
    return a + b
}

print(add(1, 2))
```

---

## Syntax Overview

### variables

```txt
name = expression
```

### expressions

```txt
1 + 2
"hello" + " world"
```

### print

```txt
print(value1, value2)
```

### functions

```txt
fun name(param1, param2) {
    return expression
}

name(arg1, arg2)
```
