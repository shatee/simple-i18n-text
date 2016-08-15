'use strict';

import assert from 'power-assert';
import configure from '../src/configure';
import Translator from '../src/Translator';

const translator = new Translator(configure);

translator.setMessages('en-US', {
  ['焼きリンゴ']: 'a baked apple',
  ['%name%は%target%を食べていた']: '%name% was eating an %target%',
  ['%name%さんが%num%個の動画を投稿しました']: [
    '%name% uploaded a video',
    '%name% uploaded %num% videos'
  ],
  ['私は{{n}}冊の本を持っています']: [
    'I have a book',
    'I have {{n}} books'
  ]
});

translator.setMessages('zh-TW', {
  ['焼きリンゴ']: '燒烤蘋果',
  ['%name%は%target%を食べていた']: '%name%吃著%target%',
  ['%name%さんが%num%個の動画を投稿しました']: [
    '%name%%num%個動畫投稿了',
    '%name%%num%個動畫投稿了'
  ]
});


describe('Translator', () => {

  beforeEach(() => {
    configure.locale = 'en-US';
    configure.placeholderTokenLeft = '%';
    configure.placeholderTokenRight = '%';
    configure.pluralParamKey = 'num';
  });

  describe('Translator#translate', () => {
    it('get translated text', () => {
      const translated = translator.translate('焼きリンゴ');
      assert('a baked apple' === translated);
    });

    it('has params', () => {
      const translated = translator.translate('%name%は%target%を食べていた', {
        name: '佐藤',
        target: 'オレンジ'
      });
      assert('佐藤 was eating an オレンジ' === translated);
    });

    it('use locale option to chinese taiwan', () => {
      const translated = translator.translate('焼きリンゴ', {}, {locale: 'zh-TW'});
      assert('燒烤蘋果' === translated);
    });

    it('unknown locale (to source text)', () => {
      const translated = translator.translate('焼きリンゴ', {}, {locale: 'fr-FR'});
      assert('焼きリンゴ' === translated);
    });

    it('undefined text', () => {
      const translated = translator.translate('存在しない文言');
      assert('存在しない文言' === translated);
    });
  });

  describe('Translator#pluralTranslate', () => {
    it('get plural translated text', () => {
      const translated1 = translator.pluralTranslate('%name%さんが%num%個の動画を投稿しました', {
        name: '鈴木',
        num: 1
      });
      assert('鈴木 uploaded a video' === translated1);

      const translated2 = translator.pluralTranslate('%name%さんが%num%個の動画を投稿しました', {
        name: '鈴木',
        num: 2
      });
      assert('鈴木 uploaded 2 videos' === translated2);
    });

    it('use translate text', () => {
      const translated = translator.pluralTranslate('焼きリンゴ');
      assert('a baked apple' === translated);
    });

    it('use locale option to chinese taiwan', () => {
      const translated = translator.pluralTranslate('%name%さんが%num%個の動画を投稿しました', {
        name: 'Paul',
        num: 2
      }, {locale: 'zh-TW'});
      assert('Paul2個動畫投稿了' === translated);
    });

    it('custom context', () => {
      configure.placeholderTokenLeft = '{{';
      configure.placeholderTokenRight = '}}';
      configure.pluralParamKey = 'n';

      const translated = translator.pluralTranslate('私は{{n}}冊の本を持っています', {
        n: 10
      });
      assert('I have 10 books' === translated);
    });
  });

});
