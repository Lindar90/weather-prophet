const dateToString = (date: Date) => {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'full',
  }).format(date);
};

export {
  dateToString,
};
