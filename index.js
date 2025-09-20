const express = require('express')
const {connectToMongoDB} = require('./connect.js')
const urlRoute = require('./routes/url')
const URL = require('./models/url.js')
const app = express()

const PORT = 5000

connectToMongoDB('mongodb://localhost:27017/short-url')
.then(()=>console.log(`mongodb connected`))

app.use(express.json())

app.use('/url', urlRoute)
app.get('/:shortId', async(req, res)=> {
    const shortID = req.params.shortId;
    const entry=await URL.findByIdAndUpdate({
        shortId
    },
    {
        $push: {
        visitHistory: {timestamp:Date.now()}
        }
    })
    res.redirect(entry.redirectURL)
})
app.listen(PORT, ()=> console.log(`Server started at port${PORT}`))