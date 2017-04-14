var path = require('path');
var express = require('express');
var app = express();
var md5 = require('md5');
var mainRoutes = require('./routes/index');
var apiRoutes = require('./routes/api');
var favicon = require('serve-favicon')

app.use(favicon(path.join(__dirname, 'assets/favicons', 'favicon.ico')))

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var cookieParser = require('cookie-parser');
app.use(cookieParser());


var hbs = require('express-hbs');
// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials',
  layoutsDir: __dirname + '/views/layouts',
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');


hbs.registerHelper("math", function (lvalue, operator, rvalue, options) {
  lvalue = parseFloat(lvalue);
  rvalue = parseFloat(rvalue);

  return {
    "+": lvalue + rvalue,
    "-": lvalue - rvalue,
    "*": lvalue * rvalue,
    "/": lvalue / rvalue,
    "%": lvalue % rvalue
  }[operator];
});

hbs.registerHelper("calculateAvgPoints", function (points, participants) {
  return  parseInt(points / participants) || 0 ;
});

hbs.registerHelper("userIsParticipating", function (participation) {
  return  participation ? true: false;
});



app.use('/api', apiRoutes);
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/vendor', express.static(path.join(__dirname, 'vendor')));
app.use('/', mainRoutes);



/*

var auth = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
  };

  var headers = req.headers;
  console.log(headers);

  var cookies = req.cookies;
  console.log(cookies);

	var secretKey = "secret-key";
	var membership = headers.membership;
	var whatspromoToken = headers.whatspromotoken;


  if (!membership || !secretKey || !whatspromoToken ) {
    return unauthorized(res);
  };

  if (md5(membership+secretKey) == whatspromoToken) {
    return next();
  } else {
    return unauthorized(res);
  };
};

app.use('/auth/user', auth, user);
app.use('/auth/promotion',auth, promotion);
app.use('/auth/participation', auth, participation);
app.use('/auth/stats', auth, stats);

*/


app.listen(3001, function () {
  console.log('WhatsPromo WebApp listening on port 3001!');

  console.log(",--.   ,--.,--.               ,--.         ,------.                                 ");
  console.log("|  |   |  ||  ,---.  ,--,--.,-'  '-. ,---. |  .--. ',--.--. ,---. ,--,--,--. ,---.  ");
  console.log("|  |.'.|  ||  .-.  |' ,-.  |'-.  .-'(  .-' |  '--' ||  .--'| .-. ||        || .-. | ");
  console.log("|   ,'.   ||  | |  |\\ '-'  |  |  |  .-'  `)|  | --' |  |   ' '-' '|  |  |  |' '-' ' ");
  console.log("'--'   '--'`--' `--' `--`--'  `--'  `----' `--'     `--'    `---' `--`--`--' `---'  ");
});


