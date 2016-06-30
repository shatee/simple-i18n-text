# simple-i18n-text

An i18n translation library.  
The original language is supposed to be Japanese.

## Install

```
npm install simple-i18n-text
```

## Usage

### Basis

For basic translation, use function `t`.  
To replace partial text, use placeholder.

```javascript
import {translator, t} from 'simple-i18n-text';

translator.setMessages('en-US', {
  ['彼はかっこいい。']: 'He is cool.',
  ['%name%はかわいい。']: '%name% is cute.'
});

t('彼はかっこいい。'); // returns: 'He is cool.'

// use parameter
t('%name%はかわいい。', {name: 'Sarah'}); // returns: 'Sarah is cute.'
```

### Plural Translation

In case of translation plurals, use function `pt`.  
Then use parameter `num` for the numbers.

```javascript
import {translator, pt} from 'simple-i18n-text';

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

Edit configure object.

```javascript
import {configure} from 'simple-i18n-text';

// set locale for the target translation language
// default 'en-US'
configure.locale = 'en-US';

// set the placeholder token
// default left: '%', right: '%'
// (e.g. "{{" and "}}" to t('{{foo}}が欲しい', {foo: 'お金'})
configure.replacerTokenLeft = '%';
configure.replacerTokenRight = '%';

// set the parameter key for plural translation
// default "num"
// (e.g. set "n" to pt('%n%冊の本', {n: 1}) 
configure.pluralParamKey = 'num';
```
