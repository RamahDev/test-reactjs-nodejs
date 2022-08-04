import dateFormat from 'dateformat';
// @ts-ignore
dateFormat.i18n = {
  dayNames: [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  monthNames: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  timeNames: ['a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'],
};

export const checkTypes = (actionType: any, constants: any[]) =>
  constants
    .map((i: any) => {
      const values: any = Object.values(i);
      return {
        type: values[0]?.type,
        reducers: values[0]?.reducers,
      };
    })
    .find(({type}) => type === actionType);

export const translateResponse = (response: { data: any; isError: any; }) => {
  if (response?.data && !response?.isError) {
    return response?.data;
  }
  return false;
};

export const capitalizeFirstLetter = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const detectUrl = (pht: string) => {
  const sp = pht.split('https://');
  if (sp && sp.length === 2) {
    return {uri: pht};
  }
  return {uri: `data:image/jpeg;base64,${pht}`};
};

const deg2rad = (deg: number) => deg * (Math.PI / 180);
export const distanceEntre2Points = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  // Math.acos(Math.sin(deg2rad(B2)) * Math.sin(deg2rad(B3)) + Math.cos(deg2rad(B2)) * Math.cos(deg2rad(B3)) * Math.cos(deg2rad(C2 - C3))) * 6371;
  const R = 6373;
  const radlat1 = deg2rad(lat1);
  const radlat2 = deg2rad(lat2);
  const theta = lon1 - lon2;
  const radtheta = deg2rad(theta);
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist) * R;
  if (typeof dist === 'number' && dist.toString() !== 'NaN') {
    return dist.toFixed(2);
  }
  return '';
};

export const toDisplyaDate = (date: any) => {
  if (!date) {
    return '';
  } else if (Number(date) > 100000) {
    return dateFormat(new Date(Number(date)), 'dddd, mmmm dS, yyyy, h:MM TT');
  }
  return date;
};

export const options_date: any = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

export const filterLocation = (data: Array<any>, location: any) => {
  const day = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  const res = data
    .map(({deliveryLocation, ...rest}) => {
      let unity = '',
        value = '';
      const coords = deliveryLocation ? deliveryLocation[day] : null;
      if (coords && coords.longitude && coords.latitude) {
        value = distanceEntre2Points(
          coords.latitude,
          coords.longitude,
          location.latitude,
          location.longitude,
        );
        if (Number(value).toString() !== 'NaN') {
          if (Number(value) < 1) {
            unity = 'm';
            value = (Number(value) * 1000).toString();
          } else {
            unity = 'km';
          }
        }
      }
      return {
        ...rest,
        distance: {
          unity,
          value,
        },
      };
    })
    .sort((a, b) => {
      const a1 =
        Number(a?.distance?.value) > 0 ? Number(a?.distance?.value) : 10000000;
      const b1 =
        Number(b?.distance?.value) > 0 ? Number(b?.distance?.value) : 10000000;
      return a1 - b1;
    });
  return res;
};

export const displayCurrency = (currency: string) => {
  switch (currency?.toLowerCase()) {
    case 'chf':
      return 'CHF';
    case 'eur':
      return '€';
    default:
      return '€';
  }
};

export const exportToCsv = (filename: string, rows: any) => {
  var processRow = function (row: any) {
      var finalVal = '';
      for (var j = 0; j < row.length; j++) {
          var innerValue = row[j] === null ? '' : row[j].toString();
          if (row[j] instanceof Date) {
              innerValue = row[j].toLocaleString();
          };
          var result = innerValue.replace(/"/g, '""');
          if (result.search(/("|,|\n)/g) >= 0)
              result = '"' + result + '"';
          if (j > 0)
              finalVal += ',';
          finalVal += result;
      }
      return finalVal + '\n';
  };

  var csvFile = '';
  for (var i = 0; i < rows.length; i++) {
      csvFile += processRow(rows[i]);
  }

  var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
  // @ts-ignore
  if (navigator.msSaveBlob) { // IE 10+
    // @ts-ignore
    navigator.msSaveBlob(blob, filename);
  } else {
      var link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
          // Browsers that support HTML5 download attribute
          var url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", filename);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
  }
}
