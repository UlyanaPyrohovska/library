import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { Button, Container, TableHead } from '@mui/material';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import axiosClient from '../../axios';
import { useState } from 'react';
import { userStateContext } from '../../contexts/ContextProvider';
import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import TablePaginationActions from '../../components/TableView';


function CustomPaginationActionsTable() {
    const { setLoad } = userStateContext();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [autors, setAuthors] = useState([]);

    const getAuthors = () => {
        axiosClient.get('/authors').then(({ data }) => {
            setAuthors(data.data);
            setLoad(false);
        })
    }

    const deleteAuthors = (id) => {
        axiosClient.delete(`/authors/${id}`);
        const auxN = autors.filter((n) => {
            return n.id != id;
        });
        setAuthors(auxN);
        setPage(0);
    }

    useEffect(() => {
        getAuthors();
    }, []);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - autors.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableHead>
                    <TableCell component="th" scope="row">
                        Ім'я
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                        Адреса
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                        Рік народження
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                        Дії
                    </TableCell>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? autors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : autors
                    ).map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="center">
                                {row.address}
                            </TableCell>
                            <TableCell align="center">
                                {row.year_of_birth}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="center">
                                <IconButton color='secondary' component={Link} to={`/admin/autors/${row.id}`}>
                                    <EditRoundedIcon></EditRoundedIcon>
                                </IconButton>
                                <IconButton color='darker' onClick={() => deleteAuthors(row.id)}>
                                    <DeleteRoundedIcon></DeleteRoundedIcon>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[10, 15, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={autors.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}

function PubHouseAdmin() {
    return (
        <Container>
            <Box paddingBottom={5}>
                <NavLink to={'/admin/autors/add'}>
                    <Button startIcon={<ControlPointRoundedIcon></ControlPointRoundedIcon>} color='darker' variant="outlined" >Додати автора</Button>
                </NavLink>
            </Box>
            <CustomPaginationActionsTable></CustomPaginationActionsTable>
        </Container>
    )
}

export default PubHouseAdmin
