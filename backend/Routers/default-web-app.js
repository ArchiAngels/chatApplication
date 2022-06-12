const express = require('express');
const FS = require('fs');
const PATH = require('path');
const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
})
// define the home page route
router.get('/test', (req, res) => {
    let html = `'FS.readFileSync(PATH.join(__dirname,'../../','"index"."html"'))';`;
    res.send(html);
})

module.exports = router;