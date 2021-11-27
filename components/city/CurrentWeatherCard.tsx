import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { blue, red } from '@mui/material/colors';
import Card from '@mui/material/Card';
import { dateToString } from '../../client/utils/dateAndTime';
import EmbeddedMap from '../ui-kit/atoms/EmbeddedMap/EmbeddedMap';
import { IWeatherEntry } from '../../types/services/IWeatherEntryRepository';

interface IProps {
  weatherEntry: IWeatherEntry,
}

const CurrentWeatherCard = ({ weatherEntry }: IProps) => (
  <Card>
    <CardContent>
      <Typography variant="h5" component="div">
        {weatherEntry.place_name}
      </Typography>

      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {dateToString(new Date(weatherEntry.datetime))}
      </Typography>

      <div>
        <Typography variant="h2" component="span" sx={{ color: red[500] }}>
          {weatherEntry.temperature_max}
          °
        </Typography>

        <Typography variant="h4" component="span" sx={{ color: blue[500] }}>
          {weatherEntry.temperature_min}
          °
        </Typography>

        <div>
          <EmbeddedMap
            place={weatherEntry.place_name}
            latitude={weatherEntry.latitude}
            longitude={weatherEntry.longitude}
          />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default CurrentWeatherCard;
