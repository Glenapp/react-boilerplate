import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0
    }
}));

export default function CostTable(props: any) {
    const { label, data } = props;
    return (
        <TableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center" colSpan={2}>
                            {label}
                        </StyledTableCell>
                    </TableRow>
                    <TableRow>
                        <StyledTableCell align="center">Year</StyledTableCell>
                        <StyledTableCell align="center">Cost</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(data)?.map((item: any, index: number) => {
                        return (
                            <StyledTableRow key={index}>
                                <StyledTableCell align="center" component="th" scope="row">
                                    {item.replace(/-/g, ' ')}
                                </StyledTableCell>
                                <StyledTableCell align="center" component="th" scope="row">
                                    {data[item]}$
                                </StyledTableCell>
                            </StyledTableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
