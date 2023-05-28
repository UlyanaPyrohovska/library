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
    const [autors, setResources] = useState([]);

    const getAuthors = () => {
        axiosClient.get('/resources').then(({ data }) => {
            setResources(data.data);
            setLoad(false);
        })
    }

    const deleteResources = (id) => {
        axiosClient.delete(`/resources/${id}`);
        const auxN = autors.filter((n) => {
            return n.id != id;
        });
        setResources(auxN);
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
                        Назва
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                        Рік видання
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                        ISBN
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                        Кількість сторінок
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                        Кількість переглядів
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                        Кількість завантажень
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                        Дiї
                    </TableCell>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? autors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : autors
                    ).map((row) => (
                        <TableRow key={row.id}>
                            <TableCell width={400} component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="center">
                                {row.year}
                            </TableCell>
                            <TableCell align="center">
                                {row.isbn}
                            </TableCell>
                            <TableCell align="center">
                                {row.num_of_pages}
                            </TableCell>
                            <TableCell align="center">
                                {row.num_of_views}
                            </TableCell>
                            <TableCell align="center">
                                {row.num_of_down}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="center">
                                <IconButton color='secondary' component={Link} to={`/admin/autors/${row.id}`}>
                                    <EditRoundedIcon></EditRoundedIcon>
                                </IconButton>
                                <IconButton color='darker' onClick={() => deleteResources(row.id)}>
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

function ResourceAdmin() {
    return (
        <Container>
            <Box paddingBottom={5}>
                <NavLink to={'/admin/resource/add'}>
                    <Button startIcon={<ControlPointRoundedIcon></ControlPointRoundedIcon>} color='darker' variant="outlined" >Додати книжку</Button>
                </NavLink>
            </Box>
            <CustomPaginationActionsTable></CustomPaginationActionsTable>
        </Container>
    )
}

export default ResourceAdmin
