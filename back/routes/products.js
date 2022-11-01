const express=require("express")
const router=express.Router();

const {getProducts, newProduct, getProductById, updateProduct, deleteProduct} = require("../controllers/productsController"); //Traemos la respuesta json desde el controlador
const { isAuthenticatedUser , authorizeRoles} = require("../middleware/auth");

//Probemos autenticación
router.route('/productos').get(isAuthenticatedUser, authorizeRoles("admin"), getProducts)  //Establecemos desde que ruta queremos ver el getProducts
router.route('/producto/nuevo').post(newProduct); //establecemos la ruta
router.route('/producto/:id').get(getProductById); //Ruta para consultar por id
router.route('/producto/:id').put(updateProduct);//Creacion de la ruta de actualizacion
router.route('/producto/:id').delete(deleteProduct); //Creacion de la ruta de eliminacion por id
 

module.exports=router;