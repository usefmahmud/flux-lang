export enum TokenType {
  Identifier,
  Number,
  String,

  Fun,
  Return,
  Print,

  LParen,
  RParen,
  LBrace,
  RBrace,
  Comma,
  Plus,
  Minus,
  Star,
  Slash,
  Equals,
  Semicolon,

  EOF,
}

export interface Token {
  type: TokenType;
  value: string;
  // will inlude line and column information later
}

export const KeywordsMap: Record<string, TokenType> = {
  fun: TokenType.Fun,
  return: TokenType.Return,
  print: TokenType.Print,
};
