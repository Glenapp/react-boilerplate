import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, FormControl, Grid, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { IconPlus } from '@tabler/icons';
import InputFieldTemplate from './InputFieldTemplate';
import { CostsState } from './interfaces/interfaces';

interface ProjectSectionProps {
    capexCostYearList: any;
    setCapexCostYearList: any;
    color: string;
    heading: string;
    data: any;
    filter: string | null;
}

const ProjectSection: React.FC<any> = ({ form, color, heading, data, filter, setForm, autoFocus, setAutoFocus, submit }) => {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    const [costs, setCosts] = useState<CostsState>({
        capexCostYearList: [],
        opexCostYearList: [],
        runCostYearList: []
    });
    const handleAddYear = (costType: string) => {
        setCosts((prevCosts: any) => ({
            ...prevCosts,
            [`${costType}YearList`]: [
                ...prevCosts[`${costType}YearList`],
                { year: currentYear + prevCosts[`${costType}YearList`].length, value: 0 }
            ]
        }));
    };

    const handleDeleteYear = (costType: string, index: number) => {
        setCosts((prevCosts: CostsState) => ({
            ...prevCosts,
            [`${costType}YearList` as keyof CostsState]: prevCosts[`${costType}YearList` as keyof CostsState].filter(
                (_, filIndex: number) => filIndex !== index
            )
        }));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAutoFocus(e.target.name);
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleDateChange = (val: any, name: string) => {
        setAutoFocus(name);
        setForm({ ...form, [name]: val });
    };

    const handleCostChange = (type: string, value: number | string, name: string) => {
        setAutoFocus(name);
        const listId = getFieldId(type);
        if (listId) {
            setForm({ ...form, [listId]: { ...form[listId], [name]: value } });
        }
    };

    const getFieldId = (type: string) => {
        const result = data?.filter((item: any) => item.name === type);
        let listId: any = '';
        if (result?.length) {
            listId = result[0]?.id;
        }
        return listId;
    };

    const getYear = (val: string) => {
        const yearRegex = /\b\d{4}\b/;
        const match = val.match(yearRegex);
        if (match) {
            const year = match[0];
            return parseInt(year);
        }
    };

    const getYearCost = (year: any, list: any) => {
        let cost = 0;
        Object?.keys(list)?.map((item) => {
            const match = item.match(year);
            if (match) {
                cost = cost + parseInt(list[item]);
            }
        });
        return cost;
    };

    const getTotalCost = (type: string) => {
        let cost = 0;
        if (type === 'capexCost') {
            costs?.capexCostYearList?.map((item: any) => {
                if (item?.value) cost = cost + parseInt(item?.value);
            });
        }
        if (type === 'opexCost') {
            costs?.opexCostYearList?.map((item: any) => {
                if (item?.value) cost = cost + parseInt(item?.value);
            });
        }
        if (type === 'runCost') {
            costs?.runCostYearList?.map((item: any) => {
                if (item?.value) cost = cost + parseInt(item?.value);
            });
        }
        return cost;
    };

    const renderCostSection = (filterType: string) => {
        const costType =
            filterType === 'CAPEX Cost' ? 'capexCost' : filterType === 'OPEX One-Off PROJECT cost only' ? 'opexCost' : 'runCost';

        return (
            <Box sx={{ mt: 2 }}>
                <Button variant="contained" onClick={() => handleAddYear(costType)} size="large" startIcon={<IconPlus />}>
                    Add Year
                </Button>
                {costs[`${costType}YearList`]?.map((item: any, index: number) => (
                    <Grid container spacing={2} sx={{ mt: '5px' }} key={item?.year}>
                        <Grid item lg={6}>
                            <FormControl fullWidth>
                                <InputLabel>
                                    {item?.year}{' '}
                                    {costType === 'capexCost'
                                        ? 'Capex Allocation'
                                        : costType === 'opexCost'
                                        ? 'Opex Funded by UniOPS'
                                        : 'Run UniOps'}{' '}
                                    (Euros)
                                </InputLabel>
                                <OutlinedInput
                                    type="number"
                                    value={
                                        form[getFieldId(`${costType.charAt(0).toUpperCase() + costType.slice(1)} Cost`)]?.[
                                            `${item?.year}-${costType.toLowerCase()}`
                                        ]
                                    }
                                    name={`${item?.year}-${costType.toLowerCase()}`}
                                    onChange={(e) =>
                                        handleCostChange(
                                            costType === 'capexCost' ? 'Capex Cost' : costType === 'opexCost' ? 'Opex Cost' : 'Run Cost',
                                            e.target.value,
                                            e.target.name
                                        )
                                    }
                                    label={`${item?.year} ${
                                        costType === 'capexCost'
                                            ? 'Capex Allocation'
                                            : costType === 'opexCost'
                                            ? 'Opex Funded by UniOPS'
                                            : 'Run UniOps'
                                    } (Euros)`}
                                    inputProps={{
                                        min: 0 // Disallow negative numbers
                                    }}
                                    autoFocus={autoFocus === `${item?.year}-${costType.toLowerCase()}` ? true : false}
                                    onKeyDown={(e) => {
                                        // Prevent typing the minus sign (-) or hyphen key (–)
                                        if (e.key === '-' || e.key === '–') {
                                            e.preventDefault();
                                        }
                                    }}
                                />
                            </FormControl>
                        </Grid>
                        {costType !== 'capexCost' && (
                            <Grid item lg={5}>
                                <FormControl fullWidth>
                                    <InputLabel>
                                        {item?.year} {costType === 'opexCost' ? 'Opex Funded by Clustor' : 'Run Clustor'} (Euros)
                                    </InputLabel>
                                    <OutlinedInput
                                        type="number"
                                        value={
                                            form[getFieldId(`${costType.charAt(0).toUpperCase() + costType.slice(1)} Cost`)]?.[
                                                `${item?.year}-${costType.toLowerCase()}-clustor`
                                            ]
                                        }
                                        name={`${item?.year}-${costType.toLowerCase()}-clustor`}
                                        onChange={(e) =>
                                            handleCostChange(
                                                costType === 'opexCost' ? 'Opex Cost' : 'Run Cost',
                                                e.target.value,
                                                e.target.name
                                            )
                                        }
                                        label={`${item?.year} ${
                                            costType === 'opexCost' ? 'Opex Funded by Clustor' : 'Run Clustor'
                                        } (Euros)`}
                                        inputProps={{
                                            min: 0 // Disallow negative numbers
                                        }}
                                        autoFocus={autoFocus === `${item?.year}-${costType.toLowerCase()}-clustor` ? true : false}
                                        onKeyDown={(e) => {
                                            // Prevent typing the minus sign (-) or hyphen key (–)
                                            if (e.key === '-' || e.key === '–') {
                                                e.preventDefault();
                                            }
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                        )}
                        {index > 0 && (
                            <Grid item lg={1}>
                                <Button
                                    variant="contained"
                                    onClick={() => handleDeleteYear(costType, index)}
                                    fullWidth
                                    size="large"
                                    color="error"
                                >
                                    Delete
                                </Button>
                            </Grid>
                        )}
                    </Grid>
                ))}
                <Grid container spacing={3} sx={{ mt: 1 }}>
                    <Grid item lg={6}>
                        {' '}
                        <FormControl fullWidth>
                            <InputLabel>
                                Total {costType === 'capexCost' ? 'Capex' : costType === 'opexCost' ? 'Opex' : 'Run'} Cost
                            </InputLabel>
                            <OutlinedInput
                                type="number"
                                value={getTotalCost(costType)}
                                name={`total-${costType.toLowerCase()}-cost`}
                                label={`Total ${costType === 'capexCost' ? 'Capex' : costType === 'opexCost' ? 'Opex' : 'Run'} Allocation`}
                                disabled
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        );
    };

    useEffect(() => {
        const opexId = getFieldId('Opex Cost');
        const capexId = getFieldId('Capex Cost');
        const runCostId = getFieldId('Run Cost');

        const updateCostYearList = (costType: string, formId: string) => {
            if (form[formId]) {
                let yearList: any = [];

                Object.keys(form[formId])?.forEach((item: any) => {
                    if (getYear(item) && !yearList?.filter((year: any) => year.year === getYear(item))?.length) {
                        yearList.push({ year: getYear(item), value: getYearCost(getYear(item), form[formId]) });
                    }
                });
                if (yearList?.length === 1) {
                    yearList.push({ year: currentYear + 1, value: 0 });
                }

                setCosts((prevCosts) => ({
                    ...prevCosts,
                    [`${costType}YearList`]: yearList
                }));
            } else {
                setCosts((prevCosts) => ({
                    ...prevCosts,
                    [`${costType}YearList`]: [
                        { year: currentYear, value: 0 },
                        { year: currentYear + 1, value: 0 }
                    ]
                }));
            }
        };

        updateCostYearList('opexCost', opexId);
        updateCostYearList('capexCost', capexId);
        updateCostYearList('runCost', runCostId);
    }, [form]);

    return (
        <>
            {data?.filter((item: any) => item.category === filter)?.length ? (
                <Box sx={{ background: color, p: 2, mt: 2, borderRadius: 2 }}>
                    <Typography variant="h4">{heading}</Typography>
                    {filter === 'CAPEX Cost'
                        ? renderCostSection(filter)
                        : filter === 'OPEX One-Off PROJECT cost only'
                        ? renderCostSection(filter)
                        : filter === 'Run Cost'
                        ? renderCostSection(filter)
                        : ''}

                    <Grid container sx={{ mt: 2 }} spacing={3}>
                        {data
                            ?.filter((item: any) => item.category === filter && item.type !== 'Attachment')
                            ?.map((field: any) => {
                                return (
                                    <React.Fragment key={field.id}>
                                        <InputFieldTemplate
                                            field={field}
                                            form={form}
                                            setForm={setForm}
                                            handleChange={handleChange}
                                            submit={submit}
                                            handleDateChange={handleDateChange}
                                        />
                                    </React.Fragment>
                                );
                            })}
                    </Grid>
                </Box>
            ) : (
                ''
            )}
        </>
    );
};

export default ProjectSection;
