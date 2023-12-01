import { Props } from 'react-apexcharts';

const getReportSummaryChartData = (
    minDate?: Date,
    maxDate?: Date,
    dates?: Date[],
    values?: { capexProjects: number[]; opexProjects: number[] },
    colors?: string[],
    theme: 'dark' | 'light' = 'light'
): Props => ({
    height: 350,
    type: 'bar',
    options: {
        theme: {
            mode: theme
        },
        chart: {
            id: 'basic-bar',
            background: 'transparent',
            stacked: true,
            toolbar: {
                show: true,
                tools: {
                    download: false
                }
            },
            zoom: {
                enabled: true
            },
            events: {
                beforeZoom: (e, { xaxis }) => {
                    const zoomDifference = xaxis.max - xaxis.min;
                    if (zoomDifference > (maxDate?.valueOf() || 0) - (minDate?.valueOf() || 0)) {
                        return {
                            // dont zoom out any further
                            xaxis: {
                                min: minDate?.getTime(),
                                max: maxDate?.getTime()
                            }
                        };
                    } else if (zoomDifference <= 2 * 24 * 60 * 60 * 1000) {
                        return {
                            // dont zoom in any further
                            xaxis: {
                                min: minDate?.getTime(),
                                max: maxDate?.getTime()
                            }
                        };
                    } else {
                        return {
                            // keep on zooming
                            xaxis: {
                                min: xaxis.min,
                                max: xaxis.max
                            }
                        };
                    }
                }
            }
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    legend: {
                        position: 'bottom',
                        offsetX: -10,
                        offsetY: 0
                    }
                }
            }
        ],
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%'
            }
        },
        xaxis: {
            labels: {
                show: dates?.length ? true : false
            },
            type: 'datetime',
            categories: dates?.map((x) => x.getTime()) || [],
            min: minDate?.getTime(),
            max: maxDate?.getTime()
        },
        yaxis: {
            labels: {
                show: true
            }
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy'
            }
        },
        legend: {
            show: true,
            position: 'bottom',
            offsetX: 20,
            labels: {
                useSeriesColors: false
            },
            markers: {
                width: 16,
                height: 16,
                radius: 5
            },
            itemMargin: {
                horizontal: 15,
                vertical: 8
            }
        },
        fill: {
            type: 'solid'
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            show: true,
            xaxis: {
                lines: {
                    show: false
                }
            },
            yaxis: {
                lines: {
                    show: true
                }
            }
        }
    },
    series: [
        {
            name: 'Capex',
            data: values?.capexProjects || []
        },
        {
            name: 'Opex',
            data: values?.opexProjects || []
        }
    ]
});
export default getReportSummaryChartData;
