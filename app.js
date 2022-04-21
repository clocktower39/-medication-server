const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const { ValidationError } = require('express-validation');
const cors = require('cors');
const prescriberRoutes = require('./routes/prescriberRoutes');
const patientRoutes = require('./routes/patientRoutes');
const userRoutes = require('./routes/userRoutes');
const relationshipRoutes = require('./routes/relationshipRoutes');
const noteRoutes = require('./routes/noteRoutes');
const labRoutes = require('./routes/labRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

require('dotenv').config();
const dbUrl = process.env.DBURL;
let PORT = process.env.PORT;
if( PORT == null || PORT == ""){
    PORT = 8000;
}
const SALT_WORK_FACTOR = Number(process.env.SALT_WORK_FACTOR);
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

app.use(cors())
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
mongoose.set('useFindAndModify', false);
app.use('/', prescriberRoutes);
app.use('/', patientRoutes);
app.use('/', userRoutes);
app.use('/', relationshipRoutes);
app.use('/', noteRoutes);
app.use('/', labRoutes);
app.use('/', serviceRoutes);

mongoose.connect(dbUrl, 
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    } , (err) => {
    console.log('mongo db connection', err)
})

// Error handling Function
app.use((err, req, res, next) => {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err)
    }
    console.error(err.stack);
    res.status(500).send(err.stack);
})

let server = http.listen(PORT, ()=> {
    console.log(`Server is listening on port ${PORT}`);
});