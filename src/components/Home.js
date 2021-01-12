import { Typography } from '@material-ui/core';
import { useState } from 'react';
import CountrySelect from './CountrySelect';
import InfoPais from './InfoPais';

export default function Home() {
  const [pais, setPais] = useState();
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Enciclopedia
      </Typography>
      <CountrySelect
        onChange={(_event, newValue) => {
          setPais(newValue);
        }}
      />
      <InfoPais pais={pais} />
    </>
  );
}
