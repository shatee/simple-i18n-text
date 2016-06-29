'use strict';

export default class Messages {

  locale = null;
  messages = {};

  /**
   * @param {string} locale
   * @param {object.<string>} messages
   */
  constructor(locale, messages) {
    this.locale = locale;
    this.messages = messages;
  }

  /**
   * @param {string} sourceText
   * @param {boolean} isPlural
   * @return {string}
   */
  getText(sourceText, isPlural) {
    if (!this.messages.hasOwnProperty(sourceText)) {
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
