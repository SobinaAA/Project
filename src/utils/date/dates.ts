import moment from 'moment';

const DATE_AND_TIME_FORMAT = 'YYYY/MM/DD HH:mm';
// const DATE_FORMAT = 'YYYY/MM/DD';

export function formatDateToDateAndTime(dateString: string) {
  return moment(dateString).format(DATE_AND_TIME_FORMAT);
}
