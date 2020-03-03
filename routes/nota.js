import express from 'express';
const router = express.Router();

//importar el modelo nota
import Nota from '../models/nota';

//agregar una nota

router.post('/nueva-nota', async(req,res)=>{

    const body = req.body;

    try{
        const notaDB = await Nota.create(body); 
        res.status(200).json(notaDB);
    }
    catch (error){
        return res.status(500).json({
            mensaje: 'ocurrió un error',
            error
        })

    }

});

// get con parámetros

router.get('/nota/:id', async(req,res) =>{
    const _id = req.params.id;
    try {
        const notaDB = await Nota.findOne({_id});
        res.json(notaDB);

    } catch (error) {
        return res.status(400).json({
            mensaje: 'ocurrió un error',
            error
        })
    }
});
//get todos los registros

router.get('/notas', async(req,res)=>{

    try {
        const notaDB = await Nota.find();
        res.json(notaDB);
        
    } catch (error) {
        return res.status(400).json({
            mensaje: 'ocurrió un error',
            error
        })
    }
});
router.delete('/nota/:id', async(req, res) => {
    const _id = req.params.id;
    try {
      const notaDb = await Nota.findByIdAndDelete({_id});
      if(!notaDb){
        return res.status(400).json({
          mensaje: 'No se encontró el id indicado',
          error
        })
      }
      res.json(notaDb);  
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });
  // Put actualizar una nota
router.put('/nota/:id', async(req, res) => {
    const _id = req.params.id;
    const body = req.body;
    try {
      const notaDb = await Nota.findByIdAndUpdate(
        _id,
        body,
        {new: true});
      res.json(notaDb);  
    } catch (error) {
      return res.status(400).json({
        mensaje: 'Ocurrio un error',
        error
      })
    }
  });

module.exports = router;