import call from './api';
import { apiStart, apiStop, apiThrowError, apiShowLoading } from './apiActions';

const apiMiddleware = ({ dispatch }) => next => (action) => {
  const { api } = action.meta || false;
  if (api !== true) {
    return next(action);
  }

  dispatch(apiStart());
  dispatch(apiShowLoading());

  const { payload } = action;
  const { success } = action.meta;
  return call(payload).then((response) => {
    dispatch(apiStop());
    dispatch(success(response));
  }).catch((error) => {
    dispatch(apiStop());
    if (error.message === 'Network Error') {
      return dispatch(apiThrowError(['Błąd serwera, proszę spróbować później']));
    }
    if (error.message === 'timeout of 5000ms exceeded') {
      return dispatch(apiThrowError(['Serwer zbyt długo nie odpowiada']));
    }
    if (error.response === undefined) {
      return dispatch(apiThrowError(['Brak odpowiedzi z serwera']));
    }
    let { errors } = error.response.data;
    if (!Array.isArray(errors)) {
      errors = [errors];
    }
    dispatch(apiThrowError(errors));
  });
};

export default apiMiddleware;
