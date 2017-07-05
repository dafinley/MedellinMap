import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import { loadRoutes } from './actions';
import { updateBusRoutes, toggleRouteCoord } from '../App/actions';
import { makeSelectRoutes } from './selectors';
import { makeSelectBusRoutes, makeSelectDisplayRoute } from '../App/selectors';

export class SidebarMenu extends React.Component { // eslint-disable-line react/prefer-stateless-function
 
constructor(props) {
    super(props);
    this.state = {open: false, busRoutes:[]};
  }

handleToggle = () => this.setState({open: !this.state.open});

handleClose = () => this.setState({open: false});

handleSelectChange = (event, index, values) => {
  this.setState({busRoutes: values});

  this.props.updateBusRoutes(values, this.props.routes, this.props.busRoutes);
}

handleToggleRoute = (x,y) => {
  this.props.toggleRouteCoord(x,y);
}

componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
    
    this.props.loadRoutes();
  }

  selectionRenderer = (values) => {
    switch(values.length){
      case 0: 
         return 'Select a Route';
      case 1:
         return 'One Route Selected';
      default:
         return `${values.length} routes selected`;

    }
  }

  selectMenuItems(busRoutes){

    if(busRoutes !== undefined && busRoutes && busRoutes.length){
      
    return busRoutes.map((busRoute) => (
      <MenuItem
      key={busRoute.key}
      checked={this.state.busRoutes.indexOf(busRoute.key) > -1}
      value={busRoute.key}
      primaryText={busRoute.title + " " + busRoute.name}
      
      />
      ))}
     else return false;
  }

  activeBusRoutes(busRoutes){

    if(busRoutes !== undefined && busRoutes.length){
    return busRoutes.map((busRoute) => (
      
      <ListItem
        key={this.props.routes[busRoute].key}
        primaryText={this.props.routes[busRoute].title + " " + this.props.routes[busRoute].name}
        rightToggle={<Toggle value={34} defaultToggled={true} />}
        value={busRoute}
        onChange={() => this.handleToggleRoute(busRoute, this.props.displayRoute)} />
      ))}
     else return false;
  }

 render() {
    return (
      <div>
      <AppBar 
         title="Medellin"
         iconClassNameRight="muidocs-icon-navigation-expand-more"
         onLeftIconButtonTouchTap={this.handleToggle} />
      <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
         <List>
          <ListItem 
            primaryText='Bus' 
            key={1}
            primaryTogglesNestedList={true}
            nestedLevel={0}
            nestedItems={[
                <div key={1} style={{marginLeft:10}}>
                  <SelectField 
                  key={1}
                  multiple={true}
                  hintText='Select a Route'
                  value={this.state.busRoutes}
                  onChange={this.handleSelectChange}
                  selectionRenderer={this.selectionRenderer}
                  >
                  {this.selectMenuItems(this.props.routes)}
                  </SelectField>
                  {this.activeBusRoutes(this.state.busRoutes)}
                  </div>
              ]}

             />
          <ListItem 
            primaryText='Metro' 
            key={2}
            primaryTogglesNestedList={true}
            nestedItems={[
                <ListItem 
                  key={1}
                  primaryText='Train A'
                  rightToggle={<Toggle />} />
              ]}

             />
          <ListItem 
            primaryText='Tranvia' 
            key={3}
            primaryTogglesNestedList={true}
            nestedItems={[
                <ListItem 
                  key={1}
                  primaryText='Tram 1'
                  rightToggle={<Toggle />} />
              ]}

             />
          <ListItem 
            primaryText='Nightlife' 
            key={4}
            primaryTogglesNestedList={true}
            nestedItems={[
                <ListItem 
                  key={1}
                  primaryText='Club 1'
                  rightToggle={<Toggle />} />
              ]}

             />
          <ListItem 
            primaryText='Canchas' 
            key={5}
            primaryTogglesNestedList={true}
            nestedItems={[
                <ListItem 
                  key={1}
                  primaryText='Cancha 1'
                  rightToggle={<Toggle />} />
              ]}

             />
          <ListItem 
            primaryText='Tours' 
            key={6}
            primaryTogglesNestedList={true}
            nestedItems={[
                <ListItem 
                  key={1}
                  primaryText='Culture Tour'
                  rightToggle={<Toggle />} />,
                <ListItem 
                  key={2}
                  primaryText='Fruit Tour'
                  rightToggle={<Toggle />} />,
                <ListItem 
                  key={3}
                  primaryText='Hiking Tour'
                  rightToggle={<Toggle />} />
              ]}
             />
         </List>
        </Drawer>
       </div>
    );
  }
}

SidebarMenu.propTypes = {
  loadRoutes: React.PropTypes.func,
  updateBusRoutes: React.PropTypes.func,
  
  routes: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
    React.PropTypes.func,
  ])
};

export function mapDispatchToProps(dispatch) {
  return {
    loadRoutes: () => dispatch(loadRoutes()),
    updateBusRoutes: (a,r,b) => dispatch(updateBusRoutes(a,r,b)),
    toggleRouteCoord: (x,y) => dispatch(toggleRouteCoord(x,y)),
  };
}

const mapStateToProps = createStructuredSelector({
  routes: makeSelectRoutes(),
  busRoutes: makeSelectBusRoutes(),
  displayRoute: makeSelectDisplayRoute(),
});



export default connect(mapStateToProps, mapDispatchToProps)(SidebarMenu);


