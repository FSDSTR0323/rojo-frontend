import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

export class Success extends Component {
  continue = e => {
        e.preventDefault();
        // Proccess Form // Send data to backend //
        this.props.nextStep();
    }
  back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
  render() {   
       return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Success" />
          <h1>¡Gracias por registrarte! </h1>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}


export default Success; 