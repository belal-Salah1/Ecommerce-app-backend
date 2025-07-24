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
app.options('/*splat', cors());
app.use(cors({
     origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Authorization', 'Content-Type']
}));
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

app.get('/healthcheck', async (req, res) => {
  try {
    const product = await Product.findOne();
    const uptime = process.uptime(); 
    const random = Math.floor(Math.random() * 1000); 

    res.status(200).json({
      status: 'ok',
      time: new Date().toISOString(),
      productTitle: product?.title || 'No product found',
      uptimeInSeconds: uptime,
      randomPingCode: random
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});



app.listen(PORT || 3000 ,'0.0.0.0', ()=>{
    console.log('server started successfully');
})