'use strict';

import context from './context';
import MessageRepository from './MessageRepository';
import Translator from './Translator';

const messageRepository = new MessageRepository();
const translator = new Translator(context, messageRepository);
const t = translator.translate;
const pt = translator.pluralTranslate;

export {context, messageRepository, translator, t, pt};
