Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port } = require('./config/vars');
const app = require('./config/express');
const mongoose = require('./config/mongoose');

mongoose.connect();

app.listen(port, () => console.info(`server started on port ${port}`));

module.exports = app;