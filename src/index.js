'use strict';

import context from './context';
import Translator from './Translator';

const translator = new Translator(context);
const t = translator.translate.bind(translator);
const pt = translator.pluralTranslate.bind(translator);

export {context, translator, t, pt};
