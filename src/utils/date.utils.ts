import moment from 'moment-timezone';
import { Range } from 'react-date-range';

export function formatDateForTracker(date: string) {
    return moment(date).format('MMM D, YYYY HH:mm:ss');
}

export enum TimeTypes {
    Weekly = 'Weekly',
    ThisMonth = 'This Month',
    ThisYear = 'This Year',
    LastYear = 'Last Year',
    LastMonth = 'Last Month',
    ThisWeek = 'This Week',
    LastWeek = 'Last Week',
    Empty = ''
}

export const getDateRange = (
    timeType: TimeTypes,
    currentDateRange: Range,
    direction: 'prev' | 'next'
): { startDate: Date; endDate: Date } => {
    const { startDate, endDate } = currentDateRange;
    if (direction === 'next') {
        switch (timeType) {
            case TimeTypes.ThisWeek:
            case TimeTypes.LastWeek:
                return {
                    startDate: moment(startDate).add(1, 'week').startOf('isoWeek').toDate(),
                    endDate: moment(startDate).add(1, 'week').endOf('isoWeek').toDate()
                };
            case TimeTypes.LastMonth:
            case TimeTypes.ThisMonth:
                return {
                    startDate: moment(startDate).add(1, 'month').startOf('month').toDate(),
                    endDate: moment(startDate).add(1, 'month').endOf('month').toDate()
                };
            case TimeTypes.ThisYear:
            case TimeTypes.LastYear:
                return {
                    startDate: moment(startDate).add(1, 'year').startOf('year').toDate(),
                    endDate: moment(startDate).add(1, 'year').endOf('year').toDate()
                };
            default:
                const gap = moment(endDate).unix() - moment(startDate).unix();

                return {
                    startDate: moment(startDate)
                        .add(gap + 24 * 60 * 60, 'seconds')
                        .toDate(),
                    endDate: moment(endDate)
                        .add(gap + 24 * 60 * 60, 'seconds')
                        .toDate()
                };
        }
    } else {
        switch (timeType) {
            case TimeTypes.LastWeek:
            case TimeTypes.ThisWeek:
                return {
                    startDate: moment(startDate).subtract(1, 'week').startOf('isoWeek').toDate(),
                    endDate: moment(startDate).subtract(1, 'week').endOf('isoWeek').toDate()
                };
            case TimeTypes.LastMonth:
            case TimeTypes.ThisMonth:
                return {
                    startDate: moment(startDate).subtract(1, 'month').startOf('month').toDate(),
                    endDate: moment(startDate).subtract(1, 'month').endOf('month').toDate()
                };
            case TimeTypes.ThisYear:
            case TimeTypes.LastYear:
                return {
                    startDate: moment(startDate).subtract(1, 'year').startOf('year').toDate(),
                    endDate: moment(startDate).subtract(1, 'year').endOf('year').toDate()
                };
            default:
                const gap = moment(endDate).unix() - moment(startDate).unix();
                return {
                    startDate: moment(startDate)
                        .subtract(gap + 24 * 60 * 60, 'seconds')
                        .toDate(),
                    endDate: moment(endDate)
                        .subtract(gap + 24 * 60 * 60, 'seconds')
                        .toDate()
                };
        }
    }
};
