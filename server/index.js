require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const authRouter = require('./route/auth.js');

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DBUR}:${process.env.DBPW}@klick.bmhqb.mongodb.net/klick?retryWrites=true&w=majority`, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useFindAndModify:false
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}
connectDB();


app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));
app.use('/api/auth/', authRouter);

const PORT = 9089
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))
