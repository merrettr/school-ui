import fetch from 'isomorphic-fetch';
import { normalize } from 'normalizr';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { put } from 'redux-saga/effects'
import { getToken } from './token';

const BASE_URL = process.env.REACT_APP_API_URL;

/**
 * Call the API
 * @param endpoint The url to invoke
 * @param method The HTTP method to use
 * @param params The query params to pass with the request
 * @param body The body to include with the request
 * @param authorization The value to use in the authorization header
 * @param schema The normalize schema to use on the response json
 * @returns {*}
 */
function* callApi ({ endpoint, method, params, body, authorization, schema }) {
  const query = Object.keys(params || {})
    .filter(key => params[key] !== null)
    .map(key => {
      let param = params[key];
      if (typeof param === 'object') {
        param = JSON.stringify(param);
      }

      return `${key}=${param}`;
    })
    .join('&');

  const response = yield fetch(
    `${BASE_URL}${endpoint}?${query}`,
    {
      method: method || 'GET',
      headers: {
        Authorization: authorization,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(decamelizeKeys(body)),
    }
  );

  const text = yield response.text();

  if (!response.ok) {
    throw text
      ? camelizeKeys(JSON.parse(text))
      : { status: response.status, message: response.statusText };
  }

  if (!text) {
    return null;
  }
  if (schema) {
    return normalize(camelizeKeys(JSON.parse(text)), schema);
  }

  return camelizeKeys(JSON.parse(text));
}

/**
 * Make a call to the api
 *
 * @param requestType Action to dispatch when the request is sent
 * @param successType Action to dispatch when the request succeeds
 * @param errorType Action to dispatch when the request fails
 * @param request The request information
 * @param action The original action
 */
export default function* ([ requestType, successType, errorType ], request, action) {
  try {
    yield put({ type: requestType, payload: action });

    yield put({
      type: successType,
      payload: action,
      response: yield* callApi({
        ...request,
        authorization: getToken() ? `Bearer ${getToken().accessToken}` : null
      }),
    });
  } catch (e) {
    yield put({
      type: errorType,
      payload: action,
      error: e.message || e.error || e || 'An unknown error occurred',
    });
  }
}