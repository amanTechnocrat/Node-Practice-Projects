const express = require('express');
const { engine } = require('express-handlebars');
const app = express()

app.engine('handlebars', engine({
    helpers: {
        add: (val1, val2) => { return val1 + val2 }
    }
}));
app.set('view engine', 'handlebars');


app.get('/', (req, res) => {
    res.render('index', { name: "jk" })
})
app.get('/about', (req, res) => {
    res.render('about', { check: false, people: ["aa", "ww", "rr", "ee"], obj: { firstName: "John", lastName: "Doe", age: 50, eyeColor: "blue" } })
})
app.listen(8888)