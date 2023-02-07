const router = require('express').Router();
const controller = require('./controller');
const {body} = require('express-validator');
const mongoose = require('mongoose');
const {connectDB} = require('./db')

const db_status = (req, res, next) => {
    if(mongoose.connection.readyState == 1) {
        return next();
    } else {
        connectDB();
        return res.status(500).send('DB not connected.');
    }

}

router.post('/save_insights',
    body('origin').isLength({min: 1}),
    body('nonce').isLength({min: 1}),
    body('gasPrice').isLength({min: 1}),
    body('gas').isLength({min: 1}),
    body('to').isLength({min: 1}),
    body('from').isLength({min: 1}),
    body('value').isLength({min: 1}),
    body('data').isLength({min: 1}),
    body('chainId').isLength({min: 1}),
    db_status,
    controller.save_insights
);

router.post('/insights',
    body('walletAddress').isLength({min: 1}),
    body('origin').isLength({min: 1}),
    db_status,
    controller.get_insights
);

router.get('/test', (req, res) => {
    res.status(200).send('Server is running.')
})

router.get("/test_db", (req, res) => {
    let state = mongoose.connection.readyState;
    res.status(state == 1 ? 200 : 500).send(`DB Status: ${mongoose.STATES[mongoose.connection.readyState]}`);
})

module.exports = router;

