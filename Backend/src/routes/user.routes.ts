import { Router } from 'express'; // Importing third party package
import { registerUser, loginUser, getCurrentUser } from '../controllers/user.controller';
import { verifyToken } from '../middleware/auth'; //Import middleware
const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/me', verifyToken, getCurrentUser);
export default router;
