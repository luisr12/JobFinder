const express    =    require('express');
const exphbs     = require('express-handlebars');
const app        =        express();
const path       =       require('path');
const db         =         require('./DB/connection');
const bodyParser = require('body-parser');
const job        = require ('./models/job');
const Sequelize  = require('sequelize');
const Op         = Sequelize.Op;

const PORT = 3000;
app.listen(PORT, function(){
    console.log(`O express esta funcionando na porta ${PORT}`);
});

//body parser
app.use(bodyParser.urlencoded({extended:false}));
// handlebars
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main.hbs'}));

//app.engine('.hbs', exphbs.engine({defaultLayout:'view.hbs'}));

app.set('view engine', '.hbs');

//static folder

app.use(express.static(path.join(__dirname,'public')));//declara os meus arquivos staticos



//db conection
db
    .authenticate()
    .then(()=>{
        console.log("Conectou ao banco com sucesso!");
    })
    .catch(err => {
        console.log("Ocorreu um erro ao conecta", err);
    })



// routes




app.get('/', (req,res)=>{

    let search = req.query.job;
    let query  = '%'+search+'%'; 
    const currentDate = new Date();
    
    
 
    if(!search){
      
        //recupera as vagas do banco
       

        
        
        job.findAll({
            order:[
            ['createdAt', 'DESC']
        ]})
        .then(jobs=>{
            

            res.render('index',{
                jobs
            });
        })
            .catch(err => console.log(err));
    }else{
        // Obtém a data atual
        
        job.findAll({

            where: {title: {[Op.like]: query}},
            order:[
            ['createdAt', 'DESC']
        ]})
        .then(jobs=>{
             
            res.render('index',{
                jobs, search, showNewJob: showNewJob
            });
        })
            .catch(jobs=>{
            res.send('Erro')
        });
        
    } 
    

});
async function showNewJob(jobs, res) { // Aceite o array de vagas de emprego como parâmetro
    try {
        const fiveDaysAgo = new Date();
        fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

        const newJobs = jobs.filter(job => new Date(job.createdAt) >= fiveDaysAgo);

        res.render('index', {
            jobs: newJobs
        });
    } catch (error) {
        console.error('Erro ao buscar trabalhos:', error);
        res.send('Erro');
    }
};

app.use('/jobs', require('./routes/jobs'));

