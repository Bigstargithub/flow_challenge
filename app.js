const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const { sequelize } = require('./models');
const morgan = require('morgan');
const db = require('./models');
const session = require('express-session');
const indexRouter = require('./routes');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('port', process.env.PORT || 8000);
app.set('view engine', 'html');
nunjucks.configure('Template', {
    autoescape: true,
    express: app,
    watch: true,
});

db.sequelize.authenticate()
.then(() => {
    console.log('연결 성공');
    return db.sequelize.sync();
})
.catch((err) => {
    console.log('연결 실패');
    console.log(err);
});

app.use('/',indexRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 403;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    console.log(res.locals.message);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port') + '번으로 app listen');
});
