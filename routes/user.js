const Router = require("koa-router");

const { getUsers, getUserById, createUser, updateUser, deleteUser } = require("../controllers/user");
const errorHandler = require("../middlewares/errorHandler");
const userSchema = require("../schema/userSchema");

const router = new Router();

router.use( errorHandler );

router.post( "/create", userSchema.bodyValidate, createUser )

router.get( "/:id", userSchema.paramsValidate, getUserById )

router.get( "/", getUsers )

router.put( "/update/:id", userSchema.updateValidate, updateUser );

router.del( "/delete/:id",  userSchema.paramsValidate, deleteUser )

module.exports = router;