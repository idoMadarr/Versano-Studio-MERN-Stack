const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const URI = `mongodb+srv://ido_adar:239738416@cluster0.p4d4y.mongodb.net/yasmin`;
const PORT = process.env.PORT || 5000;

const routes = require('./routes/routes');

const app = express();

app.use(express.json({ extended: false }));

// Multer Middelware:
app.use('/uploads/images', express.static(path.join('uploads', 'images')));

// Main Routes:
app.use('/api/products', routes);


mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    app.listen(PORT);
    console.log(`Server started on port ${PORT}`);
})
.catch(error => console.log(error));