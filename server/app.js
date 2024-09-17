const express = require('express');
const cors = require('cors');
const session = require('express-session');
const bodyParser = require('body-parser');
const sequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

const sequelize = require('./utils/database');
const authRoutes = require('./routes/auth');
// const propertyController = require('./controller/property');
// const User = require('./models/user');

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

const sessionStore = new sequelizeStore({
    db: sequelize,
});

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

app.use((req, res, next) => {
    if (!req.session.user) {
        console.log('No session saved. How come?')
        return next();
    }
    console.log('We can woork');
    return next();
});

app.use('/api', authRoutes);
// app.use('/api', propertyController);

app.get('/api', async (req, res, next) => {
    await req.session.save();
    console.log('Session data:', req.session.user);
    res.json({ isLogin: false, data: req.session });
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
