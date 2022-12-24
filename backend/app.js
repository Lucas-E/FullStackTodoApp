var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors")
var app = express();
//settingup cors
app.use(cors({
    origin: '*'
}))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//setting up body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))

//setting up database
const Sequelize = require('sequelize');
const models = require('./models/index').sequelize

async function connection(Sequelize, models){
    try {
        const sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: './db.sqlite3'
        })
        const conn = await sequelize.authenticate();
        console.log('Conexão feita com sucesso!')
    } catch (error) {
        console.log('Erro de conexão com database');
    }
}

connection(Sequelize, models)

//setting up routes
const todosRouter = require('./routes/todos')
app.use('/todos', todosRouter)




module.exports = app;
