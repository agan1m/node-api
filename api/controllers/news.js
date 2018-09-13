

const api = {};

api.saveNews = (News) => (req, res) => {
    let result = JSON.parse(req.text);
    console.log(result)
    if(!result.theme) res.json({success: false, message: 'Title is empty!'})
    else {
        const newNews = new News({
            theme: result.theme,
            text: result.text
        });
        newNews.save((error) => {
            if(error) res.status(400).json({success: false, message: "ERROR!!!"});
            res.json({
                theme: newNews.theme,
                text: newNews.text
            })
        })
    }
};

api.getNews = (News) => (req, res) => {
    News.find({}, (error, news) => {
        if(error) throw error;
        res.status(200).json(news);
    })
};

module.exports = api;