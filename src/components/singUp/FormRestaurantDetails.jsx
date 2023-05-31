import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export class FormRestaurantDetails extends Component {
  continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

  back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
  render() {
    const { values, handleChange } = this.props;
       return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Indicanos los datos de tu restaurante" />
          <TextField
            hintText="Nombre del restaurante"
            floatingLabelText="Nombre del restaurante"
            onChange={handleChange('restaurantName')}
            defaultValue={values.restaurantName}
          />
          <br/>
          <TextField
            hintText="Dirección"
            floatingLabelText="Dirección"
            onChange={handleChange('fullAdress')}
            defaultValue={values.fullAdress}
          />
          <br/>
          <TextField
            hintText="C.P."
            floatingLabelText="C.P."
            onChange={handleChange('cp')}
            defaultValue={values.cp}
          />
          <TextField
            hintText="Población"
            floatingLabelText="Población"
            onChange={handleChange('city')}
            defaultValue={values.city}
          />
          <TextField
            hintText="Provincia"
            floatingLabelText="Provincia"
            onChange={handleChange('province')}
            defaultValue={values.province}
          />
          <br/>
          <RaisedButton
            label="Continue"
            primary={true}
            style={styles.button}
            onClick={this.continue}
          />
          <RaisedButton
            label="Back"
            primary={false}
            style={styles.button}
            onClick={this.back}
          />
        </React.Fragment>
      </MuiThemeProvider>
    )
  }
}

const styles = {
  button: {
    margin: 15
  }
}

export default FormRestaurantDetails 