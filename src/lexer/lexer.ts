import { LexicalError } from './errors';
import { KeywordsMap, TokenType, type Token } from './tokens';

export class Lexer {
  private position = 0;

  constructor(private input: string) {}

  tokenize(): Token[] {
    const tokens: Token[] = [];

    while (!this.isAtEnd()) {
      this.skipWhiteSpaces();

      if (this.isAtEnd()) break;

      const char = this.peek();

      if (char === '"') {
        tokens.push(this.createToken(TokenType.String, this.readString()));
        continue;
      }

      if (this.isDigit(char)) {
        tokens.push(this.createToken(TokenType.Number, this.readNumber()));
        continue;
      }

      if (this.isAlpha(char) || char === '_') {
        const value = this.readIdentifier();
        const type = KeywordsMap[value] ?? TokenType.Identifier;
        tokens.push(this.createToken(type, value));
        continue;
      }

      const singleCharTokens: Record<string, TokenType> = {
        '(': TokenType.LParen,
        ')': TokenType.RParen,
        '{': TokenType.LBrace,
        '}': TokenType.RBrace,
        ',': TokenType.Comma,
        '+': TokenType.Plus,
        '-': TokenType.Minus,
        '*': TokenType.Star,
        '/': TokenType.Slash,
        '=': TokenType.Equals,
        ';': TokenType.Semicolon,
      };

      const type = singleCharTokens[char];
      if (type) {
        tokens.push(this.createToken(type, char));
        this.advance();
        continue;
      }

      console.log(tokens);

      throw new LexicalError(`Unexpected character: ${char}`);
    }

    return tokens;
  }

  private readString(): string {
    let result = '';

    // consume the opening quote
    this.advance();

    while (!this.isAtEnd() && this.peek() !== '"') {
      result += this.peek();
      this.advance();
    }

    if (this.isAtEnd()) {
      throw new LexicalError('Unterminated string literal');
    }

    // consume the closing quote
    this.advance();

    return result;
  }

  private readNumber(): string {
    let result = '';

    while (!this.isAtEnd() && this.isDigit(this.peek())) {
      result += this.peek();
      this.advance();
    }

    if (!this.isAtEnd() && this.peek() === '.') {
      result += this.peek();
      this.advance();

      while (!this.isAtEnd() && this.isDigit(this.peek())) {
        result += this.peek();
        this.advance();
      }
    }

    if (result[result.length - 1] === '.') {
      throw new LexicalError(
        'Invalid number literal, expected digits after decimal point'
      );
    }

    return result;
  }

  private readIdentifier(): string {
    let result = '';

    while (!this.isAtEnd() && this.isAlphaNumeric(this.peek())) {
      result += this.peek();
      this.advance();
    }

    return result;
  }

  private peek(): string {
    return this.input[this.position];
  }

  private advance() {
    this.position++;
    // will include line and column tracking later
  }

  private isAtEnd() {
    return this.position >= this.input.length;
  }

  private isDigit(char: string): boolean {
    return char >= '0' && char <= '9';
  }

  private isAlpha(ch: string) {
    return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || ch === '_';
  }

  private isAlphaNumeric(ch: string) {
    return this.isAlpha(ch) || this.isDigit(ch);
  }

  private skipWhiteSpaces(): void {
    while (!this.isAtEnd() && /\s/.test(this.peek())) {
      this.advance();
    }
  }

  private createToken(type: TokenType, value: string): Token {
    return { type, value };
  }
}
