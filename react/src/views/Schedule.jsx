import React, { useEffect, useState } from 'react'
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import { Container } from '@mui/material';
import styles from './styles.module.css'

const ScheduleData = [

    {
        _id: 1,
        day: "Понеділок",
        start_time: '9:00',
        end_time: '18:00',
    },
    {
        _id: 2,
        day: "Вівторок",
        start_time: '9:00',
        end_time: '18:00',
    },
    {
        _id: 3,
        day: "Середа",
        start_time: '9:00',
        end_time: '15:00',
    },
    {
        _id: 4,
        day: "Четвер",
        start_time: '9:00',
        end_time: '12:00',
    },
    {
        _id: 5,
        day: "П'ятниця",
        start_time: '9:00',
        end_time: '18:00',
    },
    {
        _id: 6,
        day: "Субота",
        start_time: null,
        end_time: '18:00',
    },
    {
        _id: 7,
        day: "Неділя",
        start_time: null,
        end_time: '18:00',
    }

]

function Schedule() {
    const [analyzedSchedule, setAnalyzedSchedule] = useState([]);
    const [freeDays, setFreeDays] = useState([]);

    useEffect(() => {
        const finalData = [];
        const ana = analyzeSchedule(ScheduleData);
        const nana = ScheduleData.filter((el) => !ana.includes(el) && !!el.end_time && !!el.start_time);
        const free = ScheduleData.filter((el) => !el.end_time || !el.start_time);
        let str = '';
        ana.map((item) => {
            str += item.day + ' '
        });
        finalData.push({ day: str, start_time: ana[0].start_time, end_time: ana[0].end_time });
        finalData.push(...nana);
        setFreeDays(free.sort((a, b) => a._id - b._id));
        setAnalyzedSchedule(finalData.sort((a, b) => a._id - b._id));

    }, [])

    //Find out which days have the same timetable
    const analyzeSchedule = (schedule) => {
        const result = schedule.filter((el, i) => {
            return schedule.some((elem, j) => {
                return i !== j && elem.start_time === el.start_time && !!el.start_time && !!elem.start_time
                    && elem.end_time === el.end_time && !!el.end_time && !!elem.end_time;
            })
        })

        return result;
    }

    return (
        <Container style={{ maxWidth: '1085px' }}>
            <h3 className={styles.title}>Години роботи</h3>
            <div className={styles.scheduleWrap}>
                <WatchLaterRoundedIcon sx={{ fontSize: 220, color: 'var(--text-color-2)' }} color='primary.darker'></WatchLaterRoundedIcon>
                <div>
                    <span className={styles.highlightedText} style={{ display: 'inline-block', paddingBottom: '20px' }}>Бібліотека обслуговує читачів за наступним графіком:</span>
                    {analyzedSchedule.map((el) => {
                        return (
                            <div key={el._id} style={{ paddingBottom: '5px' }}>
                                <span className={styles.highlightedText}>{el.day}:</span>
                                <span className={styles.normalText}>з {el.start_time} до {el.end_time}</span>
                            </div>
                        )
                    })}
                    <div style={{ paddingBottom: '5px' }}>
                        <span className={styles.highlightedText}>Вихідні:</span>
                        <span className={styles.normalText}>{
                            freeDays.map((el) => {
                                return (
                                    el.day + ' '
                                )
                            })
                        }</span>
                    </div>
                    <div style={{ paddingBottom: '5px' }}>
                        <span className={styles.highlightedText}>Оновлено:</span>
                        <span className={styles.normalText}>21.04.2023</span>
                    </div>
                </div>

            </div>
        </Container>
    )
}

export default Schedule
