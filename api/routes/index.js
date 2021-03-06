var express = require('express');
var router = express.Router();

const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./br');

const authCtrl = require('../controllers/auth');
const userCtrl = require('../controllers/users');
const newsCtrl = require('../controllers/news');
const userModel = require('../db/models/users');
const newsModel = require('../db/models/news');

router.get('/', function(req, res, next) {
  res.json({ success: true });
});

/* router.post('/saveNewUser', async (req, res) => {
    try {
        const result = await UserCtrl.saveNewUser(JSON.parse(req.text));
        res.json(result);
    }
    catch(err) {
        console.error("err", err);
        res.json({
            success: false,
            message: 'Internal error'
        });
    }
}) */

router.post('/login', authCtrl.login(userModel));
router.post('/setup', userCtrl.setup(userModel));
router.post('/saveNewUser', userCtrl.signup(userModel));
router.post('/newNews', newsCtrl.saveNews(newsModel));
router.get('/getNews', newsCtrl.getNews(newsModel));
router.get('/getUsers', userCtrl.index(userModel, localStorage.getItem('token')));
router.put('/updateNews', newsCtrl.updateNews(newsModel));

/* router.post('/login', async (req, res) => {
    try {
        const result = await UserCtrl.getUser(JSON.parse(req.text));
        res.json(result);
    } catch (error) {
        console.error('err', error)
        res.json({
            success: false,
            message: 'Internal error'
        });
    }
}); */

module.exports = router;
