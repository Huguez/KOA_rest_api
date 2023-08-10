const Router = require("koa-router");
const router = new Router()

const validarJWT = require("../middlewares/validarJWT")
const errorHandler = require("../middlewares/errorHandler")

const { createProduct, getProducts, updateProduct, deleteProduct, getProductById } = require("../controllers/product")
const productSchema = require("../schema/productSchema")

router.use( errorHandler )

router.get( "/", getProducts );
router.get("/:id", productSchema.idParamValidate, getProductById )

router.use( validarJWT )

router.post( "/create", productSchema.createValidation,createProduct )

router.put( "/update/:id", productSchema.updateValidate, updateProduct )

router.delete( "/delete/:id", productSchema.idParamValidate, deleteProduct )

module.exports = router