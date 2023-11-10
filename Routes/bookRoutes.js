const express = require('express')
const BOOK = require('../models/bookSchema')
const router = express.Router()

router.route('/').get((req,res)=>{
       res.json({"message":"welcom to my first mern stack application"})
    })

router.route('/books')
    .post(async(req,res)=>{
        try {
            const {title,author,publishYear} = req.body
            if(title || author || publishYear){
                const book = {
                    title : `${title}`,
                    author: `${author}`,
                    publishYear:`${publishYear}`
                }
                const result = await BOOK.create(book)
                res.json({"message":"successfully posted"})
            }
            else{
                throw Error("enter all the fields")
            }
        } catch (err) {
            console.log(err.message)
        }
    })
    .get(async(req,res)=>{
        try {
            const books = await BOOK.find()
            res.json(books)
        } catch (err) {
            console.log(err.message)
        }
    })

router.route('/books/:id')
    .get(async(req,res)=>{
        try {
            const {id} = req.params
            const book = await BOOK.findById(id)
            res.json(book)
        } catch (err) {
            res.json({"message":"book not found"})
        }
    })
    .put(async(req,res)=>{
        try {
            const {id} = req.params
            const {title,author,publishYear} = req.body
            if(title || author || publishYear){
                const result = await BOOK.findByIdAndUpdate(id,req.body)
                res.json(result)
            }
            else{
                throw Error("enter every fiend to update")
            }
        } catch (err) {
            res.json({"message":"book not found"})
        }
    })
    .delete(async(req,res)=>{
        try {
            const {id} = req.params
            await BOOK.findByIdAndDelete(id)
            res.json({"message":"successfully deleted"})
        } catch (err) {
            res.json({"message":"book not found"})
        }
    })

module.exports = router