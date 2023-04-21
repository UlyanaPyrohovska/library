import { React } from 'react'
import '../assets/css/header.css';
import Logo from '../assets/img/logo.png';
import Lupa from '../assets/img/lupa.png'
import Button from './Button'


export default function Header() {
    return (
        <div id='navbar'>
            <a href="">
                <div className="logo">
                    <img src={Logo}></img>
                </div>
            </a>
            <Button name={"Про бібілотеку"} contents={["Розділи та колекції", "Роко", "Автором", "Назвою", "Ключовим словом", "Нові надходження"]}></Button>
            <Button name={"Сервіси та послуги"} contents={["Розділи та колекції", "Роком випуску", "Автором", "Назвою", "Ключовим словом", "Нові надходження"]}></Button>
            <Button name={"Ресурси"} contents={["Розділи та колекції", "Роком випуску", "Автором", "Назвою", "Ключовим словом", "Нові надходження"]}></Button>
            <Button name={"Новини"} contents={["Розділи та колекції", "Роком випуску", "Автором", "Назвою", "Ключовим словом", "Нові надходження"]}></Button>
            <a href="">
                <div className="search-box">
                    <img className="lupa" src={Lupa}></img>
                </div>
            </a>

        </div>
    )
}