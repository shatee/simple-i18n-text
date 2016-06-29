'use strict';

import Messages from './Messages';

/**
 * @typedef {Object} TranslateOption
 * @property {string} locale
 */

export default class Translator {

  _context;
  _messages = {};

  constructor(context) {
    this._context = context;
  }

  /**
   * set message list on locale
   * @param {string} locale
   * @param {Object} messages
   */
  setMessages(locale, messages) {
    this._messages[locale] = new Messages(locale, messages);
  }

  /**
   * get translated text
   * @param {string} sourceText
   * @param {Object} params?
   * @param {TranslateOption} options?
   */
  translate(sourceText, params = {}, options = {}) {
    const locale = options.locale || this._context.locale;
    const text = this._messages[locale] ? this._messages[locale].getText(sourceText, false) : sourceText;
    return this._assign(text, params);
  }

  /**
   * get plural translated text
   * @param {string} sourceText
   * @param {Object} params?
   * @param {TranslateOption} options?
   */
  pluralTranslate(sourceText, params = {}, options = {}) {
    const locale = options.locale || this._context.locale;
    const text = this._messages[locale] ? this._messages[locale].getText(sourceText, this._isPlural(params)) : sourceText;
    return this._assign(text, params);
  }

  /**
   * @param {string} text
   * @param {Object} params
   * @return {string}
   * @private
   */
  _assign(text, params) {
    for (const key in params) {
      text = text.replace(new RegExp(this._context.placeholderTokenLeft + key + this._context.placeholderTokenRight), encodeURIComponent(params[key]));
    }
    return text;
  }

  /**
   * @param {Object} params
   * @return {boolean}
   * @private
   */
  _isPlural(params) {
    const pluralParam = params[this._context.pluralParamKey];

    switch(typeof pluralParam) {
      case 'number':
        return pluralParam > 1;
      case 'string':
        // remove comma (ex: 1,000,000 -> 1000000)
        return parseInt(pluralParam.replace(/,/g, '')) > 1;
      default:
        return false;
    }
  }

}
