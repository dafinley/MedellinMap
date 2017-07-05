import { fromJS } from 'immutable';

import {
  LOAD_ROUTES,
  LOAD_ROUTES_SUCCESS,
  LOAD_ROUTES_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  routes: false,
  busRoutes:[],
});

function sidebarReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ROUTES:

      // Delete prefixed '@' from the github username
      
      return state;
    case LOAD_ROUTES_SUCCESS:

    let routes = action.routes.rows.length ? action.routes.rows.map((route, index) => (
        {key:index, title: route[0], name: route[1], checked:true, geo:false, geoData:false}
    	)).splice(0,100) : [];

      return state
        .set('routes', routes);
    default:
      return state;
  }
}

export default sidebarReducer;