import { Typography } from '@material-ui/core';
import CountrySelect from './CountrySelect';
import InfoPais from './InfoPais';

export default function Home() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Enciclopedia
      </Typography>
      <CountrySelect />
      <InfoPais />
    </>
  );
}
