import { React } from 'react'
import '../assets/css/footer.css'

export default function Footer() {
    return (
        <div id='footer'>
            <div className='footer-wrap'>
                <div className='footer-col'>
                    <div className='footer-el'>
                        <h3 className='footer-title'>Контакти</h3>
                        <span>Адреса:</span>
                        <span>01014, м. Київ, вул. М. Бойчука (Кіквідзе), 32</span>
                    </div>
                    <div className='footer-el'>
                        <h3 className='footer-title'>Приймальна ректора</h3>
                        <a href='tel:+38(068)530-08-81'>+38 (068) 530-08-81</a>
                        <a href='tel:+38(044)285-77-16'>+38 (044) 285-77-16</a>
                        <a href='mailto:i@kdidpmid.edu.ua'>e-mail: i@kdidpmid.edu.ua</a>
                    </div>
                </div>
                <div className='footer-col'>
                    <div className='footer-el'>
                        <h3 className='footer-title'>Підготовчі курси</h3>
                        <a href='tel:+38(050)873-75-89'>тел. +38 (050) 873-75-89</a>
                    </div>
                </div>
                <div className='footer-col'>
                    <div className='footer-el'>
                        <h3 className='footer-title'>Відділ асірантури</h3>
                        <a href='mailto:aspirant@kdidpmid.edu.ua'>e-mail: aspirant@kdidpmid.edu.ua</a>
                    </div>
                    <div className='footer-el'>
                        <h3 className='footer-title'>Приймальна комісія</h3>
                        <a href='mailto:pk@kdidpmid.edu.ua'>e-mail: pk@kdidpmid.edu.ua</a>
                        <a href='tel:+38(067)-92-84-698'>+38 (067) 92-84-698</a>
                        <a href='tel:+38(098)-263-37-65'>+38(098)-263-37-65 адміністратор ЄДБО</a>
                    </div>
                </div>
            </div>
            <span className='copyright-text'>Київська Державна Академія Декоративно-Прикладного Мистецтва і Дизайну імені Михайла Бойчука © 1999-2021</span>
        </div>
    )
}       