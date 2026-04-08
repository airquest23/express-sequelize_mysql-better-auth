import { ressources } from "../ressources/languages";

export const getLanguage = (locale = 'fr') => {
  const search = languageIndex[locale];
  return !isNaN(search) ? search : 1;
};

export const getLocalizedValue = (key : string, locale = 'fr') => {
  const index = getLanguage(locale);
  return ressources[key] ? ressources[key][index] : key;
};

const languageIndex : { [key: string] : number } = {
  'fr': 0,
  'en': 1,
};