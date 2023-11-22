// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import './stylesheet.css';
import Chart from 'chart.js/auto';
const questions = [
    { id: 1, text: 'Последние три месяца вы не растете в доходе.' },
    { id: 2, text: 'Вы испытываете негативные эмоции или сопротивление при мыслях о необходимости проявляться, привлекать клиентов, продавать ваши продукты/услуги.' },
    { id: 3, text: 'У вас есть ощущение, что все против вас. Как будто какая-то неведомая сила против того, чтобы вы достигали ваших целей.' },
    { id: 4, text: 'Периодически вы живете в мрачных мыслях о том, что у вас ничего не получается, вы неудачник, все лучше вас, никому не нужны ваши услуги и у вас нет счастливого будущего.' },
    { id: 5, text: 'Вы считаете, что клиентов привлекать тяжело.' },
    { id: 6, text: 'Ваша внутренняя батарейка обычно заряжена на...' },
    {
        id: 7,
        text: 'Вы откладываете до последнего действия, которые могли бы привести вас к росту. Вы знаете, что нужно сделать, но не делаете этого и находите себе оправдания.'
    }, {
        id: 8,
        text: 'Вы чувствуете себя настоящим профессионалом своего дела, о котором должны знать многие'
    }, {
        id: 9,
        text: 'Можете ли вы четко описать, какой результат дает ваша продукт/услуга, а какой — нет?'
    }, {
        id: 10,
        text: 'Можете ли одним предложением описать, чем вы выигрышно отличаетесь от коллег, почему клиенту стоит работать именно с вами?'
    }, {
        id: 11,
        text: 'Знаете ли вы, с какими запросами вам интересно работать, а с какими работать не хотите и почему?'
    }, {
        id: 12,
        text: 'Ощущаете ли вы ценность вашей услуги на 10 из 10?'
    },
    { id: 13, text: 'Понимаете ли вы, в чем ваша ответственность в продукте/услуге, а в чем — ответственность клиента?' },
    { id: 14, text: 'Можете ли вы убедительно аргументировать потенциальному клиенту, сколько стоит ваша услуга и почему?' },
    { id: 15, text: 'Насколько вы понимаете, как работать с клиентом долгосрочно? Что вы делаете на первой сессии, на второй, на десятой?' },
    { id: 16, text: 'Проводите ли вы первую встречу по скрипту?' },
    { id: 17, text: 'Насколько вы знаете, какие возражения может озвучить клиент и как на них ответить?' },
    { id: 18, text: 'Заключаете ли вы письменное соглашение о сотрудничестве/договор с клиентом до начала работы с ним?' },
    { id: 19, text: 'Если к вам на первую встречу придет 10 клиентов, сколько из них у вас купит долгосрочную работу?' },
    { id: 20, text: 'Есть ли сильная, подтвержденная экспертность в чем-либо?' },
    { id: 21, text: 'Насколько вы медийны (публикуетесь в журналах на тему вашей экспертности/выступаете/даете интервью)' },
    { id: 22, text: 'Насколько вы проявлены? Оцените вашу проявленность' },
    { id: 23, text: 'Насколько вы понимаете, какие активы и как вам нужно наработать, чтобы достичь поставленных целей?' },
    { id: 24, text: 'Есть ли у вас оформленные кейсы, отзывы клиентов?' },
    { id: 25, text: 'Можете ли вы сказать, что у вас есть наработанная аудитория и личный бренд?' },
    { id: 26, text: 'Насколько вы понимаете, в какой нише вы работаете как профессионал?' },
    { id: 27, text: 'Проводили ли вы исследование конкурентов?' },
    { id: 28, text: 'Проводили ли вы качественный кастдев (индивидуальные исследования потенциальных клиентов)?' },
    { id: 29, text: 'Можете ли вы сходу назвать три основные боли и три основных страха вашей целевой аудитории?' },
    { id: 30, text: 'У вас есть актуальная на настоящий момент таблица с сегментами, болями, желаниями целевой аудитории?' },
    { id: 31, text: 'Ведете ли вы 1-2 канала связи с аудиторией регулярно и осознанно?' },
    { id: 32, text: 'Насколько регулярно вы проявляетесь в выбранном вами канале связи с аудиторией?' },
    { id: 33, text: 'Насколько эффективен для вас выбранный канал связи с аудиторией (дает нужное вам число клиентов по нужной вам цене)?' },
    { id: 34, text: 'Испытываете ли вы удовольствие от ведения выбранного канала связи с аудиторией?' },
    { id: 35, text: 'Можно ли сказать, что благодря ведению канала связи с аудиторией вы реализуете свой потенциал?' },
    { id: 36, text: 'Можете ли вы сказать, что в выбранном вами канале вы чувствуете отдачу от аудитории?' },
    { id: 37, text: 'У вас есть актуальный сайт' },

    { id: 38, text: 'Вы понимаете, как выглядит путь клиента в выбранном вами канале связи с аудиторией' },
    { id: 39, text: 'Вы используете контентные воронки' },
    { id: 40, text: 'У вас есть продающий контент-план' },
    { id: 41, text: 'В любой момент вы понимаете целевое действие' },
    { id: 42, text: 'Если незнакомый человек столкнется с вами в канале связи с аудиторией, ему будет на 100% понятно, кто вы, в чем ваше отличие от других, что вы предлагаете, для кого и зачем' },
    { id: 43, text: 'Вы осознанно занимаетесь трафиком' },
    { id: 44, text: 'У вас есть выделенный бюджет на трафик' },
    { id: 45, text: 'Вы знаете желанную и фактическую стоимость вашего лида' },
    { id: 46, text: 'Вы понимаете, сколько новой аудитории вам нужно каждый месяц, чтобы выполнять план продаж' },
    { id: 47, text: 'Ваш трафик быстро окупается' },
    { id: 48, text: 'Лиды, которые вы получаете - целевые' },
    { id: 49, text: 'У вас есть линейка продуктов' },
    { id: 50, text: 'У вас есть бесплатные и/или недорогие продукты, чтобы клиент мог получить пользу и прогреться на более дорогую вашу услугу' },
    // Добавьте другие вопросы
];
const ChartContainer = () => {
    const chartContainer = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        if (chartContainer && chartContainer.current) {
            const ctx = chartContainer.current.getContext('2d');

            chartInstance.current = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Мышление', 'Продукт', 'Первая встреча с клиентом', 'Активы и экспертность', 'Ниша и целевая аудитория', 'Каналы и связи', 'Упаковка', 'Трафик'],
                    datasets: [{
                        data: [50, 45, 50, 50, 50, 50, 50, 50],
                        backgroundColor: ['rgba(244, 159, 190, 1)', 'rgba(255, 246, 166, 1)', 'rgba(255, 236, 85, 1)', 'rgba(195, 213, 120, 1)', 'rgba(134, 210, 247, 1)', 'rgba(213, 202, 249, 1)', 'rgba(255, 255, 255, 1)', 'rgba(120, 236, 146, 1)'],
                    }],
                },
                options: {
                    responsive: true,
                },
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, []);

    return <canvas ref = { chartContainer }
    width = "400"
    height = "300" / > ;
};

const useDataSender = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const sendDataToBackend = async(name, email, config) => { // Принимаем параметры name, email и конфигурацию
        try {
            const dataToSend = { email, name };

            console.log('Порт сервера:', config.server.port);
            console.log('Базовый URL API:', config.api.baseURL);

            const response = await fetch(`${config.api.baseURL}/data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            const responseData = await response.json();
            console.log('Данные получены от сервера:', responseData);
        } catch (error) {
            console.error('Ошибка отправки данных на сервер:', error);
        }
    };

    return { email, setEmail, name, setName, sendDataToBackend };
};


const GroupComponent = () => {

    const imageStyle = {
        width: '100wv', // Ширина изображения равна ширине родительского контейнера
        height: 'auto', // Автоматически подстраивается по высоте
        position: 'relative',
        top: '100px',
    };

    return ( < div >
        <
        img src = "image_2023-11-13_15-53-12.png"
        alt = "тест"
        style = { imageStyle }
        /> < /
        div >
    );
};
const Rectangle = ({ children }) => {
    const rectangleStyle = {
        width: '1160px',
        height: '612px',
        borderRadius: '23px',
        border: '0px solid #0038FF',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        boxShadow: '0px 4px 65px 0px rgba(0, 56, 255, 0.05)',
        margin: 'auto', // Центрирование по горизонтали
        position: 'absolute',
        top: '50%', // Центрирование по вертикали
        left: '50%',
        transform: 'translate(-50%, -50%)', // Коррекция для центрирования
        display: 'flex',
        justifyContent: 'center',
    };

    return <div style = { rectangleStyle } > { children } < /div>;
};
const FirstContent = () => {
    const groupStyle = {
        position: 'absolute',
        left: '-0.95%',
        right: '-0.19%',
        top: '44.43%',
        bottom: '49.73%',
        transform: 'rotate(-6.54deg)',
    };

    const testStyle = {
        position: 'absolute',
        left: '-0.95%',
        right: '91.63%',
        top: '44.43%',
        bottom: '49.73%',
        fontFamily: 'Stapel',
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: '69.9273px',
        lineHeight: '90%',
        color: 'grey',
        textTransform: 'uppercase',
        border: '1.3px solid #0038FF',
        transform: 'rotate(-6.54deg)',
    };

    const thanksTestStyle = {
        position: 'absolute',
        left: '11.31%',
        right: '21.92%',
        top: '33.93%',
        bottom: '52.23%',
        fontFamily: 'Stapel',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '69.9273px',
        lineHeight: '90%',
        textTransform: 'uppercase',
        color: '#0038FF',
        transform: 'rotate(-6.54deg)',
    };

    const thanksStyle = {
        position: 'absolute',
        left: '80.65%',
        right: '0.34%',
        color: 'grey',
        top: '22.79%',
        bottom: '66.38%',
        fontFamily: 'Stapel',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '69.9273px',
        lineHeight: '90%',
        textTransform: 'uppercase',
        border: '1.3px solid #0038FF',
        transform: 'rotate(-6.54deg)',
    };
    const ResultStyle = {
        width: '5px',
        height: '16px',
        top: '681.68px',
        left: '1129.16px',
        transform: 'rotate(174.92deg)',
    };



    return ( <
        div >
        <
        div style = { groupStyle } > <
        /div> <
        div style = { testStyle } >
        Тест <
        /div> <
        div style = { thanksTestStyle } >
        спасибо, что прошли наш тест <
        /div> <
        div style = { thanksStyle } >
        спасибо <
        /div> < div style = { ResultStyle } > результаты обрабатываются < /div > < /
        div >
    );
}
const SecondContent = ({ totalScore }) => {
    let imageToShow;

    if (totalScore >= 0 && totalScore <= 35) {
        imageToShow = 'Frame 7.jpg';
    } else if (totalScore >= 36 && totalScore <= 59) {
        imageToShow = 'my-new-react-app\public\Frame 8.jpg';
    } else if (totalScore >= 60 && totalScore <= 70) {
        imageToShow = 'Frame 9.jpg';
    } else if (totalScore >= 71 && totalScore <= 100) {
        imageToShow = 'Frame 27.jpg';
    } else {
        imageToShow = 'default.jpg';
    }

    return ( <
        div > <
        img src = { imageToShow }
        alt = "Result Image" / > <
        /div>
    );
};


const Result = (totalScore) => {
    const [showInitialContent, setShowInitialContent] = useState(true);

    useEffect(() => {
        // Change to a new content after a delay (e.g., 5 seconds)
        const timeout = setTimeout(() => {
            setShowInitialContent(false); // Hide initial content after delay
        }, 5000); // Change delay time in milliseconds as needed

        return () => clearTimeout(timeout); // Clear the timeout to prevent memory leaks
    }, []);


    return ( <
        div > {
            showInitialContent ? ( <
                div > < FirstContent / > < /
                div >
            ) : ( <
                div > < SecondContent /
                >
                <
                /
                div >
            )
        } <
        /div>
    );
}

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedValues, setSelectedValues] = useState({});
    const [quizCompleted, setQuizCompleted] = useState(false);
    const selectedValue = selectedValues[currentQuestion] || 0;
    const handleAnswerChange = (value) => {
        setSelectedValues((prevValues) => ({
            ...prevValues,
            [currentQuestion]: value,
        }));
    };
    const calculateTotalScore = () => {
        let totalScore = 0;
        Object.values(selectedValues).forEach((value) => {
            totalScore += value;
        });
        return totalScore;
    };
    const totalScore = calculateTotalScore() / 5;
    const handleNextClick = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prevQuestion) => prevQuestion + 1);
        } else {
            setQuizCompleted(true);
        }
    };

    const calculateGradient = () => {
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        return `linear-gradient(to right, black 0%, black ${progress}%, transparent ${progress}%, transparent 100%)`;
    };
    const maxScore = 500;

    const progress = ((currentQuestion + 1) / questions.length) * 100;
    if (quizCompleted) {
        return <useDataSender / > ;
    } else {
        return ( <
                div className = "py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 bg-gray-800 text-white" >
                <
                GroupComponent / > <
                Rectangle >
                <
                div className = "max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400" >

                <

                h2 className = "mb-4 text-4xl tracking-tight font-bold"
                style = {
                    {
                        color: '#000',
                        fontSize: '49.139px',
                        fontFamily: 'Stapel',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '90%',
                        textTransform: 'uppercase',
                    }
                } >
                Тест вашей системы продвижения <
                /h2> <input
                type = "range1"
                min = "0"
                max = { questions.length - 1 }
                value = { currentQuestion }
                onChange = {
                    (e) => setCurrentQuestion(parseInt(e.target.value, 10))
                }
                className = "w-full h-20 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                style = {
                    {
                        width: '1016px',
                        borderRadius: '100px',
                        border: '2px #0038FF solid',
                        height: '20px',
                        outline: 'none',
                        background: calculateGradient(),
                        padding: '0',
                        '-webkit-appearance': 'none',
                        position: 'relative',
                        top: '80px',
                    }
                }
                />  <
                div style = {
                    {
                        color: '#0038FF',
                        fontsize: '16 px',
                        fontfamily: 'Staple',
                        fontweight: 400,
                        lineheight: '14.40 px',
                        wordwrap: 'break -word',
                        position: 'relative',
                        top: '80px',
                    }
                } > {
                    currentQuestion + 1 + ' '
                }
                из 50 < /div><
                div className = "w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700" >
                <
                div id = "progressbar"
                className = "bg-gray-600 h-2.5 rounded-full dark:bg-gray-300"
                style = {
                    {
                        width: `${progress}%`
                    }
                } >
                <
                /div> < /
                div >

                <
                p id = "question-text"
                className = "mt-10 mb-6 font-medium text-gray-900 dark:text-white"
                style = {
                    { // Последние три месяца вы не растете в доходе
                        wordwrap: 'break -word',
                        position: 'relative',
                        top: '100px',
                        padding: '10px', // Добавлен отступ вокруг текста
                        borderRadius: '10px', // Добавлено закругление углов
                        maxWidth: '1000px',
                        fontFamily: 'Stapel',
                        color: '#000',
                        fontsize: '18px',
                        fontstyle: 'normal',
                        fontweight: '400',
                        lineheight: '90%',
                        texttransform: 'uppercase'
                    }
                } > { questions[currentQuestion].text } <
                /p>

                <
                div className = "flex items-center mb-4 mt-4" >
                <
                input id = "progress-range"
                type = "range"
                min = "0"
                max = "10"
                value = { selectedValue }
                onChange = {
                    (e) => handleAnswerChange(parseInt(e.target.value, 10))
                }
                className = "w-full h-20 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                style = {
                    {
                        width: '1016px',
                        borderRadius: '100px',
                        border: '2px #0038FF solid',
                        height: '20px',
                        outline: 'none',
                        padding: '0',
                        '-webkit-appearance': 'none',
                        position: 'fixed',
                        top: '350px',
                    }
                }
                />  < /
                div > <
                span className = "block mb-2 mr-2 text-sm font-medium text-gray-900 dark:text-white"
                style = {
                    {
                        color: '#0038FF',
                        fontsize: '16px',
                        fontfamily: 'Stapel',
                        fontweight: 400,
                        texttransform: 'uppercase',
                        lineheight: '14.40px',
                        wordwrap: 'break-word',
                        position: 'fixed',
                        top: '380px',
                    }
                } > 0(Нет) < /span> <
                span className = "block mb-2 ml-2 text-sm font-medium text-gray-900 dark:text-white"
                style = {
                    {
                        color: '#0038FF',
                        fontsize: '16px',
                        fontfamily: 'Stapel',
                        fontweight: 400,
                        texttransform: 'uppercase',
                        lineheight: '14.40px',
                        wordwrap: 'break-word',
                        position: 'fixed',
                        top: '380px',
                        right: '100px',

                    }
                } > 10(Да) < /span> < div style = { { position: 'absolute', bottom: 100, left: 70 }
            } >
            <
            label id = "answer-label"
        htmlFor = "progress-range"
        className = "mb-4 font-medium text-gray-900 dark:text-white"
        style = {
                {
                    color: '#0038FF',
                    fontSize: '18px',
                    fontFamily: 'Stapel',
                    fontWeight: 400,
                    textTransform: 'uppercase',
                    lineHeight: '16.2px',
                    wordWrap: 'break-word',
                }
            } > { `Ваш ответ: ${selectedValue}` } <
            /label> <div
        onClick = { handleNextClick }
        style = {
            {
                color: '#0038FF',
                fontFamily: 'Stapel',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '90%',
                textTransform: 'uppercase',
                textDecoration: 'underline', // Добавляем подчеркивание для эффекта ссылки
                cursor: 'pointer', // Делаем курсор указателем при наведении для обозначения кликабельности
                position: 'fixed',
                bottom: '120px',
                right: '100px'
            }
        } > { currentQuestion < questions.length - 1 ? 'Далее' : 'Завершить тест' } < /
        div > < /
        div >


            <
            /div> </Rectangle > < /
        div > );
}
};

const Sign = () => {

    const { email, setEmail, name, setName, sendDataToBackend } = useDataSender();
    const [isStarted, setIsStarted] = useState(false);

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const startTest = () => {
        setIsStarted(true);
    };

    const handleSubmit = async(event) => {
        event.preventDefault();

        if (name.trim() === '') {
            alert('Введите ваше имя');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Введите корректный email');
            return;
        }

        try {
            await sendDataToBackend(name, email); // Передаем name и email
            setIsStarted(true);
        } catch (error) {
            console.error('Ошибка отправки данных:', error);
        }
    };


    const isValidEmail = (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    };
    const config = require('./config');


    return ( <
        div className = "py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 bg-gray-800 text-white" >

        <
        div className = "max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400" > {!isStarted && ( < div >
                <
                GroupComponent / >
                <
                Rectangle > <
                form onSubmit = { handleSubmit } >
                <
                h2 className = "mb-4 text-4xl tracking-tight font-bold"
                style = {
                    { color: '#000', fontSize: '49.139px', fontFamily: 'Stapel', fontStyle: 'normal', fontWeight: 400, lineHeight: '90%', position: 'relative', left: '5%', textTransform: 'uppercase' }
                } >
                Тест вашей системы продвижения <
                /h2> <
                label htmlFor = "name"
                className = "block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                <
                span style = {
                    { fontFamily: 'Stapel', fontSize: '18px', color: 'rgba(0, 56, 255, 1)', position: 'relative', right: '-7%', textTransform: 'uppercase' }
                } >
                Ваше имя <
                /span> <
                input id = "name"
                type = "text"
                value = { name }
                onChange = { handleNameChange }
                className = "w-full h-10 bg-gray-200 rounded-lg appearance-none dark:bg-gray-700"
                style = {
                    {
                        border: '2px #0038FF solid',
                        position: 'relative',
                        top: '63px',
                        width: '393px',
                        height: '63px',
                        borderRadius: '100px',
                        fontSize: '150%',
                        outline: 'none',
                        padding: '0 20px',
                        right: '3%',
                    }
                }
                placeholder = "ИМЯ" /
                >
                <
                /label> <
                label htmlFor = "email"
                className = "block mb-2 text-sm font-medium text-gray-900 dark:text-white" >
                <
                span style = {
                    { fontFamily: 'Stapel', fontSize: '18px', color: 'rgba(0, 56, 255, 1)', textTransform: 'uppercase' }
                } >
                Ваш Email <
                /span> <
                input id = "email"
                type = "email"
                value = { email }
                onChange = { handleEmailChange }
                className = "w-full h-10 bg-gray-200 rounded-lg appearance-none dark:bg-gray-700"
                style = {
                    {
                        position: 'relative',
                        border: '2px #0038FF solid',
                        top: '63px',
                        width: '393px',
                        height: '63px',
                        borderRadius: '100px',
                        outline: 'none',
                        right: '10% ',
                        padding: '0 20px',
                        fontSize: '150%',
                    }
                }
                placeholder = "EMAIL" /
                >
                <
                /label> <
                button type = "submit"
                className = "block px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600"
                style = {
                    {
                        fontFamily: 'Stapel',
                        width: '220px',
                        height: '63px',
                        top: '100px',
                        position: 'relative',
                        right: '-7%',
                        background: 'rgba(0, 56, 255, 1)',
                        color: 'white',
                    }
                } >
                <
                span style = {
                    { fontFamily: 'Stapel', fontSize: '18px', fontWeight: 400, lineHeight: '16px', letterSpacing: '0em', textAlign: 'left', width: '127px', height: '16px' }
                } >
                Начать тест <
                /span> < /
                button > <
                /form>< /
                Rectangle > < /
                div >
            )
        } { isStarted && < Quiz / > } <
        /div>  < /
        div >
    );
};

const App = () => {
    const [quizCompleted, setQuizCompleted] = useState(false);

    // ... (остальной код)

    return ( <
        div className = "py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 bg-gray-800 text-white" >
        <
        Sign / > < /
        div >
    );
};

export default App;