export type Configure = {
  locale: string;
  placeholderTokenLeft: string;
  placeholderTokenRight: string;
  pluralParamKey: string;
}

export const configure = {
  locale: 'en-US',
  placeholderTokenLeft: '%',
  placeholderTokenRight: '%',
  pluralParamKey: 'num'
};
