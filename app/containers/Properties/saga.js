import { all, call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { LAYER_EXP_API_URL_BASE } from 'containers/App/constants';
import { LOAD_PROPERTIES } from './constants';
import { propertiesLoaded } from './actions';

export function* getProperties() {
  const requestURL = `${LAYER_EXP_API_URL_BASE}/properties/listProperties`;

  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const properties = yield call(request, requestURL, options);
  yield put(propertiesLoaded(properties));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield all([takeLatest(LOAD_PROPERTIES, getProperties)]);
}
