import * as constants from 'const';
import { buildHttpActionCreators } from '../utils/redux-utils';

const { SIGN_IN, SIGN_UP, GET_DATA, VALIDATE_LOGIN } = constants;

export const getUserData = buildHttpActionCreators(GET_DATA);

export const signIn = buildHttpActionCreators(SIGN_IN);

export const signUp = buildHttpActionCreators(SIGN_UP);

export const validateLogin = buildHttpActionCreators(VALIDATE_LOGIN);
