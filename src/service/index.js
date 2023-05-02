const daoProducts = require('../dao/mongoManager/BdProductManager');
const daoCarts = require('../dao/mongoManager/BdCartManager');
const daoSessions = require('../dao/mongoManager/BdsessionManager');

const productService = require('../service/products.service');
const cartsService = require('../service/carts.service');
const sessionService = require('../service/sessions.service');

const productServices = new productService(new daoProducts);
const cartServices = new cartsService(new daoCarts);
const sessionServices = new sessionService(new daoSessions);

module.exports = { 
    productServices,
    cartServices,
    sessionServices
}
