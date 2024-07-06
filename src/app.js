const express = require('express');
const botRoutes = require('./routes/botRoutes');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/bot', botRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
