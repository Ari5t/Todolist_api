const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const taskRouter = require('./routes/task-routers');
const apiRouter = require('./routes/api-routers');
const methodOverride = require('method-override');
const api_auth_routes = require('./routes/api-auth-routes');
const secureRoute = require('./routes/api-secure-auth-routes');

const app = express();
const PORT = 3000;
const db = 'mongodb+srv://Yaroslav:qwerrewq@clus.mnkjs.mongodb.net/NodeTask?retryWrites=true&w=majority'

require('./auth/auth');

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((res) => console.log('Connected to DB'))
  .catch((error) => console.log(error));

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false }));
app.use(express.static('styles'));
app.use(methodOverride('_method'));

app.use(taskRouter);
app.use(apiRouter);

app.use('/auth', api_auth_routes);
app.use('/api', passport.authenticate('jwt', { session: false }), secureRoute);


app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
  });
