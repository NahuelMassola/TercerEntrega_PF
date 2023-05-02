const productsServiceBd = require('../service/products.service')

const getProductsBd = async (req, res) => {
  try {
    const { limit, page, sort, ...query } = req.query;
    const products = await productsServiceBd.getProduct(page, limit, sort, query);
    return res.json({
      status: "Sucess",
      playload: products,
    })

  } catch (error) {
    return res.json({
      status: "Error",
      playload: "error al intentar mostrar productos",
    })
  }

};


const getProductIdBd = async (req, res) => {

  try {
    const id = req.params.pid
    const getProductId = await productsServiceBd.getProductId(id);
    return res.json({
      status: "Sucess",
      playload: getProductId,
    })
  } catch (error) {
    return res.json({
      status: "Error",
      playload: "error al obtener el producto",
    })
  }
}

const addProductBd = async (req, res) => {
  try {
      const product = req.body;
      const newproduct = await productsServiceBd.addProduct(product);
      return res.json({
        status: "Sucess",
        payload:newproduct,
      })
  } catch (error) {
    return res.json({
      status: "error",
      playload:"error al crear producto",
    })
  }
}


const UpdateProductBd = async (req, res) => {
  
  try {
    const id = req.params.pid
    const product = req.body
    const UpdateProductId = await productsServiceBd.UpdateProduct(id, product);
    return res.json({
      status: "Sucess",
      playload:UpdateProductId,
    })
    
  } catch (error) {
    return res.json({
      status: "error",
      playload:"error al actualizar producto",
    })
    
  }
}

const deleteProductBd = async (req, res) => {
  try {
    const id = req.params.pid
    const deleteproduct = await productsServiceBd.DeleteProductId(id);
    return res.json({
    status: "Sucess",
    playload: deleteproduct,
  })
} catch (error) {
  return res.json({
    status: "erorr",
    playload: "error al eliminar producto",
  }) 
}
}

module.exports = {
  getProductsBd,
  getProductIdBd,
  addProductBd,
  UpdateProductBd,
  deleteProductBd,
}
