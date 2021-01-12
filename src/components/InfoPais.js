import { Card, CardContent, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  card: {
    marginTop: '20px',
  },
}));

export default function InfoPais({ pais }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        {pais ? (
          <>
            <Typography variant="h6" gutterBottom>
              Información útil
            </Typography>
            <Typography>
              Para llamar a <b>{pais.name}</b> tenés que anteponer +
              {pais.callingCodes[0]} al número.
            </Typography>
          </>
        ) : (
          <Typography variant="subtitle1">
            Aquí te mostraremos información sobre el país que elijas.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

InfoPais.propTypes = {
  pais: PropTypes.object,
};
