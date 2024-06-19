import Logo from "@/components/elements/Logo/Logo";
import Link from "next/link";
import React from 'react';
import '../../../app/globalStyles/footer.css'
import LogoMobile from "@/components/elements/Logo/LogoMobile";

const Footer = () => {

    // const StyledLink = styled.a
    // color: #f00;

    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-left">
                    <div className="footer-logo">
                        <Logo />
                    </div>
                    <div className="logomob">
                        <LogoMobile />
                    </div>
                    <p className="footer-text-copy">
                        ИП Степинас Кристина Сергеевна <br />
                        ОГРНИП 323784700402131 <br />
                        ИНН 784000673123 <br />
                    </p>
                    <ul className="footer-nav list-reset">
                        <li className="footer-nav-item">
                            <Link 
                                href='https://t.me/stepinas' 
                                className="footer-nav-item-btn footer-nav-item-btn--telegram" 
                            />
                        </li>
                        {/* <li className="footer-nav-item">
                            <Link 
                                href='/vk' 
                                className="footer-nav-item-btn footer-nav-item-btn--vk" 
                            />
                        </li>
                        <li className="footer-nav-item">
                            <Link 
                                href='/whatsapp' 
                                className="footer-nav-item-btn footer-nav-item-btn--whatsapp" 
                            />
                        </li> */}
                    </ul>
                </div>

                <div className="footer-mobile">
                <div className="footer-center">
                    <ul className="footer-center-ul list-reset">
                        <li className='title'>Навигация</li>
                        <li className='footer-link'> 
                            <Link href='/main'>
                                Главная
                            </Link>
                        </li>
                        <li className='footer-link'>
                            <Link href='/catalog'>
                                Каталог
                            </Link>
                        </li>
                        <li className="footer-link">
                            <Link href='/'>
                                Campagin
                            </Link>
                        </li>
                        <li className='footer-link'>
                            <Link href='/deliver-and-payment'>
                                Доставка и оплата
                            </Link>
                        </li>
                        <li className="footer-link">
                            <Link href='/faq'>
                                FAQ
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="footer-right">
                    <ul className="footer-right-ul list-reset">
                        <li className='title'>Документы</li>
                        <li className='footer-link'>
                            <Link href='/privacy-policy'>
                                Политика конфеденциальности
                            </Link>
                        </li>
                        <li className='footer-link'>
                            <Link href='/contact-offer'>
                                Договор оферты
                            </Link>
                        </li>
                    </ul>

                    <ul className="footer-right-ul list-reset">
                        <li className='title'>Контакты</li>
                        <li>89213639466</li>
                        <li>store@stepinas.ru</li>
                    </ul>
                </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;