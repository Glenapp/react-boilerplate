import { Button, useTheme } from '@mui/material';
import Popover from '@mui/material/Popover';
import moment from 'moment-timezone';
import { useEffect, useState } from 'react';
import { DateRangePicker, defaultStaticRanges, Range } from 'react-date-range';
import DateRangeTwoToneIcon from '@mui/icons-material/DateRangeTwoTone';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import ArrowBackIosNewTwoToneIcon from '@mui/icons-material/ArrowBackIosNewTwoTone';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';
import { getDateRange, TimeTypes } from 'utils/date.utils';

const WEEKLY_SUMMARY_CALENDER_DATE_FORMAT = 'MMM DD';

enum TimeReportTypes {
    Summary = 'Summary',
    Detailed = 'Detailed',
    Weekly = 'Weekly',
    Shared = 'Shared'
}

interface Props {
    setDateRanges: React.Dispatch<React.SetStateAction<Range[]>>;
    ranges: Range[];
    setFiltered?: React.Dispatch<React.SetStateAction<boolean>>;
    timeReportTypesName?: TimeReportTypes;
    disable?: boolean;
    maxDate?: Date;
}

interface CustomStaticRange {
    label: string;
    range: () => Range;
    isSelected: (range: Range) => boolean;
}

const DatePicker = (props: Props) => {
    const { timeReportTypesName, disable, maxDate } = props;
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [change, setChange] = useState<boolean>(false);
    const [dateState, setDateState] = useState<TimeTypes>(TimeTypes.ThisMonth);

    const handlePrev = () => {
        const newDateRange = getDateRange(dateState, props.ranges[0], 'prev');
        props.setDateRanges([{ ...newDateRange }]);
    };

    const handleNext = () => {
        const newDateRange = getDateRange(dateState, props.ranges[0], 'next');
        props.setDateRanges([{ ...newDateRange }]);
    };

    const customStaticRanges: CustomStaticRange[] = [
        {
            label: 'This Week',
            range: () => ({
                startDate: moment().startOf('isoWeek').toDate(),
                endDate: moment().endOf('isoWeek').toDate()
            }),
            isSelected: (range: Range) => {
                const predefinedRange = customStaticRanges[0].range();
                return (
                    moment(range.startDate).isSame(predefinedRange.startDate, 'day') &&
                    moment(range.endDate).isSame(predefinedRange.endDate, 'day')
                );
            }
        },
        {
            label: 'Last Week',
            range: () => ({
                startDate: moment().subtract(1, 'week').startOf('isoWeek').toDate(),
                endDate: moment().subtract(1, 'week').endOf('isoWeek').toDate()
            }),
            isSelected: (range: Range) => {
                const predefinedRange = customStaticRanges[1].range();
                return (
                    moment(range.startDate).isSame(predefinedRange.startDate, 'day') &&
                    moment(range.endDate).isSame(predefinedRange.endDate, 'day')
                );
            }
        },
        {
            label: 'This Year',
            range: () => ({
                startDate: moment().startOf('year').toDate(),
                endDate: moment().endOf('day').toDate()
            }),
            isSelected: (range: Range) => {
                const predefinedRange = customStaticRanges[2].range();
                return (
                    moment(range.startDate).isSame(predefinedRange.startDate, 'day') &&
                    moment(range.endDate).isSame(predefinedRange.endDate, 'day')
                );
            }
        },
        {
            label: 'Last Year',
            range: () => ({
                startDate: moment().subtract(1, 'year').startOf('year').toDate(),
                endDate: moment().subtract(1, 'year').endOf('year').toDate()
            }),
            isSelected: (range: Range) => {
                const predefinedRange = customStaticRanges[3].range();
                return (
                    moment(range.startDate).isSame(predefinedRange.startDate, 'day') &&
                    moment(range.endDate).isSame(predefinedRange.endDate, 'day')
                );
            }
        }
    ];

    const staticRanges = [
        ...defaultStaticRanges.filter((x) => (timeReportTypesName === 'Weekly' ? false : !x.label?.includes('Week'))),
        ...customStaticRanges.filter((x) => (timeReportTypesName === 'Weekly' ? x.label?.includes('Week') : true))
    ];

    useEffect(() => {
        if (timeReportTypesName === TimeReportTypes.Weekly) {
            setDateState(TimeTypes.ThisWeek);
        }
        // eslint-disable-next-line
    }, [TimeTypes.ThisWeek]);

    const theme = useTheme();

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <ButtonGroup variant="outlined" aria-label="outlined button group" color="secondary" disabled={disable}>
                    <Button
                        variant="outlined"
                        onClick={(event) => setAnchorEl(event.currentTarget)}
                        sx={{
                            borderRadius: '12px',
                            overflow: 'hidden',
                            padding: { xs: '5px', sm: '5px 15px' }
                        }}
                    >
                        <DateRangeTwoToneIcon style={{ marginRight: '8px' }} />
                        {moment(props.ranges[0].startDate).format(WEEKLY_SUMMARY_CALENDER_DATE_FORMAT)} -{' '}
                        {moment(props.ranges[0].endDate).format(WEEKLY_SUMMARY_CALENDER_DATE_FORMAT)}
                    </Button>
                    {(timeReportTypesName === TimeReportTypes.Weekly ||
                        timeReportTypesName === TimeReportTypes.Summary ||
                        timeReportTypesName === TimeReportTypes.Detailed) && (
                        <>
                            <Button onClick={handlePrev} sx={{ padding: { xs: '5px', sm: '5px 15px' } }}>
                                <ArrowBackIosNewTwoToneIcon fontSize="inherit" />
                            </Button>
                            <Button
                                onClick={handleNext}
                                sx={{
                                    borderRadius: '12px',
                                    overflow: 'hidden'
                                }}
                            >
                                <ArrowForwardIosTwoToneIcon fontSize="inherit" />
                            </Button>
                        </>
                    )}
                </ButtonGroup>
            </Box>

            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => {
                    setAnchorEl(null);
                    if (props.ranges[0].startDate !== props.ranges[0].endDate && change && props.setFiltered) {
                        props.setFiltered(true);
                    }
                    setChange(false);
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        overflow: 'auto',
                        mx: 'auto',
                        '& .rdrDefinedRangesWrapper': {
                            maxWidth: '120px !important'
                        }
                    }}
                >
                    <DateRangePicker
                        staticRanges={staticRanges}
                        rangeColors={[theme.palette.secondary.dark]}
                        className={`date-range-picker-${theme.palette.mode === 'dark' ? 'dark' : 'light'}`}
                        color={theme.palette.secondary.dark}
                        inputRanges={[]}
                        editableDateInputs={true}
                        onChange={(item) => {
                            const date = item?.selection ? item.selection : item.range1;
                            const startDate = moment(date.startDate);
                            const endDate = moment(date.endDate);
                            const isThisYear =
                                moment(startDate).valueOf() === moment().startOf('year').valueOf() &&
                                moment(endDate).valueOf() === moment().endOf('day').valueOf();
                            const isLastYear =
                                moment(startDate).valueOf() === moment().subtract(1, 'year').startOf('year').valueOf() &&
                                moment(endDate).valueOf() === moment().subtract(1, 'year').endOf('year').valueOf();

                            const isThisMonth =
                                moment(startDate).valueOf() === moment().startOf('month').valueOf() &&
                                moment(endDate).valueOf() === moment().endOf('month').valueOf();
                            const isLastMonth =
                                moment(startDate).valueOf() === moment().subtract(1, 'month').startOf('month').valueOf() &&
                                moment(endDate).valueOf() === moment().subtract(1, 'month').endOf('month').valueOf();

                            const isThisWeek =
                                moment(startDate).valueOf() === moment().startOf('isoWeek').valueOf() &&
                                moment(endDate).valueOf() === moment().endOf('isoWeek').valueOf();
                            const isLastWeek =
                                moment(startDate).valueOf() === moment().subtract(1, 'week').startOf('isoWeek').valueOf() &&
                                moment(endDate).valueOf() === moment().subtract(1, 'week').endOf('isoWeek').valueOf();

                            if (isThisWeek) {
                                setDateState(TimeTypes.ThisWeek);
                            } else if (isLastWeek) {
                                setDateState(TimeTypes.LastWeek);
                            } else if (isThisYear) {
                                setDateState(TimeTypes.ThisYear);
                            } else if (isLastYear) {
                                setDateState(TimeTypes.LastYear);
                            } else if (isThisMonth) {
                                setDateState(TimeTypes.ThisMonth);
                            } else if (isLastMonth) {
                                setDateState(TimeTypes.LastMonth);
                            } else {
                                // Custom range selected, reset dateState to empty
                                setDateState(TimeTypes.Empty);
                            }
                            if (timeReportTypesName === TimeReportTypes.Weekly) {
                                const dateToPick =
                                    moment(date.startDate).isoWeek() === moment(date.endDate).isoWeek()
                                        ? date.startDate
                                        : !props.ranges.length ||
                                          moment(date.startDate).isoWeek() !== moment(props.ranges[0].startDate).isoWeek()
                                        ? date.startDate
                                        : date.endDate;
                                const startDateWeekly = moment(dateToPick).startOf('isoWeek').toDate();
                                const endDateWeekly = moment(dateToPick).endOf('isoWeek').toDate();
                                setDateState(TimeTypes.ThisWeek);
                                props.setDateRanges([{ startDate: startDateWeekly, endDate: endDateWeekly }]);
                            } else {
                                props.setDateRanges([item.selection ? item.selection : item.range1]);
                            }

                            setChange(true);
                        }}
                        moveRangeOnFirstSelection={false}
                        ranges={props.ranges}
                        showDateDisplay={false}
                        maxDate={maxDate}
                    />
                </Box>
            </Popover>
        </>
    );
};

export default DatePicker;
