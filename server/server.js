const express = require('express');
const PORT = process.env.PORT || 2222
const path = require('path');
const db = require('./config/connection');
const { auth_routes, chat_routes, user_routes} = require('./routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/auth', auth_routes);
app.use('/chat', chat_routes);
app.use('/users', user_routes);

db.once('open', () => {
  app.listen(PORT, () => console.log(`SERVER SERVING AT PORT ${PORT}`))
})