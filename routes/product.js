const Router = require("koa-router");
const router = new Router()

const { createProduct, getProducts, updateProduct, deleteProduct, getProductById } = require("../controllers/product")
const productSchema = require("../schema/productSchema")

router.post( "/create", productSchema.createValidation,createProduct )

router.get( "/", getProducts );

router.get("/:id", productSchema.idParamValidate, getProductById )

router.put( "/update/:id", productSchema.updateValidate, updateProduct )

router.delete( "/delete/:id", productSchema.idParamValidate, deleteProduct )

module.exports = router