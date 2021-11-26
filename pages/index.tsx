import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useContext, useState } from 'react';
import SearchableAsyncSelect from '../components/ui-kit/atoms/SearchableAsyncSelect/SearchableAsyncSelect';
import { IDiContainer, ServicesContext } from '../client/services';

const Home: NextPage = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>('');
  const { cityAPI } = useContext<IDiContainer>(ServicesContext);

  const fetchCities = async (searchTerm: string) => cityAPI.getCityNames(searchTerm);

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
          onChange={setSelectedCity}
          fetchOptions={fetchCities}
          value={selectedCity}
        />
      </Container>
    </Box>
  );
};

export default Home;
