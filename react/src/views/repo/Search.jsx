import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container, TableHead, TextField } from '@mui/material';
import axiosClient from '../../axios';
import { useState } from 'react';
import { userStateContext } from '../../contexts/ContextProvider';
import { useEffect } from 'react';
import styles from './styles.module.css'
import TablePaginationActions from '../../components/TableView';

function CustomPaginationActionsTable() {
    const { setLoad } = userStateContext();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [news, setNews] = useState([]);
    const [newsData, setNewsData] = useState([]);


    const searchFilter = (searchQuery) => {
        const sQ = searchQuery.toLowerCase();
        const aux = newsData.filter((item) => {
            return item.name.toLowerCase().includes(sQ) || item.author.name.toLowerCase().includes(sQ) || item.category.name.toLowerCase().includes(sQ)
        })
        setNews(aux);
    }

    const getNews = () => {
        axiosClient.get('/resources').then(({ data }) => {
            setNews(data.data);
            setNewsData(data.data);
            setLoad(false);
            console.log(data.data[0]);

        })
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
                    variant="outlined"
                    fullWidth
                    label="Search"
                    onChange={(e) => {
                        searchFilter(e.target.value);
                    }}
                />
            </div>
            <Box backgroundColor={' #D9C1AB'} padding={'20px'} borderRadius={'30px'} >

                <h2 className={styles.title}>Відображення результатів</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Назва</TableCell>
                                <TableCell align="center">Рік випуску</TableCell>
                                <TableCell align="center">Автор</TableCell>
                                <TableCell align="center">Тип</TableCell>
                                <TableCell align="center">Переглядів</TableCell>
                                <TableCell align="center">Завантажено</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? news.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : news
                            ).map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.year}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.author.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.category.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.num_of_views}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.num_of_down}
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
            <CustomPaginationActionsTable></CustomPaginationActionsTable>
        </Container>
    )
}

export default Search
