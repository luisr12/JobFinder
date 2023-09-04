const express = require('express');
const router  = express.Router();
const Job     = require('../models/job');
const currentDate = new Date();

//rota de teste
router.get('/test', (req,res)=>{
    res.send('deu certo');    
});

//rota da detalhe
router.get('/view/:id',(req,res)=>Job.findOne({
    where: {id: req.params.id}
}).then(job =>{
        res.render('view',{
            job
        });
    }).catch(err => console.log(err))
);

//rota do add
router.get('/add',(req,res)=>{
    res.render('add');
});


//job via post
router.post('/add',(req,res)=>{
  let {title, salary, company, description,email, new_job}=req.body; 


  //inserir dados do sistema
    Job.create({
        title,
        salary,
        company,
        description,
        email,
       new_job
    })

    .then(()=>res.redirect('/'))
    .catch(err => console.log(err));
});

module.exports = router
