const path = require('path');

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.use(express.urlencoded({ extended: true }));



const validateRouter = require('./routes/validate/validate');
app.use('/validate', validateRouter);



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
