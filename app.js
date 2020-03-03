import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';

const app = express();

//conexion a bbdd

const mongoose = require('mongoose');
const uri = 'mongodb+srv://Nicolas:pedri11carli13@gettingstarted-hjssv.mongodb.net/vue-notas?retryWrites=true&w=majority';
const options = {
    useNewUrlParser: true, useCreateIndex:true,
    useUnifiedTopology: true 
    
}

mongoose.connect(uri, options).then(
    () => {
        console.log('conectado');
    },
    err => { err }
  );


app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', require('./routes/nota'));

app.get('/', function (req,res){
    res.send('Todo va perfect');
});
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname, 'public')));

app.set('puerto', process.env.PORT || 3000);

app.listen(app.get('puerto'), function(){
    console.log('escuchando en el puerto:', app.get('puerto'),'!');
});