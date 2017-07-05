
import { createSelector } from 'reselect';

const selectRoute = (state) => state.get('sidebar');
const selectBusRoute = (state) => state.get('sidebar');

const makeSelectRoutes = () => createSelector(
  selectRoute,
  (sidebarState) => sidebarState.get('routes')
);

const makeSelectBusRoutes = () => createSelector(
  selectBusRoute,
  (state) => state.get('busRoutes')
);


export {
  selectRoute,
  makeSelectRoutes,
  makeSelectBusRoutes,
};
