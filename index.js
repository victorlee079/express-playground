const express = require('express');
const bodyParser = require('body-parser');
const items = require('./js/item');

const app = express();

const VALID_IMG_URL = [];
(function () {
    for (let i = 1; i <= 10; i++) {
        VALID_IMG_URL.push(i + ".jpg");
    }
})();

function isPositiveInteger(value) {
    return /^\d+$/.test(value);
}

function validateItem(item) {
    if (!("title" in item) || !("price" in item) || !("imageUrl" in item)) {
        return false;
    }

    item.title = item.title.trim();
    item.price = item.price.trim();
    item.imageUrl = item.imageUrl.trim();

    if (!item.title) {
        return false;
    }

    if (isPositiveInteger(item.price)) {
        let price = parseInt(item.price)
        if (price > 1000000 || price < 0) {
            return false;
        }
    } else {
        return false;
    }

    if (VALID_IMG_URL.indexOf(item.imageUrl) < 0) {
        return false;
    }

    return true;
}

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/sm/img', express.static('public/small-img'));
app.use('/img', express.static('public/img'));
app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));

app.get("/", function (req, res) {
    res.render('index', { name: 'Lee Yuk Cheung', studentId: '1155129462' });
});

app.get("/item", function (req, res) {
    let found = false;
    if ("id" in req.query && isPositiveInteger(req.query.id)) {
        let id = parseInt(req.query.id);
        let result = items.findById(id);
        if (result) {
            found = true;
            res.render("showitem", {
                success: true,
                item: result
            });
        }
    }
    if (!found) {
        res.render("showitem", {
            success: false
        });
    }
});

app.get("/items", function (req, res) {
    res.render('allitems');
});

app.post("/items", function (req, res) {
    let result = items.getAll();
    res.status(200).json({
        result: result
    });
});

app.get("/add_item", function (req, res) {
    res.render('additem');
});

app.post("/add_item", function (req, res) {
    let params = req.body;
    if (validateItem(params)) {
        items.create(params);
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.listen(8080);
