import type { NextPage } from 'next';
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
        <SearchableAsyncSelect<string>
          label="Search by city name"
          onChange={redirectToCityPage}
          fetchOptions={fetchCities}
          value={null}
        />
      </Container>
    </Box>
  );
};

export default Home;
