import express from 'express'
import cors from "cors"
import 'dotenv/config'
import connectDb from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import adminRouter from './routes/adminRoute.js'
const app = express()
// eslint-disable-next-line no-undef
const port = process.env.PORT || 4000
connectDb()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())

//api-endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/admin', adminRouter)
app.get('/',(req,res) => {
    res.send("API WORKING :>")
})
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})