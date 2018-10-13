const Express = require('express');
var productApi = require("./api/product");

const router = Express.Router();

router.use(productApi);


module.exports = router;