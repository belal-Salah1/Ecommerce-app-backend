require('dotenv').config()
const express =require('express');
const app = express();
const PORT = process.env.PORT;
const mongoose = require('mongoose');
const productsRouter = require('./routes/products.route');
const categoriesRouter = require('./routes/categories.route');
const subCategoriesRouter = require('./routes/subCategories.route');
const usersRouter = require('./routes/users.route')
const cors = require('cors');
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connected to mongodb succesfully')


});

app.use(cors());
app.use(express.json());
app.use('/api/products',productsRouter );
app.use('/api/categories', categoriesRouter);   
app.use('/api/subcategories',subCategoriesRouter);
app.use('/api/users',usersRouter)
app.use((err,req,res,next)=>{
    err.statusCode = err.statusCode || 400;
    err.message = err.message || 'Something went wrong';
    err.statusText = err.statusText || 'ERROR';
    res.status(err.statusCode).json({
        statusText: err.statusText,
        statusCode: err.statusCode,
        message: err.message
    });
})

app.get('/healthcheck', (req, res) => {
  res.status(200).send('OK');
});

app.listen(PORT || 3000 ,'0.0.0.0', ()=>{
    console.log('server started successfully');
})