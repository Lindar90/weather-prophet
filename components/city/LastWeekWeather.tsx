import CardContent from '@mui/material/CardContent';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import { blue, red } from '@mui/material/colors';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { dateToString } from '../../client/utils/dateAndTime';
import { IWeatherEntry } from '../../types/services/IWeatherEntryRepository';

interface IProps {
  weekDays: IWeatherEntry[],
}

const LastWeekWeather = ({ weekDays }: IProps) => {
  const [selectedDate, setSelectedDate] = useState<string>('');

  const filteredDays = selectedDate
    ? weekDays.filter((d) => {
      return dateToString(new Date(d.datetime)) === dateToString(new Date(selectedDate));
    })
    : weekDays;

  return (
    <Card>
      <CardContent>
        <h2>Last week:</h2>

        <TextField type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />

        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">Min/Max temp.</TableCell>
                <TableCell align="right">Precipitation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDays.map((day) => (
                <TableRow
                  key={day.datetime}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {dateToString(new Date(day.datetime))}
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="h6" component="span" sx={{ color: red[500] }}>
                      {day.temperature_max}
                      °
                    </Typography>
                    /
                    <Typography variant="h6" component="span" sx={{ color: blue[500] }}>
                      {day.temperature_min}
                      °
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {day.precipitation_mm}
                    mm
                    {' '}
                    {day.precipitation_probability}
                    %
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default LastWeekWeather;
