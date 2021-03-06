const express = require('Express')
const app = express();

const connectDB = require('./config/db')

connectDB();

const port = process.env.PORT || 5000;


app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.use('/',require('./routes/redirect'))
app.use('/api', require('./routes/urls'));

app.listen(port, ()=> {
    console.log(`Server started at ${port}`);
})