const InsightSchema = require('./schema/insight_schema')
const {validationResult} = require('express-validator');

const save_insights = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    const insight = new InsightSchema(req.body);
    insight.save(function (err) {
        if(err) {
            console.log(err);
            return res.status(400).send('Something went wrong.');
        }
        return res.status(200).send('Added Insight');
    });
}

const get_insights = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors: errors.array()});

    const {walletAddress, origin} = req.body;
    InsightSchema.find({from: walletAddress, origin: origin}, function (err, results) {
        if(err) {
            console.log(err);
            return res.status(400).send('Something went wrong.');
        }
        res.status(200).json(results);
    });


}

module.exports = {
    save_insights,
    get_insights
}