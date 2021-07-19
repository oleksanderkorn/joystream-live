import moment from 'moment';

moment.defaultFormat = 'YYYY-MM-DD HH:mm:ss';

export const log = (...values: any[]) => {
    // Uncomment to enable logging allover the app
    // console.log(`[${moment().format()}]:`, ...values);
}

export const error = (...values: any[]) => {
    console.error(`[${moment().format()}]:`, ...values);
}
