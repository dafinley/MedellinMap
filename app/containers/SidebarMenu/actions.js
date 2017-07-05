import {
  LOAD_ROUTES,
  LOAD_ROUTES_SUCCESS,
  LOAD_ROUTES_ERROR,
} from './constants';


export function loadRoutes() {
  return {
    type: LOAD_ROUTES,
  };
}

export function routesLoaded(routes) {
  return {
    type: LOAD_ROUTES_SUCCESS,
    routes,
  };
}

export function routesLoadedError(error) {
  return {
    type: LOAD_ROUTES_ERROR,
    error,
  };
}