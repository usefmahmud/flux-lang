import { Lexer } from './lexer/lexer';
import { TokenType } from './lexer/tokens';

const lexer = new Lexer(`
name = "yousef";
age = 30;

fun greet(name) {
  print("Hello, " + name + "!");
  return "done";
}

greet(name);
`);

try {
  const tokens = lexer.tokenize();
  console.log(
    tokens.map((token) => ({
      token: TokenType[token.type],
      value: token.value,
    }))
  );
} catch (error) {
  console.error('Lexer error:', error);
}
