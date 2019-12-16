type SingularMessage = string;
type PluralMessage = [ string, string ];
type Message = SingularMessage | PluralMessage;

export default class Messages {
  public constructor(
    public locale: string,
    public messages: { [k: string]: Message; }
  ) {
  }

  public getText(sourceText: string, isPlural: boolean) {
    if (!Object.prototype.hasOwnProperty.call(this.messages, sourceText)) {
      return sourceText;
    }

    const tmpText = this.messages[sourceText];

    // Array in case of plural
    if (Array.isArray(tmpText)) {
      return (isPlural && tmpText[1]) ? tmpText[1] : tmpText[0];
    }

    return tmpText;
  }

}
