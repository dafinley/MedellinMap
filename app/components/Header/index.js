import React from 'react';
import { FormattedMessage } from 'react-intl';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import Toggle from 'material-ui/Toggle';
import SidebarMenu from 'containers/SidebarMenu';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
 
constructor(props) {
    super(props);
    this.state = {open: false};
  }

handleToggle = () => this.setState({open: !this.state.open});

handleClose = () => this.setState({open: false});

 render() {
    return (
      <div>
      <SidebarMenu />
       </div>
    );
  }
}

export default Header;
