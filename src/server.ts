import express from 'express';
import path from 'path';
import route from './routes/index';

const app = express();

/* Config View engine to EJS */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.use(route);
app.use(express.static('public'));

app.listen(8080, () => {
  console.log('server on');
});
