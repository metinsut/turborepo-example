import moment from 'moment';

moment.updateLocale('en', {
  relativeTime: {
    M: '1M',
    MM: '%dM',
    d: '1d',
    dd: '%dd',
    future: 'in %s',
    h: '1h',
    hh: '%dh',
    m: '1m',
    mm: '%dm',
    past: '%s ago',
    s: 'seconds',
    ss: '%ss',
    y: '1Y',
    yy: '%dY'
  }
});
