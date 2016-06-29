'use strict';

/**
 * @typedef {Object} TranslateOption
 * @property {string} locale
 */

export default class Translator {

  _context;
  _messageRepository;

  constructor(context, messageRepository) {
    this._context = context;
    this._messageRepository = messageRepository;
  }

  /**
   * set message list on locale
   * @param {string} locale
   * @param {Object} messages
   */
  setMessages(locale, messages) {
    this._messageRepository.setMessages(locale, messages);
  }

  /**
   * get translated text
   * @param {string} sourceText
   * @param {Object} params?
   * @param {TranslateOption} options?
   */
  translate(sourceText, params = {}, options = {}) {
    const locale = options.locale || this._context.locale;
    const text = this._messageRepository.getText(locale, sourceText, false);
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
    const text = this._messageRepository.getText(locale, sourceText, this._isPlural(params));
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
      text = text.replace(new RegExp(this._context.replacerTokenLeft + key + this._context.replacerTokenRight), encodeURIComponent(params[key]));
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
