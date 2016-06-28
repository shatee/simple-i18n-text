'use strict';

import Translator from './Translator';

const translator = new Translator();
const t = translator.translate;
const pt = translator.pluralTranslate;

export {translator, t, pt};
