import { Router } from 'express';
import { productController } from '../../../controllers/product.controller';

const router = Router();

router.get('/', productController.find)
router.get('/:id', productController.findById)
router.post('/', productController.create)
router.put('/:id', productController.updateById)
router.delete('/:id', productController.deleteById)
export default router;
