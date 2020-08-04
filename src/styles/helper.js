export const isEmailValid = (email) =>
  email.match(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/g);

export const isRequiredField = (value) =>
  !value ? 'Esse campo é obrigatório' : '';

export const alfabeticOrder = (propriedadeToFilter) => (item, item2) =>
  item[propriedadeToFilter] > item2[propriedadeToFilter] ? 1 : -1;
