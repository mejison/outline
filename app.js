'use strict';

const http = require('./express/server');
http.listen(process.env.VUE_APP_BACKEND_PORT, () => console.log(`listening on *:${process.env.VUE_APP_BACKEND_PORT}!`));