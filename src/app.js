const path=require('path')
const express=require('express')
const hbs=require('hbs')
const app=express()
const geocode = require('./utils/geocode')
const forecast=require('./utils/forecast')

//Define Path for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../template/views')
const partialsPath=path.join(__dirname,'../template/partials')


//setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'First page',
        name:'Rishabh Kulshrestha'
    })
})
// app.get('/weather',(req,res)=>{
//     res.render('index',{
//         title:'Weather',
//         name:'Rishabh Kulshrestha'
//     })
// })
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Rishabh Kulshrestha'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        name:'Rishabh Kulshrestha'
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error:"Please enter search term"
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })
})
app.get('/weather',function(req,res){
    if(!req.query.search)
    {
        return res.send({
            error:"Please enter search term"
        })
    }
    geocode(req.query.search, (error, data) => {
        if(error)
        {
            return res.send({
                error:error
            })
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if(error)
            {
                return res.send({
                    error:error
                })
            }
            return res.send({
                location:data.location,
                forecast:forecastData
            })
          })
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'Error Page',
        name:'Rishabh Kulshrestha',
    })
})

app.listen(3000,()=>{
    console.log('Server started successfully')
})