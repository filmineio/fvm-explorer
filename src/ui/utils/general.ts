type TruncateString = (address: string, length: number) => string;
export const truncateString: TruncateString = (address, length) => {
  if (address.length <= length) return address;

  const separator = '...';

  const sepLen = separator.length;
  const charsToShow = length - sepLen;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);

  return (
    address.substr(0, frontChars) + separator + address.substr(address.length - backChars)
  );
};

type TimePassFromTimestamp = (timestamp: number) => string;
export const timePassFromTimestamp: TimePassFromTimestamp = (timestamp) => {
  const timeDiff = new Date().valueOf() - new Date(timestamp).valueOf();

  const days   = Math.floor(timeDiff / 86400);
  const hours   = Math.floor((timeDiff - (days * 86400)) / 3600);
  const minutes = Math.floor((timeDiff - (days * 86400) - (hours * 3600)) / 60);
  const seconds = timeDiff - (days * 86400) - (hours * 3600) - (minutes * 60);

  const format = (v: number, l?: string, leadingZero = true) => {
    if ( v === 0) return ''
    return (v < 10 ? leadingZero ? '0' : '' : '') + v.toString() + l
  };

  return format(days, 'd ', false) + format(hours, 'h ') + format(minutes, 'm ') + format(seconds, 's ago');
};

type RoundNumber = (n: number | undefined, digits?: number) => number | undefined;
export const roundNumber: RoundNumber = (n, digits = 2) => {
  if (!n) return undefined;
  return Math.round((n + Number.EPSILON) * Math.pow(10, digits)) / Math.pow(10, digits);
};

type HumanReadableSize = (
  value: number,
  si: boolean,
  decimalPlaces: number,
  unit: string,
) => string;
export const humanReadableSize: HumanReadableSize = (
  value,
  si,
  decimalPlaces = 1,
  unit,
) => {
  const thresh = si ? 1024 : 1000;

  let unitNivelator;
  switch (unit.toLowerCase()) {
    case 'B':
      unitNivelator = 0;
      break;
    case 'kb':
    case 'kib':
      unitNivelator = 1;
      break;
    case 'mb':
    case 'mib':
      unitNivelator = 2;
      break;
    case 'gb':
    case 'gib':
      unitNivelator = 3;
      break;
    case 'tb':
    case 'tib':
      unitNivelator = 4;
      break;
    case 'pb':
    case 'pib':
      unitNivelator = 5;
      break;
    case 'eb':
    case 'eib':
      unitNivelator = 6;
      break;
    case 'zb':
    case 'zib':
      unitNivelator = 7;
      break;
    case 'yb':
    case 'yib':
      unitNivelator = 8;
      break;
    default:
      unitNivelator = 0;
      break;
  }

  if (Math.abs(value) < thresh) {
    return `${value} B`;
  }

  const units = !si
    ? ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = unitNivelator;
  const r = 10 ** decimalPlaces;

  let valueCopy = value;
  do {
    valueCopy /= thresh;
    u += 1;
  } while (Math.round(Math.abs(valueCopy) * r) / r >= thresh && u < units.length - 1);

  return `${Math.round(valueCopy * 10 ** decimalPlaces) / 10 ** decimalPlaces} ${
    units[u]
  }`;
};