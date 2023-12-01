import React, { useEffect, useState } from 'react';

// material-ui
// import Chart from 'react-apexcharts';
import { Grid, Typography } from '@mui/material';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

// chart data
// import getReportSummaryChartData from './chart-data/report-summary-bar-chart';
// import moment from 'moment-timezone';
// import ProjectService from 'services/project.service';

// Define the props interface for ProjectReportChart
interface ProjectReportChartProps {
    selectedTab: string | undefined;
}

const ProjectReportChart = ({ selectedTab }: ProjectReportChartProps) => {
    // const [ReportChartDataValue, setReportChartDataValue] = useState<any>(
    //     getReportSummaryChartData(reportsDateRange[0]?.startDate, reportsDateRange[0]?.endDate, [])
    // );
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Function to extract dates from data
    // const getDates = (data: any) => {
    //     const dates = data ? Object.keys(data)?.map((chart) => moment(chart).toDate()) : [];
    //     return dates;
    // };

    useEffect(() => {
        if (selectedTab === 'graphical') {
            // const getChartData = () => {
            //     const filters: any = {
            //         createdStartDate: reportsDateRange[0].startDate,
            //         startDate: reportsDateRange[0].endDate,
            //         groupType: 'ProjectType'
            //     };
            //     // Fetch project chart data
            //     ProjectService.getProjectsChartAsync(filters).then((res: any) => {
            //         setIsLoading(false);
            //         // Extract Capex and Opex project counts and dates
            //         const capexProjects = res
            //             ? Object.keys(res?.dateToSeriesMap)?.map((chart) => {
            //                   let obj = res?.dateToSeriesMap[chart]?.find((o: any) => o.name === 'Total Capex Projects');
            //                   return obj?.count;
            //               })
            //             : [];
            //         const opexProjects = res
            //             ? Object.keys(res?.dateToSeriesMap)?.map((chart) => {
            //                   let obj = res?.dateToSeriesMap[chart]?.find((o: any) => o.name === 'Total Opex Projects');
            //                   return obj?.count;
            //               })
            //             : [];
            //         const dates = getDates(res?.dateToSeriesMap);
            //         // Set the chart data value
            //         // setReportChartDataValue(
            //         //     getReportSummaryChartData(reportsDateRange[0]?.startDate, reportsDateRange[0]?.endDate, dates, {
            //         //         capexProjects,
            //         //         opexProjects
            //         //     })
            //         // );
            //     });
            // };
            // getChartData();
        }
    }, [selectedTab]);

    return (
        <>
            {isLoading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="subtitle2">Projects Growth</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h3"></Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            {/* <Chart {...ReportChartDataValue} /> */}
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
};

export default ProjectReportChart;
