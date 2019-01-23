import configure from './configure';
import Translator from './Translator';

const translator = new Translator(configure);
const t = translator.translate.bind(translator);
const pt = translator.pluralTranslate.bind(translator);

export {
  configure,
  translator,
  t,
  pt
};
