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
import { Button, Container, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TableHead, TextField } from '@mui/material';
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import axiosClient from '../../axios';
import { useState } from 'react';
import { userStateContext } from '../../contexts/ContextProvider';
import { useEffect } from 'react';
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import TablePaginationActions from '../../components/TableView';

function ResourceAdd() {
    const [resource, setResource] = useState({
        id: "",
        name: "",
        year: "",
        num_of_down: "",
        num_of_views: "",
        category: "",
        authors: [],
        keywords: [],
        pub_house: "",
        file: null,
        link: null
    });
    const [selectedNames, setSelectedNames] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [keywords, setKeywords] = useState([]);
    const { id } = useParams();
    const { setLoad } = userStateContext();
    const navigate = useNavigate();

    async function getPublishers() {
        const { data } = await axiosClient.get('/pubhouse');
        setPublishers(data.data);
        setLoad(false);
    }

    async function getCategories() {
        const { data } = await axiosClient.get('/category');
        setCategories(data.data);
        setLoad(false);
    }

    async function getAuthors() {
        const { data } = await axiosClient.get('/authors');
        setAuthors(data.data);
        setLoad(false);
    }

    async function getKeywords() {
        const { data } = await axiosClient.get('/keywords');
        setKeywords(data.data);
        setLoad(false);
    }

    useEffect(() => {
        getCategories();
        getAuthors();
        getKeywords();
        getPublishers();
    }, []);

    function handleSubmit(ev) {
        ev.preventDefault();

        const payload = { ...resource };
        // if (payload.file) {
        //     payload.image = payload.image_url;
        // }
        // delete payload.image_url;
        payload.authors = selectedAuthors;
        payload.keywords = selectedNames;
        let res = null;
        if (id) {
            res = axiosClient.put(`/resource/${id}`, payload);
        } else {
            res = axiosClient.post("/resources", payload);
        }
        res.then((res) => {
            console.log(res);
            navigate("/admin/resources");
        })
            .catch((err) => {
                if (err && err.response) {
                    setError(err.response.data.message);
                }
                console.log(err, err.response);
            });
    };

    const handleChange = (files) => {
        console.log(files)
    }

    const onFileChoose = (ev) => {
        const file = ev.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            setResource({
                ...resource,
                file: file,
                link: reader.result,
            });

            ev.target.value = "";
        };
        reader.readAsDataURL(file);
    };

    return (
        <Container>
            <Box component='form' onSubmit={handleSubmit} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <h2>{resource.name ? resource.name : 'Create Resource'}</h2>
                    <Button
                        color="primary" type="submit"
                        variant="contained">
                        Save
                    </Button>
                </Box>
                {resource.link && (
                    <span>doc uploaded</span>
                )}
                <Button
                    variant="contained"
                    component="label"
                    sx={{ marginBottom: "30px" }}
                >
                    Upload File
                    <input
                        type="file"
                        hidden
                        onChange={onFileChoose}
                    />
                </Button>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                    <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} width={'40%'}>
                        <TextField id="outlined-basic" label="Name" variant="standard" sx={{ marginBottom: "30px" }}
                            name="name"
                            value={resource.name}
                            onChange={(ev) =>
                                setResource({ ...resource, name: ev.target.value })
                            }
                        />
                        <TextField id="outlined-basic" label="Year" variant="standard" sx={{ marginBottom: "30px" }}
                            name="year"
                            value={resource.year}
                            onChange={(ev) =>
                                setResource({ ...resource, year: ev.target.value })
                            }
                        />
                        <FormControl>
                            <InputLabel>Select Publisher</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={resource.pub_house.id}
                                label="Publisher"
                                onChange={(ev) =>
                                    setResource({ ...resource, pub_house: ev.target.value })
                                }
                                input={<OutlinedInput label="Select Publisher" />}
                            >
                                {publishers?.map((el) => {
                                    return (<MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>);
                                })}
                            </Select>
                        </FormControl>

                    </Box>
                    <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} width={'40%'}>
                        <FormControl>
                            <InputLabel>Select category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={resource.category.id}
                                label="Category"
                                onChange={(ev) =>
                                    setResource({ ...resource, category: ev.target.value })
                                }
                                input={<OutlinedInput label="Select category" />}
                            >
                                {categories?.map((el) => {
                                    return (<MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>);
                                })}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel>Select authors</InputLabel>
                            <Select
                                multiple
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedAuthors}
                                label="Authors"
                                onChange={(e) => setSelectedAuthors(e.target.value)}
                                input={<OutlinedInput label="Select authors" />}
                            >
                                {authors?.map((el) => {
                                    return (<MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>);
                                })}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <InputLabel>Select Keywords</InputLabel>
                            <Select
                                multiple
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedNames}
                                label="Keywords"
                                onChange={(e) => setSelectedNames(e.target.value)}
                                input={<OutlinedInput label="Select keywords" />}
                            >
                                {keywords?.map((el) => {
                                    return (<MenuItem key={el.id} value={el.id}>{el.name}</MenuItem>);
                                })}
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}

export default ResourceAdd