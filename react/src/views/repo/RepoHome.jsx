import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
import Logo from '../../assets/img/icon.png'
import { userStateContext } from '../../contexts/ContextProvider'
import axiosClient from '../../axios'
//import { axios } from 'axios';

function RepoHome() {
    const { setLoad } = userStateContext();
    const [categories, setCategories] = useState();

    async function fetchData() {
        setLoad(true);
        console.log(categories);
        const { data } = await axiosClient.get('/category');
        console.log(data);
        setCategories(data.data);
        console.log(categories);
        setLoad(false);
    }

    useEffect(() => {
        fetchData();
        // setLoad(true);
        // axiosClient.get('/category').then(({ data }) => {
        //     setCategories(data.data);
        //     // console.log(data.data);
        //     // console.log(categories);
        //     setLoad(false);
        // }).catch(err => {
        //     console.log(err);
        //     navigate('/not-found');
        // })
    }, []);

    const Bar = (props) => {
        return (
            <div className={styles.barDivide}>
                <h3>{props?.title}</h3>
            </div>
        )
    };

    return (
        <>
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
                        <span style={{ fontWeight: 'bold' }}>Кількість документів:</span>
                        <span style={{ fontWeight: 'bold' }}>Останнє оновлення:</span>
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
                        <Box maxWidth={'700px'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                            {categories?.map((item) => {
                                <ul className={styles.listWrap}>
                                    <li><Link>{item.name}</Link></li>
                                </ul>
                            })
                            }
                            <ul className={styles.listWrap}>
                                <li><Link>Навчальний посібник</Link></li>
                                <li><Link>Навчальний посібник</Link></li>
                                <li><Link>Навчальний посібник</Link></li>
                                <li><Link>Навчальний посібник</Link></li>
                                <li><Link>Навчальний посібник</Link></li>
                                <li><Link>Навчальний посібник</Link></li>
                                <li><Link>Навчальний посібник</Link></li>
                                <li><Link>Навчальний посібник</Link></li>
                            </ul>
                            <ul className={styles.listWrap}>
                                <li><Link>Навчальний посібник</Link></li>
                                <li><Link>Навчальний посібник</Link></li>
                                <li><Link>Навчальний посібник</Link></li>
                                <li><Link>Навчальний посібник</Link></li>
                                <li><Link>Навчальний посібник</Link></li>
                                <li><Link>Навчальний посібник</Link></li>
                                <li><Link>Навчальний посібник</Link></li>
                                <li><Link>Навчальний посібник</Link></li>
                            </ul>
                            <ul className={styles.listWrap}>
                                <li><Link>Навчальний посібник</Link></li>
                                <li><Link>Навчальний посібник</Link></li>
                                <li><Link>Навчальний посібник</Link></li>
                                <li><Link>Навчальний посібник</Link></li>
                                <li><Link>Навчальний посібник</Link></li>
                                <li><Link>Навчальний посібник</Link></li>
                                <li><Link>Навчальний посібник</Link></li>
                                <li><Link>Навчальний посібник</Link></li>
                            </ul>
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            <h2>Здобувачі:</h2>
                            <Box maxWidth={'700px'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                                <ul className={styles.listWrap}>
                                    <li><Link>Навчальний посібник</Link></li>
                                    <li><Link>Навчальний посібник</Link></li>
                                    <li><Link>Навчальний посібник</Link></li>
                                    <li><Link>Навчальний посібник</Link></li>
                                    <li><Link>Навчальний посібник</Link></li>
                                    <li><Link>Навчальний посібник</Link></li>
                                    <li><Link>Навчальний посібник</Link></li>
                                    <li><Link>Навчальний посібник</Link></li>
                                </ul>
                            </Box>
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

        </>
    )
}

export default RepoHome
