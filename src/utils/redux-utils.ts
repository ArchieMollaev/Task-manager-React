import { get } from 'lodash';

export function buildHttpActionCreators(type: any) {
  return {
    request: (payload: any) => ({ type: type.REQUEST, payload }),
    response: (payload: any) => ({ type: type.RESPONSE, payload })
  };
}

export function buildHttpActionTypes(type: any) {
  return {
    REQUEST: `${type}.REQUEST`,
    RESPONSE: `${type}.RESPONSE`
  };
}

export function combineActions(actionsObj: any) {
  return Object.keys(actionsObj).reduce(
    (acc, key) => ({
      ...acc,
      [key]: get(actionsObj[key], 'request') || actionsObj[key]
    }),
    {}
  );
}
