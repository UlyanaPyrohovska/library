import React, { useMemo, useState } from 'react'
import NewsComponent from './NewsComponent'
import { Pagination } from '@mui/material'

const news = [
    {
        title: "Lörem ipsum gönt mavis i multinesm",
        text: "Lörem ipsum gönt mavis i multinesm bloggbävning mobillångfilm poddsändning såväl som ekogisk.Mp3-spelare vandrande skolbuss, än dra ett streck i sanden kontrasion och Viktor Nordin heteronetik i paddeltennis.Stuprörspolitik kuddbok emedan biofoni att fröbomba inte sudoku preosmos rödgrönrosa, inte konlog ifall halmdocka.",
        time: "2022-04-26"
    },
    {
        title: "News2",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, eos. Repellat corrupti, optio iusto, soluta recusandae debitis vitae in harum beatae labore accusamus quam maiores nisi suscipit voluptatum saepe? Nostrum?",
        time: "2022-04-27"
    },
    {
        title: "News3",
        text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium enim rem dicta voluptates cumque, odio facilis quia sequi unde, doloremque, cupiditate reiciendis quam hic expedita quos quibusdam in illo odit!",
        time: "2022-04-29"
    },
    {
        title: "Lörem ipsum gönt mavis i multinesm",
        text: "Lörem ipsum gönt mavis i multinesm bloggbävning mobillångfilm poddsändning såväl som ekogisk.Mp3-spelare vandrande skolbuss, än dra ett streck i sanden kontrasion och Viktor Nordin heteronetik i paddeltennis.Stuprörspolitik kuddbok emedan biofoni att fröbomba inte sudoku preosmos rödgrönrosa, inte konlog ifall halmdocka.",
        time: "2022-04-26"
    },
    {
        title: "News2",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, eos. Repellat corrupti, optio iusto, soluta recusandae debitis vitae in harum beatae labore accusamus quam maiores nisi suscipit voluptatum saepe? Nostrum?",
        time: "2022-04-27"
    },
    {
        title: "News3",
        text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium enim rem dicta voluptates cumque, odio facilis quia sequi unde, doloremque, cupiditate reiciendis quam hic expedita quos quibusdam in illo odit!",
        time: "2022-04-29"
    },
    {
        title: "Lörem ipsum gönt mavis i multinesm",
        text: "Lörem ipsum gönt mavis i multinesm bloggbävning mobillångfilm poddsändning såväl som ekogisk.Mp3-spelare vandrande skolbuss, än dra ett streck i sanden kontrasion och Viktor Nordin heteronetik i paddeltennis.Stuprörspolitik kuddbok emedan biofoni att fröbomba inte sudoku preosmos rödgrönrosa, inte konlog ifall halmdocka.",
        time: "2022-04-26"
    },
    {
        title: "News2",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, eos. Repellat corrupti, optio iusto, soluta recusandae debitis vitae in harum beatae labore accusamus quam maiores nisi suscipit voluptatum saepe? Nostrum?",
        time: "2022-04-27"
    },
    {
        title: "News7",
        text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Praesentium enim rem dicta voluptates cumque, odio facilis quia sequi unde, doloremque, cupiditate reiciendis quam hic expedita quos quibusdam in illo odit!",
        time: "2022-04-29"
    },
]

export function usePagination(data, itemsPerPage) {
    const [currentPage, setCurrentPage] = useState(1);
    const maxPage = Math.ceil(data.length / itemsPerPage);

    function currentData() {
        const begin = (currentPage - 1) * itemsPerPage;
        const end = begin + itemsPerPage;
        return data.slice(begin, end);
    }

    function next() {
        setCurrentPage(Math.min(currentPage + 1, maxPage));
    }

    function prev() {
        setCurrentPage(Math.max(currentPage - 1, 1));
    }

    function jump(page) {
        const pageNumber = Math.max(1, page);
        setCurrentPage(Math.min(pageNumber, maxPage));
    }

    return { next, prev, jump, currentData, currentPage, maxPage };
}

function NewsLayout() {
    let [page, setPage] = useState(1);
    const numOfElements = 5;

    const _DATA = usePagination(news, numOfElements);

    const handleChange = (e, p) => {
        setPage(p);
        _DATA.jump(p);
    };
    return (
        <div>
            <h2 className='news-title'>Новини та події</h2>
            {_DATA.currentData().map((item, index) => {
                return (
                    <NewsComponent title={item.title} text={item.text} time={item.time} key={index}></NewsComponent>
                )
            })}
            <Pagination
                count={_DATA.maxPage}
                size="large"
                page={page}
                onChange={handleChange}
                color='primary'
                style={{ marginTop: "40px" }}
            />
        </div>
    )
}

export default NewsLayout
