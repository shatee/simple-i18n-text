# i18n-text-simply

I18n translation library.  
Original language is supposed to Japanese.

## Install

```
npm install i18n-text-simply
```

## Usage

### Basis

Basic translation, use `t` function.  
When replace partial text, use placeholder.  

```javascript
import {messageRepository, t} from 'i18n-text-simply';

messageRepository.setMessages('en-US', {
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

```javascript
import {messageRepository, pt} from 'i18n-text-simply';

messageRepository.setMessages('en-US', {
  ['%name%さんが%num%個の動画を投稿しました']: [
    '%name% uploaded a video',
    '%name% uploaded %num% videos'
  ]
});

pt('%name%さんが%num%個の動画を投稿しました', {num: 1}); // returns: 'Paul uploaded a video'
pt('%name%さんが%num%個の動画を投稿しました', {num: 2}); // returns: 'Paul uploaded 2 videos'
```

### Configuration

Edit context

```javascript
import {context} from 'i18n-text-simply';

// set the use messages locale
// default 'en-US'
context.locale = 'en-US';

// set the placeholder token
// default left: '%', right: '%'
// (e.g. "{{" and "}}" to t('{{foo}}が欲しい', {foo: 'お金'})
context.replacerTokenLeft = '%';
context.replacerTokenRight = '%';

// set the plural translation parameter key
// default "num"
// (e.g. set "n" to pt('%n%冊の本', {n: 1}) 
context.pluralParamKey = 'num';
```
