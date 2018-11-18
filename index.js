
require('express-async-errors');

const express=require('express');

const app=express();

const mongoose=require('mongoose');

const bodyparser=require('body-parser');
var events=require('events');
var logger=require('morgan');
var nodemailer=require('nodemailer');


//database connection
require('./mongo');

//Modle
require('./post/Post');
require('./post/Comment');


//middleware
app.use(bodyparser.json());
app.use(logger('combined'));



//Routers
var posts=require('./routes/posts');
var practice=require('./routes/practice');
app.use('/posts',posts);
app.use('/practice',practice);




//const Post=mongoose.model('Post');

app.get('/promise',(req , res)=>{
    function getStudent(){
        return new Promise(function(resolve , reject){
            resolve('This promise is resolved');
        });
    }
    getStudent().then(success , failure);
    function success(success){
        console.log(success);
    }
    function failure(){
        console.log('Failure')
    }
});
app.get('/callback',(req ,res)=>{

    //CALLL BACK

    // first(2,function(firstResult,err){
    //         if(!err){
    //             second(firstResult,function(secondResult,err){
    //                     if(!err){
    //                         third(secondResult,function(thirdResult , err){
    //                             console.log(thirdResult);
    //                         });
    //                     }
    //             });{

    //             }
    //         }
    // });


    //Promise
     var promise= new Promise(function(resolve , reject){
         resolve(2);
     });

     promise.then(first).then(second).then(third).then(function(response){
         console.log(response);
     });
    //  promise.catch(function(error){
    //      console.log(error);
    //  });

     

    function first(value){
        return value+2;
    }
    function second(value){
        return value+2;
    }
    function third(value){
        return value+2;
    }
});

app.get('/all',(req,res)=>{
    const posts=[
        {title:'Post One',body:'This is the post one'},
        {title:'Post Two',body:'This is post two'}
    ];
    function getPosts(){
        setTimeout(()=>{
            let output='';
            posts.forEach((post)=>{
                output+=`<li>${post.title}</li>`;
            });
            res.send(output);
        },1000);
    }
    

    // function createPost(post,callback){
    //     setTimeout(()=>{
    //         posts.push(post);
    //         callback();
    //     },2000);
    // }
    // createPost({title:'Third Post',body:'This is third post'},getPosts);       
    
    function createPost(post){
        return new Promise((resolve ,reject)=>{
            setTimeout(()=>{
                if(posts.push(post)){
                    resolve();
                }else{
                    reject('Error : Something went wrong..');
                }
            },2000);
        });
     }
    createPost({title:'Post Three',body:'This is post three'})
    .then(getPosts)
    .catch(err=>console.log(err))

});
app.get('/arrays',(req,res)=>{
    let fruits=['orange','mango','apple','banana'];
    console.log(fruits.toString());
    console.log(fruits.pop());
    console.log(fruits.toString());
    console.log(fruits.push('Kiwi'));
    console.log(fruits.toString());
    console.log(fruits.shift());
    console.log(fruits.toString());
    console.log(fruits.unshift('guava'));
    console.log(fruits.toString());
    //console.log(fruits.join('*'));
    console.log(fruits.length);

    var cars=['maruti','nissan','mahindra'];
    cars.splice(2,0,'K10','I10');

    var animals=['dog','cat','ant','tiger'];
    animals.splice(4,2,'lion','dear');
    console.log(animals);
    console.log(animals.splice(0,2));
    console.log(animals);
    
    let nums=[1,2,2,5];
    console.log([...new Set(nums)]);
    let  newarray=[...new Set(nums)];
    console.log(newarray);
});
app.get('/events',(req ,res)=>{
    var eventEmitter=new events.EventEmitter();
    
    eventEmitter.on('otherevent',()=>{
        console.log('Other Event');        
    });
    eventEmitter.emit('otherevent');
    // var connectHandler=function connected(){
    //     console.log('Connection successfull..');
    //     // Fire the data_received event
    //     eventEmitter.emit('data-received');
    // }

    // // Bind the connection event with the handler  
    // eventEmitter.on('connection',connectHandler);
    // // Bind the data_received event with the anonymous function 
    // eventEmitter.on('data-received',function(){
    //     console.log('data received successfully');
    // });
    // eventEmitter.on('newevent',()=>{
    //     console.log('New Event Arises');
    // });

    // // Fire the connection event   
    // eventEmitter.emit('connection');
    // eventEmitter.emit('newevent')
    console.log('Program Ended');
});
app.get('/contact',(req,res)=>{
    console.log(req.query);
    // setInterval(function() {  
    //     console.log("setInterval: Hey! 1 millisecond completed!..");   
    //    }, 1000);
    var transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'apoorvsrivastava.28@gmail.com',
            pass:'apoofsrivasta345rvradja'
        }
    });
    var mailOptions={
        from:'apoorvsrivastava.28@gmail.com',
        to:'apoorvsrivastava.28@gmail.com',
        subject:'Sending Email',
        text:'Easy emailing'
    };
    transporter.sendMail(mailOptions , function(error , info){
        if(error){
            console.log(error);
        }else{
            console.log('Email sent:'+clientInformation.response)
        }
    });
});

//custom middleware for Route not found
app.use((req,res,next)=>{
    req.status=404;
    const error=new Error("Routes Not Found");
    next(error);
});

//error handler
if(app.get("env")==="production"){
    app.use((error , req ,res, next)=>{
        res.status(req.status || 500).send({
            message:error.message
        });
        
    });
}
app.use((error , req ,res, next)=>{
    res.status(req.status || 500).send({
        message:error.message,
        stack:error.stack
    });
    
});

app.listen(7777,()=>console.log('Server running at port:7777'));