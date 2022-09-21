let express = require('express');
let app = express();
let routes = require('./routes/api.js');

app.use(express.static(process.cwd() + '/react-interface/build'));

routes(app);

app.listen(3000, () => console.log("App listening on port 3000"));