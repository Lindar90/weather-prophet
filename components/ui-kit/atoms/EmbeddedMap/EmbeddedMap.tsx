interface IProps {
  latitude: number,
  longitude: number,
  place: string,
}

const EmbeddedMap = ({ place, latitude, longitude }: IProps) => {
  const apiKey = process.env.NEXT_PUBLIC_GMAPS_API_KEY;

  return (
    <iframe
      loading="lazy"
      title="map"
      width="100%"
      height="250"
      frameBorder="0"
      style={{ border: 0 }}
      src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${place}&center=${latitude},${longitude}&zoom=10`}
      allowFullScreen
    />
  );
};

export default EmbeddedMap;
