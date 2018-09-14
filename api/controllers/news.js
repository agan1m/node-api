const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./br');
const jwt = require('jsonwebtoken');

const api = {};

api.saveNews = (News) => async (req, res) => {
    let result = JSON.parse(req.text);
    
    if(!result.theme) res.json({success: false, message: 'Title is empty!'})
    else {
        const token = localStorage.getItem('token');
        const user = jwt.decode(token);
        console.log(user)
        const newNews = new News({
            theme: result.theme,
            text: result.text,
            date: Date.now(),
            user: user
        });
        await newNews.save((error) => {
            if(error) res.status(400).json({success: false, message: "ERROR!!!"});
        });
        News.find({}, (error, news) => {
            if(error) throw error;
            res.status(200).json(news)
        })
    }
};

api.getNews = (News) => (req, res) => {
    News.find({}, (error, news) => {
        if(error) throw error;
        res.status(200).json(news);
    })
};

api.updateNews = (News) => (req, res) => {
    let result = JSON.parse(req.text)
    News.findOneAndUpdate(req.param.id, result, (error, news) => {
        if(error) throw error;
        res.status(200).json(news)
    })
};

module.exports = api;