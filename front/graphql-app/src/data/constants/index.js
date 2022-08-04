import models from '../models';
import {
  toGenerateInitialSate,
  toGenerateConstantsArray,
} from '../../services/technique/generateCode';

export default Object.values(models).map(item => {
  const {attributs, model, entity} = item;
  return {
    entity,
    constants: toGenerateConstantsArray(model, entity),
    initialState: toGenerateInitialSate(attributs),
  };
});

export const constants = Object.values(models).map(item => {
  const {attributs, model, entity} = item;
  const res = {
    entity,
    constants: toGenerateConstantsArray(model, entity),
    initialState: toGenerateInitialSate(attributs),
  };
  return {[entity]: res};
});
