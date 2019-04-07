import { get } from 'lodash';

export function buildHttpActionCreators(type) {
  return {
    request: payload => ({ type: type.REQUEST, payload }),
    response: payload => ({ type: type.RESPONSE, payload })
  };
}

export function buildHttpActionTypes(type) {
  return {
    REQUEST: `${type}.REQUEST`,
    RESPONSE: `${type}.RESPONSE`
  };
}

export function combineActions(actionsObj) {
  return Object.keys(actionsObj).reduce(
    (acc, key) => ({
      ...acc,
      [key]: get(actionsObj[key], 'request') || actionsObj[key]
    }),
    {}
  );
}
