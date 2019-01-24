import Messages from './Messages';
import { Configure } from './configure';

type TranslateOption = {
  locale: string;
};

type MessageParameter = { [k: string]: string | number; };

export default class Translator {

  public constructor(
    private configure: Configure,
    private messages: { [locale: string]: Messages } = {}
  ) {
  }

  /**
   * set message list on locale
   */
  public setMessages(locale: string, messages: Messages["messages"]) {
    this.messages[locale] = new Messages(locale, messages);
  }

  /**
   * get translated text
   */
  public translate(
    sourceText: string,
    params: MessageParameter = {},
    options?: TranslateOption
  ) {
    const locale = options ? options.locale : this.configure.locale;
    const text = this.messages[locale] ? this.messages[locale].getText(sourceText, false) : sourceText;
    return this.assign(text, params);
  }

  /**
   * get plural translated text
   */
  public pluralTranslate(
    sourceText: string,
    params: MessageParameter = {},
    options?: TranslateOption
  ) {
    const locale = options ? options.locale : this.configure.locale;
    const text = this.messages[locale] ? this.messages[locale].getText(sourceText, this.isPlural(params)) : sourceText;
    return this.assign(text, params);
  }

  private assign(text: string, params: MessageParameter) {
    return Object.keys(params).reduce((text, key) => {
      return text.replace(
        new RegExp(`${this.configure.placeholderTokenLeft}${key}${this.configure.placeholderTokenRight}`),
        String(params[key])
      );
    }, text);
  }

  private isPlural(params: MessageParameter) {
    const pluralParam = params[this.configure.pluralParamKey];

    switch(typeof pluralParam) {
      case 'number':
        return pluralParam > 1;
      case 'string':
        // remove comma (ex: 1,000,000 -> 1000000)
        return parseInt(pluralParam.replace(/,/g, ''), 10) > 1;
      default:
        return false;
    }
  }

}
