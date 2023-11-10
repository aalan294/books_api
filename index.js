const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const { put } = require('./Routes/bookRoutes')
const cors = require('cors')

const PORT = process.env.PORT ||3400
const app = express()

app.use((req,res,next)=>{
    console.log(`${req.origin} ${req.method}`)
    next()
})
app.use(cors())
//  app.use(cors({
// //     origin:'http://localhost:3500',
// //     methods : ['GET','PUT','POST','DELETE'],
// //     allowedHeaders:['Content-Type']
//  }))
app.use(express.json())
app.use('/',require('./Routes/bookRoutes'))


const main = async()=>{
    await mongoose.connect('mongodb+srv://aalan_29_4:Twoninefour_294@bookcluster.7hoggwj.mongodb.net/book-collection?retryWrites=true&w=majority').then(()=>{
        console.log("successfully connected to database")
        app.listen(PORT,()=>{
            console.log(`listening to port ${PORT}`)
        })
    })
}
main().catch(err => console.log(err.message))