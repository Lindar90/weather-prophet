import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { ParsedUrlQuery } from 'querystring';
import CurrentWeatherCard from '../../components/city/CurrentWeatherCard';
import { services } from '../../client/services';
import LastWeekWeather from '../../components/city/LastWeekWeather';
import { IWeatherEntry } from '../../types/services/IWeatherEntryRepository';

type IProps = {
  entries: IWeatherEntry[],
};

interface IParams extends ParsedUrlQuery {
  name: string,
}

export const getServerSideProps: GetServerSideProps<IProps, IParams> = async (context) => {
  if (!context.params) throw new Error('Params are not defined.');

  const { name } = context.params;
  const { entriesAPI } = services;
  const entries = await entriesAPI.getAll(name);

  return {
    props: {
      entries,
    },
  };
};

const City = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { entries } = props;

  const [currentDay, ...restDays] = entries;

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <CurrentWeatherCard weatherEntry={currentDay} />
          </Grid>

          <Grid item xs={12} md={8}>
            <LastWeekWeather weekDays={restDays} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default City;
