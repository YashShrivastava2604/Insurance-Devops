import express from 'express'
const router = express.Router()

import { register, login, logout, verifyOTP } from '../controllers/auth.controller.js'
import { adminRoute, protectRoute } from '../middlewares/auth.middleware.js'
import User from '../models/user.model.js'

router.post('/login', login)
router.post('/register', register)
router.post('/logout', logout)
router.post('/verify-otp', verifyOTP)
router.get('/check-auth', protectRoute, (req, res) => { res.json({message: "Authorized"}) })
router.get('/check-adminauth', adminRoute, (req, res) => { res.json({message: "Authorized"}) })
router.get('/profile', protectRoute, (req, res) => {
    try{
        res.json(req.user)
    } catch(error){
        console.log(error);
    }
})
router.get('/admin/stats', protectRoute, adminRoute, async (req, res) => {
    const userCount = await User.countDocuments();
    const policiesCount = await Policy.countDocuments();
    const claimsCount = await Claim.countDocuments();
    res.json({ userCount, policiesCount, claimsCount });
})

export default router;