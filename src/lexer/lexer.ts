export class Lexer {
  private position = 0;

  constructor(private input: string) {}

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
}
