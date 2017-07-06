/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import Header from 'components/Header';
import Footer from 'components/Footer';
import withProgressBar from 'components/ProgressBar';
import {deepOrange500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';



const AppWrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const styles = {
  divWrap:{
    display: 'flex',
    flexDirection: 'row wrap',
    padding: 20,
    width: '100%'
  }
}

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});


export function App(props) {
  return (
   <MuiThemeProvider muiTheme={muiTheme}>
    <AppWrapper>
      <Helmet
        titleTemplate="%s - Medellin Map"
        defaultTitle="Medellin Map"
        meta={[
          { name: 'description', content: 'Medellin Map' },
        ]}
      />
      <Header />
      {React.Children.toArray(props.children)}
      
    </AppWrapper>
   </MuiThemeProvider>
  );
}

App.propTypes = {
  children: React.PropTypes.node,
};

export default withProgressBar(App);
