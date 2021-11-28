import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import SearchableAsyncSelect from '../components/ui-kit/atoms/SearchableAsyncSelect/SearchableAsyncSelect';
import { services, } from '../client/services';

const Home: NextPage = () => {
  const { cityAPI } = services;

  const fetchCities = async (searchTerm: string) => cityAPI.getCityNames(searchTerm);

  const router = useRouter();
  const redirectToCityPage = (name: string | null) => {
    if (name === null) throw new Error('Selected city name can not be empty.');

    return router.push(`/city/${name}`);
  };

  return (
    <>
      <Head>
        <title>The most precise weather forecast</title>
        <meta name="description" content="Checkout  weather information for some cities in the Netherlands" />
      </Head>

      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container
          maxWidth="sm"
        >
          <Box sx={{ marginBottom: '30px' }}>
            <Image src="/imgs/clouds.jpeg" width="552" height="305" alt="Magnificent sky" />
          </Box>

          <SearchableAsyncSelect<string>
            label="Search by city name"
            onChange={redirectToCityPage}
            fetchOptions={fetchCities}
            value={null}
          />
        </Container>
      </Box>
    </>
  );
};

export default Home;
