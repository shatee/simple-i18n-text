# i18n-text-simply

I18n translation library.  
Original language is supposed to Japanese.
元となる言語は日本語を想定しています。

## Install

```
npm install i18n-text-simply
```

## Usage

### Basis

Basic translation, use `t` function.  
When replace partial text, use placeholder.  
基本となる翻訳は `t` 関数を使います。  
文言の一部をパラメータで置換する際はプレースホルダーを使います。

```javascript
import {translator, t} from 'i18n-text-simply';

translator.setMessages('en-US', {
  ['彼はかっこいい。']: 'He is cool.',
  ['%name%はかわいい。']: '%name% is cute.'
});

t('彼はかっこいい。'); // returns: 'He is cool.'

// use parameter
t('%name%はかわいい。', {name: 'Sarah'}); // returns: 'Sarah is cute.'
```

### Plural

In case of plural translation, use `pt` function.  
And use `num` parameter.  
複数形を区別した翻訳を行う際は `pt` 関数を使います。  
その際は `num` パラメータを併用します。

```javascript
import {translator, pt} from 'i18n-text-simply';

translator.setMessages('en-US', {
  ['%name%さんが%num%個の動画を投稿しました']: [
    '%name% uploaded a video',
    '%name% uploaded %num% videos'
  ]
});

pt('%name%さんが%num%個の動画を投稿しました', {num: 1}); // returns: 'Paul uploaded a video'
pt('%name%さんが%num%個の動画を投稿しました', {num: 2}); // returns: 'Paul uploaded 2 videos'
```

### Configuration

Edit configure

```javascript
import {configure} from 'i18n-text-simply';

// set the use messages locale
// 翻訳先の locale を設定します
// default 'en-US'
configure.locale = 'en-US';

// set the placeholder token
// プレースホルダーのトークンを設定します
// default left: '%', right: '%'
// (e.g. "{{" and "}}" to t('{{foo}}が欲しい', {foo: 'お金'})
configure.replacerTokenLeft = '%';
configure.replacerTokenRight = '%';

// set the plural translation parameter key
// plural translation を行う際のパラメータのキーを設定します
// default "num"
// (e.g. set "n" to pt('%n%冊の本', {n: 1}) 
configure.pluralParamKey = 'num';
```
