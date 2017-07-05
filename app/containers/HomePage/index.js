/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectRepos, makeSelectLoading, makeSelectError, makeSelectBusRoutes, makeSelectDisplayRoute } from 'containers/App/selectors';
import H2 from 'components/H2';
import ReposList from 'components/ReposList';
import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
import Form from './Form';
import Input from './Input';
import Section from './Section';
import messages from './messages';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import { withGoogleMap, GoogleMap, Marker, Polygon } from 'react-google-maps'; 
import withScriptjs from "react-google-maps/lib/async/withScriptjs";
import _ from 'lodash';
import FaSpinner from 'react-icons/lib/fa/spinner';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
 
    state = {
      visibleMap: null
    }

  /**
   * when initial state username is not null, submit the form to load repos
   */

  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
   
  }
  

  onMapClick = () => {
    //console.log(this.state.visibleMap);
    //console.log(this.state.visibleMap._mapComponent);
    //this.state.visibleMap.setVisibility(false);
    //console.log(this.props.displayRoute);

  }

  holdPolygon = (el) => {
     
     this.state.visibleMap = el;

  }

  render() {
    const { loading, error, repos } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };

    const GettingStartedGoogleMap = withScriptjs( withGoogleMap(props => (
    <GoogleMap
      ref={props.onMapLoad}
      defaultZoom={9}
      defaultCenter={{ lat: 6.2442, lng: -75.5812 }}
      onClick={props.onMapClick}
    >
      {props.markers().map((marker, index) => (
        <Marker
          {...marker}
          onRightClick={() => props.onMarkerRightClick(index)}
        />
      ))}

      {props.routes.map((routeCoord, index) => (

        <Polygon
          key={index}
          path={routeCoord.coords}
          options={{
            strokeColor:routeCoord.strokeColor
          }}
        />
      ))}
      


       
    </GoogleMap>
  )));
    

    return (
      <article>
        <Helmet
          title="Medellin Map"
          meta={[
            { name: 'description', content: 'Medellin Map' }
          ]}
        />
        <div>
          <Section>
             <GettingStartedGoogleMap
                googleMapURL='https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBvLIinMuceI1Nb0RWwKWs9iLi5NoRPFsI'
                loadingElement={
                  <div style={{ height: `150px` }}>
                    <FaSpinner
                      style={{
                        display: `block`,
                        width: `80px`,
                        height: `80px`,
                        margin: `150px auto`,
                        animation: `fa-spin 2s infinite linear`,
                      }}
                    />
                  </div>
                }
                containerElement={
                  <div id='map-container' style={{ height: `500px` }} />
                }
                mapElement={
                  <div id='map-element' style={{ height: `500px` }} />
                }
                onMapLoad={_.noop}
                onMapClick={this.onMapClick}
                markers={mapMarkers}
                holdPolygon={this.holdPolygon}
                routes={this.props.displayRoute}
                onMarkerRightClick={_.noop}
              />
          </Section>
          
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  repos: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
  username: React.PropTypes.string,
  onChangeUsername: React.PropTypes.func,
  busRoutes: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  displayRoute: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const mapMarkers = function generateInitialMarkers() {
  const southWest = new google.maps.LatLng(6.02442, -75.95812);
  const northEast = new google.maps.LatLng(6.7442, -75.0812);

  const lngSpan = northEast.lng() - southWest.lng();
  const latSpan = northEast.lat() - southWest.lat();

  const markers = [];
  for (let i = 0; i < 5; i++) {
    const position = new google.maps.LatLng(
      southWest.lat() + latSpan * Math.random(),
      southWest.lng() + lngSpan * Math.random()
    );
    markers.push({
      key:i,
      position,
      content: `This is the secret message`.split(` `)[i],
      showInfo: false,
    });
  }
  return markers;
}

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  busRoutes: makeSelectBusRoutes(),
  displayRoute: makeSelectDisplayRoute(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
