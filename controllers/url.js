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

    return res.render('home', {
        id: shortID
    })
}
async function handleGetAnalytics(req, res){
    const shortId=request.params.shortId
    const result=await URL.findOne({shortId})
    return res.json({totalClicks: result.visitHistory.length, analytics: result.visitHistory})
}

async function handleRedirectToOriginalURL(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId });
    if (!entry) return res.status(404).send('URL not found');
    // Optionally, update visitHistory here if you want to track visits
    return res.redirect(entry.redirectURL);
}
module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleRedirectToOriginalURL
};