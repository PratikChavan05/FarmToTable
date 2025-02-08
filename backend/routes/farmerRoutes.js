import  express from  'express';
import { isAuth } from '../middlewares/isAuth.js';
import { addProduct, deleteProduct, editProduct, getAllProducts, getFarmerOrders, getSingleProduct } from '../controllers/farmerControllers.js';
import uploadFile from '../middlewares/multer.js';
const router = express.Router();


router.post("/addproduct",isAuth,uploadFile,addProduct);
router.get("/all",isAuth,getAllProducts);
router.get("/myproducts",isAuth,getSingleProduct);
router.delete("/delete", isAuth, deleteProduct);
router.put("/edit", isAuth, editProduct);
router.get("/orders", isAuth, getFarmerOrders);




export default router;