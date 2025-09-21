const express = require('express')
const {handleGenerateNewShortURL, handleGetAnalytics, handleRedirectToOriginalURL}=require('../controllers/url')
const router = express.Router()

router.post('/', handleGenerateNewShortURL)
router.get('/analytics/:shortId', handleGetAnalytics )
router.get('/:shortId', handleRedirectToOriginalURL)
module.exports  = router