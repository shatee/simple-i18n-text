'use strict';

export default class MessageRepository {

  messages = {};

  /**
   * @param {string} locale
   * @param {object.<string>} messages
   */
  setMessages(locale, messages) {
    this.messages[locale] = messages;
  }

  /**
   * @param {string} locale
   * @param {string} sourceText
   * @param {boolean} isPlural
   * @return {string}
   */
  getText(locale, sourceText, isPlural) {
    if (!this.messages.hasOwnProperty(locale)) {
      return sourceText;
    }

    if (!this.messages[locale].hasOwnProperty(sourceText)) {
      return sourceText;
    }

    const tmpText = this.messages[locale][sourceText];

    // Array in case of plural
    if (Array.isArray(tmpText)) {
      if (isPlural && tmpText[1]) {
        return tmpText[1];
      } else {
        return tmpText[0];
      }
    }

    return tmpText;
  }

}
