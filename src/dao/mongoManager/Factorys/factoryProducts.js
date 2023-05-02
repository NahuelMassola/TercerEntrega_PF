const { PERCISTENCIA, MONGODBURL } = require('../../../config/config');
const mongoose = require('mongoose')

let productDao = {};
( async () => {
    switch ( PERCISTENCIA ) {
        case 'Mongo':
            const connection = mongoose
            .connect(MONGODBURL)
            .then((conn) => {
                console.log('conectado a Mongo');
            })
            .catch((err) => {
                console.log('Error conectando a Mongo');
            });
            const { default: ProductDaoMongo } = await import('../BdProductManager')
            productDao = ProductDaoMongo
            break;
            
            case 'FS':
                const { default: ProductDaoFs } = await import('../../fsManager/ProductManager')
                productDao = ProductDaoFs
            
            break;

            default:
                const connectionDefaul = mongoose
            .connect(MONGODBURL)
            .then((conn) => {
                console.log('conectado a Mongo');
            })
            .catch((err) => {
                console.log('Error conectando a Mongo' + err);
            });
            const { default: ProductDaoMongoo } = await import('../BdProductManager')
            productDao = ProductDaoMongoo
            break;
}})

