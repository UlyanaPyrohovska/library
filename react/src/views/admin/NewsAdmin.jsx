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
    const [news, setNews] = useState([]);

    const getNews = () => {
        axiosClient.get('/news').then(({ data }) => {
            setNews(data.data);
            setLoad(false);
        })
    }

    const deleteNews = (id) => {
        axiosClient.delete(`/news/${id}`);
        const auxN = news.filter((n) => {
            return n.id != id;
        });
        setNews(auxN);
        setPage(0);
    }

    useEffect(() => {
        getNews();
    }, []);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - news.length) : 0;

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
                        Опис
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                        Дата створення
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                        Дата редагування
                    </TableCell>
                    <TableCell align="center" component="th" scope="row">
                        Дії
                    </TableCell>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? news.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : news
                    ).map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell style={{ width: 190 }} align="center">
                                {row.body.slice(0, 20) + '...'}
                            </TableCell>
                            <TableCell style={{ width: 190 }} align="center">
                                {row.created_at}
                            </TableCell>
                            <TableCell style={{ width: 190 }} align="center">
                                {row.updated_at}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="center">
                                <IconButton color='secondary' component={Link} to={`/admin/news/${row.id}`}>
                                    <EditRoundedIcon></EditRoundedIcon>
                                </IconButton>
                                <IconButton color='darker' onClick={() => deleteNews(row.id)}>
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
                            count={news.length}
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

function NewsAdmin() {

    return (
        <Container>
            <Box paddingBottom={5}>
                <NavLink to={'/admin/news/add'}>
                    <Button startIcon={<ControlPointRoundedIcon></ControlPointRoundedIcon>} color='darker' variant="outlined" >Додати новину</Button>
                </NavLink>
            </Box>
            <CustomPaginationActionsTable></CustomPaginationActionsTable>
        </Container>
    )
}

export default NewsAdmin
