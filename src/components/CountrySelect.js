import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { useRecoilState, useRecoilValue } from 'recoil';
import { paisSeleccionadoState, todosLosPaisesState } from '../state/paises';

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode
        .toUpperCase()
        .replace(/./g, (char) =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode;
}

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

export default function CountrySelect() {
  const classes = useStyles();
  const [pais, setPais] = useRecoilState(paisSeleccionadoState);
  const paises = useRecoilValue(todosLosPaisesState);

  return (
    <Autocomplete
      value={pais}
      onChange={(_event, newValue) => {
        setPais(newValue);
      }}
      id="country-select-demo"
      style={{ width: 300 }}
      options={paises}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      getOptionLabel={(option) => option.name}
      renderOption={(option) => (
        <React.Fragment>
          <span>{countryToFlag(option.alpha2Code)}</span>
          {option.name} ({option.alpha2Code}) +{option.callingCodes[0]}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Elegí un país"
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}
