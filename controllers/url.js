const {nanoid} = require('nanoid')// nanoid generate unique IDs.
const URL = require('../models/url')//here we have imported the database
async function handleGenerateNewShortURL(req, res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error:'url is required'})
    const shortID = nanoid(8)//8 is to specify length
    await URL.create({
        shortId : shortID,
        redirectURL: body.url,
        visitHistory: [],
    })

    return res.json({id: shortID})
}
async function handleGetAnalytics(req, res){
    const shortId=request.params.shortId
    const result=await URL.findOne({shortId})
    return res.json({totalClicks: result.visitHistory.length, analytics: result.visitHistory})
}
module.exports= {handleGenerateNewShortURL,handleGetAnalytics}