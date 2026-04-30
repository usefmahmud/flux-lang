import type { Token } from './tokens';

export class Lexer {
  private position = 0;

  constructor(private input: string) {}

  tokenize(): Token[] {
    const tokens: Token[] = [];

    while (!this.isAtEnd()) {
      this.skipWhiteSpaces();
    }

    return tokens;
  }

  private readString(): string {
    let result = '';

    while (!this.isAtEnd() && this.peek() !== '"') {
      result += this.peek();
      this.advance();
    }

    if (this.isAtEnd()) {
      throw new Error('Unterminated string literal');
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
      throw new Error(
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

  private skipWhiteSpaces() {
    if (this.peek() === ' ') {
      this.advance();
    }
  }
}
