/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
'use strict';
import { fromJS } from 'immutable';
import randomColor from 'randomcolor'; 


import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  BUS_ROUTE_MARKERS,
  LOAD_ROUTE_COORD,
  TOGGLE_ROUTE_COORD,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  busRoutes:false,
  userData: {
    repositories: false,
  },
  displayRoute: [],
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .set('busRoutes', false)
        .set('displayRoute', [])
        .setIn(['userData', 'repositories'], false);
    case LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('busRoutes', false)
        .set('displayRoute', [])
        .set('currentUser', action.username);
    case LOAD_REPOS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case BUS_ROUTE_MARKERS:

        let busRoutes = action.busRoutes;
        
        for(let r of action.activeRoutes){

          let exist = false;

          if(busRoutes !== undefined && busRoutes.length){

            exist = busRoutes.find((busR) => {
              return busR.key === action.routes[r].key
            });

          }else
          busRoutes = [];

          if(!exist)
          busRoutes.push(action.routes[r]);
          else{
           exist.geo = true;
          }
        }
        
      return state
        .set('busRoutes', busRoutes)
        .set('error', false);
    case LOAD_ROUTE_COORD:

        let display = action.displayRoute;
        let bRoutes = action.busRoutes;
        let dRoutes = [];
       
        let routeCoord = action.activeRoutes.rows.map((gd) => {

          return {
            coords: gd[0].geometry.coordinates.map((geoData) => {

            return {lat: geoData[1], lng: geoData[0]}

            }), 
            strokeColor: randomColor(),
            routeKey: action.busRoute.key,
          }
          
        });
        
        dRoutes = [...display,routeCoord[0]];

        let activeRoute = bRoutes.find((b) => {

          return b.key === action.busRoute.key

        });

        activeRoute.geoData = routeCoord[0];
         
      return state
      .set('displayRoute', dRoutes);
    case TOGGLE_ROUTE_COORD:

       let updatedDisplayRoute = [];
       let toggleRouteIndex = action.displayRoute.findIndex((d) => {
        return d.routeKey === action.toggleRoute
       });

       
       if(toggleRouteIndex !== -1)
        updatedDisplayRoute = action.displayRoute
      .slice(0, toggleRouteIndex)
      .concat(action.displayRoute.slice(toggleRouteIndex + 1))
       else{
        let busRoute = state.get('busRoutes').find((b) => {
          return b.key === action.toggleRoute
        });
        
        updatedDisplayRoute = [...action.displayRoute,busRoute.geoData];
       }
       
        
      return state
      .set('displayRoute', updatedDisplayRoute);
    default:
      return state;
  }
}

export default appReducer;
