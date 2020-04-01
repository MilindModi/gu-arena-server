const get_result_pages = require('./routes/get-result-page');
const express = require('express');
const app = express();
app.use(express.json());

app.use('/get-result-page', get_result_pages);
app.get('/',  function (req, res) {
    res.send("hello");
});
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on Port ${port}...`));