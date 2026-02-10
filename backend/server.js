import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'

import authRoutes from './routes/auth.routes.js'
import planRoutes from './routes/plan.routes.js'
import policyRoutes from './routes/policy.routes.js'
import claimRoutes from './routes/claim.routes.js'
import cors from 'cors'

const app = express()
dotenv.config()
const PORT = process.env.PORT || 5000

connectDB()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded( { extended: true } ))
app.use(cookieParser())


app.use('/api/auth', authRoutes)
app.use('/api/plans', planRoutes)
app.use('/api/policies', policyRoutes)
app.use('/api/claims', claimRoutes)

app.get('/', (req, res) => {
    res.json("Welcome. Server is running. ")
})

app.listen(PORT, () => {
    console.log("Server running on port ", PORT)
})
