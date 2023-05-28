import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { Box, Container } from '@mui/material'
import { Link } from 'react-router-dom'
import Logo from '../../assets/img/icon.png'
import { userStateContext } from '../../contexts/ContextProvider'
import axiosClient from '../../axios'

function RepoHome() {
    const { setLoad } = userStateContext();
    const [categories, setCategories] = useState([]);
    const [categoriesWorkers, setCategoriesWorkers] = useState([]);
    const categoriesStudents = [];
    const [books, setBooks] = useState([]);

    async function fetchData() {
        setLoad(true);
        const { data } = await axiosClient.get('/category');
        setCategories(data.data);
        setLoad(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const renderCategoriesWorkers = () => {
        const categoriesWorkers = categories.filter((it) => { if (it.type == 'workers') return it });
        return (
            <Box maxWidth={'700px'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                <ul className={styles.listWrap}>
                    {categoriesWorkers?.slice(0, 8).map((item) => {
                        return (
                            <li><Link>{item.name}</Link></li>
                        );
                    })
                    }
                </ul>
                <ul className={styles.listWrap}>
                    {categoriesWorkers?.slice(8, 16).map((item) => {
                        return (
                            <li><Link>{item.name}</Link></li>
                        );
                    })
                    }
                </ul>
                <ul className={styles.listWrap}>
                    {categoriesWorkers?.slice(16).map((item) => {
                        return (
                            <li><Link>{item.name}</Link></li>
                        );
                    })
                    }
                </ul>
            </Box>
        );
    }

    const renderCategoriesStudents = () => {
        const categoriesStudents = categories.filter((it) => { if (it.type == 'students') return it });
        return (
            <Box maxWidth={'700px'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                <ul className={styles.listWrap}>
                    {categoriesStudents?.slice(0).map((item) => {
                        return (
                            <li><Link>{item.name}</Link></li>
                        );
                    })
                    }
                </ul>
            </Box>
        );
    }

    const Bar = (props) => {
        return (
            <div className={styles.barDivide}>
                <h3>{props?.title}</h3>
            </div>
        )
    };

    return (
        <Container>
            <Bar title={'KDIDPMID'}></Bar>
            <Box paddingTop={"40px"} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                <Box maxWidth={'760px'} minHeight={'470px'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
                    <h2>eSUIR - Electronic State University Institutional Repository</h2>
                    <span>Ласкаво просимо до Електронного архіву Сумського державного університету!
                        Електронний архів Сумського державного університету наповнюється наступними матеріалами:
                        наукові публікації працівників та студентів, статті з наукових журналів, навчально-методичні розробки.
                        Наукові публікації студентів розміщуються за умови наявності рекомендації
                        наукового керівника.</span>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <span style={{ fontWeight: 'bold' }}>Кількість документів: 50</span>
                        <span style={{ fontWeight: 'bold' }}>Останнє оновлення: 2023-17-05</span>
                    </Box>
                    <div className={styles.linksWrap}>
                        <Link>Положення про Інституційний репозитарій КДАДПМіД</Link>
                        <Link>Про eSSUIR</Link>
                        <Link>Інструкція реєстрації користувача eSSUIR</Link>
                        <Link>Як розмістити матеріал до репозитарію: відеоінструкція</Link>
                        <Link>Інструкція реєстрації користувачів
                            та розміщення матеріалів у репозитарії eSSUIR</Link>
                    </div>
                </Box>
                <div className={styles.verticalBar}></div>
                <Box maxWidth={'255px'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'} minHeight={"470px"} textAlign={'center'} alignItems={'center'}>
                    <img src={Logo} width={255}></img>
                    <span>Для створення, наповнення
                        й редагування власних колекцій звертайтеся до <Link>адміністратора архіву</Link></span>
                    <div className={styles.linksWrapNew}>
                        <Link>Бібліотека КДАДПМіД </Link>
                        <Link>Електронний каталог бібліотеки КДАДПМіД </Link>
                        <Link>Електронні архіви України</Link>
                    </div>
                </Box>
            </Box>
            <Box paddingTop={'60px'}>
                <Bar title={'Ресурси за видами документів'}></Bar>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                    <Box>
                        <h2>Науково-педагогічні працівники:</h2>
                        {renderCategoriesWorkers()}
                    </Box>
                    <Box>
                        <Box>
                            <h2>Здобувачі:</h2>
                            {renderCategoriesStudents()}
                        </Box>
                    </Box>
                </Box>

            </Box>
            <Box paddingTop={'60px'} minHeight={'270px'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
                <Bar title={'Ресурси за розділами'}></Bar>
                <div className={styles.linksWrapNew}>
                    <Link>Бібліотека КДАДПМіД </Link>
                    <Link>Електронний каталог бібліотеки КДАДПМіД </Link>
                    <Link>Електронні архіви України</Link>
                </div>
            </Box>

        </Container>
    )
}

export default RepoHome
