import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';


export class FormOwnerDetails extends Component {
  continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }
  render() {
    const { values, handleChange } = this.props;
       return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Indicanos tus datos fiscales" />
          <TextField
            hintText="Nombre"
            floatingLabelText="Nombre"
            onChange={handleChange('firstName')}
            defaultValue={values.firstName}
          />
          <TextField
            hintText="Apellidos"
            floatingLabelText="Apellidos"
            onChange={handleChange('lastName')}
            defaultValue={values.lastName}
          />
          <br/>
          <TextField
            hintText="Email"
            floatingLabelText="Email"
            onChange={handleChange('email')}
            defaultValue={values.email}
          />
          <TextField
            hintText="Teléfono"
            floatingLabelText="Teléfono"
            onChange={handleChange('email')}
            defaultValue={values.email}
          />
          <br/>
          <TextField
            hintText="Dirección completa"
            floatingLabelText="Dirección completa"
            onChange={handleChange('fullAdress')}
            defaultValue={values.email}
          />
          <br/>
          <TextField
            hintText="C.P."
            floatingLabelText="C.P."
            onChange={handleChange('cp')}
            defaultValue={values.email}
          />
          <TextField
            hintText="Población"
            floatingLabelText="Población"
            onChange={handleChange('city')}
            defaultValue={values.email}
          />
          <TextField
            hintText="Provincia"
            floatingLabelText="Provincia"
            onChange={handleChange('province')}
            defaultValue={values.email}
          />
          <br/>
          <TextField
            hintText="IBAN"
            floatingLabelText="IBAN"
            onChange={handleChange('iban')}
            defaultValue={values.email}
          />
          <br/>
          <Button
            label="Continue"
            primary={true}
            style={styles.button}
            onClick={this.continue}
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

export default FormOwnerDetails 