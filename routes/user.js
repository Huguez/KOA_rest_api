const Router = require("koa-router");
const router = new Router();

const { getUsers, getUserById, createUser, updateUser, deleteUser } = require("../controllers/user");
const userSchema = require("../schema/userSchema");

const errorHandler = require("../middlewares/errorHandler");
const validarJWT = require("../middlewares/validarJWT")

router.use( errorHandler );

router.use( validarJWT )

router.post( "/create", userSchema.bodyValidate, createUser )

router.get( "/:id", userSchema.paramsValidate, getUserById )

router.get( "/", getUsers )

router.put( "/update/:id", userSchema.updateValidate, updateUser );

router.del( "/delete/:id", userSchema.paramsValidate, deleteUser )

module.exports = router;