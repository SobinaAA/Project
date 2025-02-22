import moment from 'moment';

export const DATE_AND_TIME_FORMAT = 'YYYY/MM/DD HH:mm:ss';
export const DATE_FORMAT = 'YYYY/MM/DD';

export function formatDateToDateAndTime(dateString: string | Date) {
  return moment(dateString).format(DATE_AND_TIME_FORMAT);
}
