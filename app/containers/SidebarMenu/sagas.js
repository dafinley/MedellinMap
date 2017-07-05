/**
 * Gets the repositories of the user from Github
 */

import { take, fork, call, put, select, cancel, takeLatest, all } from 'redux-saga/effects';
import { LOAD_ROUTES, FUSION_ROUTE_URL, FUSION_GEO_URL, URL_FUSION_TABLE, KEY_FUSION_TABLE, ID_FUSION_TABLE } from './constants';
import { LOCATION_CHANGE } from 'react-router-redux';
import { routesLoaded, routesLoadedError } from './actions';
import { LOAD_ROUTE_COORD, BUS_ROUTE_MARKERS } from 'containers/App/constants';
import { loadRouteCoord } from 'containers/App/actions';
import { makeSelectBusRoutes, makeSelectDisplayRoute } from 'containers/App/selectors';

import request from 'utils/request';

/**
 * Github repos request/response handler
 */
export function* getRoutes() {
  // Select username from store
  const requestURL = FUSION_ROUTE_URL;

  try {
    // Call our request helper (see 'utils/request')
    const routes = yield call(request, requestURL);
    yield put(routesLoaded(routes));
  } catch (err) {
    yield put(routesLoadedError(err));
  }
}

export function* getRouteCoord() {

  try {
    // Call our request helper (see 'utils/request')
    const busRoutes = yield select(makeSelectBusRoutes());
    const displayRoute = yield select(makeSelectDisplayRoute());
    

    const busRoute = busRoutes.find((busRoute) => {

      return !busRoute.geo
    });
    
    const geoData = yield call(request, FUSION_GEO_URL(busRoute.name, URL_FUSION_TABLE, ID_FUSION_TABLE, KEY_FUSION_TABLE));
    //const routes = yield call(request, requestURL);
    yield put(loadRouteCoord(geoData, busRoute, busRoutes, displayRoute));
  } catch (err) {
    yield put(routesLoadedError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* routeData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(LOAD_ROUTES, getRoutes);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* routeCoord() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  const watcher = yield takeLatest(BUS_ROUTE_MARKERS, getRouteCoord);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default function* root() {
   yield [
    fork(routeData),
    fork(routeCoord),
    ]
};
