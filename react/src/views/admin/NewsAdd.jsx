import { Box, Button, Container, TextField, Typography } from '@mui/material'
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios';
import { useNavigate, useParams } from 'react-router-dom';
import { userStateContext } from '../../contexts/ContextProvider';

function NewsAdd() {
    const [news, setNews] = useState({
        title: "",
        slug: "",
        body: "",
        image: null,
        image_url: null,
    });
    const { id } = useParams();
    const { setLoad } = userStateContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            setLoad(true);
            axiosClient.get(`/news/${id}`).then(({ data }) => {
                setNews(data.data);
                setLoad(false);
            });
        }
    }, []);

    const onImageChoose = (ev) => {
        const file = ev.target.files[0];

        const reader = new FileReader();
        reader.onload = () => {
            setNews({
                ...news,
                image: file,
                image_url: reader.result,
            });

            ev.target.value = "";
        };
        reader.readAsDataURL(file);
    };

    function handleSubmit(ev) {
        console.log('here');
        ev.preventDefault();

        const payload = { ...news };
        if (payload.image) {
            payload.image = payload.image_url;
        }
        delete payload.image_url;
        let res = null;
        if (id) {
            res = axiosClient.put(`/news/${id}`, payload);
        } else {
            res = axiosClient.post("/news", payload);
        }
        res.then((res) => {
            console.log(res);
            navigate("/admin/news");
            if (news.id) {
                showToast("News post was updated");
            } else {
                showToast("News post was created");
            }
        })
            .catch((err) => {
                if (err && err.response) {
                    setError(err.response.data.message);
                }
                console.log(err, err.response);
            });
    };

    return (
        <Container>
            <Box component='form' onSubmit={handleSubmit} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <h2>Create News</h2>
                    <Button
                        color="primary" type="submit"
                        variant="contained">
                        Save
                    </Button>
                </Box>
                {news.image_url && (
                    <img
                        src={news.image_url}
                        alt=""
                        width={500}
                        style={{ margin: "auto", padding: "30px" }}
                    />
                )}
                <Button
                    variant="contained"
                    component="label"
                    sx={{ marginBottom: "30px" }}
                >
                    Upload Image
                    <input
                        type="file"
                        hidden
                        onChange={onImageChoose}
                    />
                </Button>
                <TextField id="outlined-basic" label="Title" variant="standard" sx={{ marginBottom: "30px" }}
                    name="title"
                    value={news.title}
                    onChange={(ev) =>
                        setNews({ ...news, title: ev.target.value })
                    }
                />
                <TextField
                    placeholder="Text"
                    multiline
                    minRows={20}
                    maxRows={Infinity}
                    sx={{ height: "500px" }}
                    value={news.body}
                    onChange={(ev) =>
                        setNews({ ...news, body: ev.target.value })
                    }
                />
            </Box>
        </Container>
    )
}

export default NewsAdd
