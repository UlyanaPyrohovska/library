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
import { Button, Container, TableHead, TextField } from '@mui/material';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import axiosClient from '../../axios';
import { useState } from 'react';
import { userStateContext } from '../../contexts/ContextProvider';
import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import styles from './styles.module.css'

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

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
        <Box>
            <h2>eSUIR - Electronic State University Institutional Repository</h2>
            <div className={styles.search}>
                <TextField
                    id="outlined-basic"
                    // onChange={ }
                    variant="outlined"
                    fullWidth
                    label="Search"
                />
            </div>
            <Box backgroundColor={' #D9C1AB'} padding={'20px'} borderRadius={'30px'} >

                <h2 className={styles.title}>Відображення результатів від 1 до 20 із 89038</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Рік випуску</TableCell>
                                <TableCell align="right">Назва</TableCell>
                                <TableCell align="right">Автор</TableCell>
                                <TableCell align="right">Тип</TableCell>
                                <TableCell align="right">Переглядів</TableCell>
                                <TableCell align="right">Завантажено</TableCell>
                            </TableRow>
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
                                    <TableCell style={{ width: 190 }} align="right">
                                        {row.body.slice(0, 20) + '...'}
                                    </TableCell>
                                    <TableCell style={{ width: 190 }} align="right">
                                        {row.created_at}
                                    </TableCell>
                                    <TableCell style={{ width: 190 }} align="right">
                                        {row.updated_at}
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
            </Box>
        </Box>


    );
}

function Search() {
    return (
        <Container>
            {/* <Box paddingBottom={5}>
                <NavLink to={'/admin/news/add'}>
                    <Button startIcon={<ControlPointRoundedIcon></ControlPointRoundedIcon>} color='darker' variant="outlined" >Додати новину</Button>
                </NavLink>
            </Box> */}
            <CustomPaginationActionsTable></CustomPaginationActionsTable>
        </Container>
    )
}

export default Search
