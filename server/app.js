const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

const sequelize = require('./utils/database');
const authController = require('./controller/auth');
const User = require('./models/user');

const corsOptions = {
    origin: 'http://localhost:5173',
};

const sessionStore = new sequelizeStore({
    db: sequelize,
});

sessionStore.sync();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
    session({
        secret: 'mana secret',
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
    })
);

app.use('/api', authController);

app.get('/api', (req, res, next) => {
    console.log('Session data:', req.session.user);
    res.json({ isLogin: false });
});

(async () => {
    try {
        await sequelize.sync();
        await app.listen(7070, () => {
            console.log('Server started');
        });
    } catch (error) {
        console.log(error);
    }
})();
