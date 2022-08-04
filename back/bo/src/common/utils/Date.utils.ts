import * as dayjs from 'dayjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as relativeTime from 'dayjs/plugin/relativeTime';

require('dayjs/locale/fr');

const format = 'YYYY-MM-DDTHH:mm:ss.sssZ';

export const formatDateToLocaleWithHour = (dateHour) =>
  dayjs(dateHour, format).format('DD/MM/YYYY, à HH[h]mm');

// eslint-disable-next-line no-confusing-arrow
export const formatDateToLocale = (date) =>
  date ? dayjs(date, format).format('DD/MM/YYYY') : dayjs().format('DD/MM/YYYY');

export const dayFromNow = (dateHour) => dayjs(dateHour, format).fromNow(true);
