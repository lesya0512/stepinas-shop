import styles from '@/styles/main/index.module.scss'


const About = () => {
    return (
        <div className='container'>
            <div className={styles.about}>
            <div className={styles.about_title}><h2>О бренде</h2></div>

            <div className={styles.about_company_up}>
                <div className={styles.about_company_up__text}>
                    <p>
                        Stepinas - бренд деловой одежды из Санкт-Петербурга. В 
                         каждой коллекции заложен эмоциональный контекст, который 
                         придает особую значимость ее обладательнице. Step in as 
                         Princess или Step in as Queen означает на русском языке - 
                        "Войди как принцесса или королева". Почувствуйте этот 
                         контекст в нашей одежде. Каждое изделение носит название 
                         великих королев или принцесс, о которых Вы можете 
                        почитать в разделе "История великих".
                    </p>
                </div>
                <div className={styles.about_company_up__image_first}>

                </div>
            </div>

            <div className={styles.about_company_down}>
                <div className={styles.about_company_down__image_second}>

                </div>
                <div className={styles.about_company_down__text}>
                    <p>
                        <b>Кристина Степинас</b> <br />
                        основательница бренда Stepinas. <br /><br />
                        “Идею создать собственный бренд одежды я вынашивала 
                         несколько лет, это стало моей мечтой. За это время с нуля я 
                         сама научилась шить весь гардероб от белья до верхней 
                         одежды. Получая восторженные отклики от созданной мной 
                         одежды, я начала собирать обратную связь от девушек - что 
                         они хотели бы видеть в своей идеальной рубашке. 
                         Разработала стратегию запуска, подобрала людей в команду, 
                         обучилась и сформировала капитал. Так и родился бренд Stepinas.”
                    </p>
                </div>
                
            </div>
        </div>
        </div>
    );
};

export default About;