const express = require('express');
const PORT = process.env.PORT || 3001;

const app = express();

// Middleware для обработки JSON в теле запроса
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server starting on port ${PORT}`);
});

// Обработчик POST-запроса для /api/data
app.post('/api/data', (req, res) => {
    const { email, name } = req.body; // Получение данных из тела запроса

    // Делаете что-то с полученными данными, например, сохраняете их в базу данных

    res.json({ message: 'Данные успешно получены на сервере' });
});