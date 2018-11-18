const express=require('express');
const router=express.Router();

router.get('/',(req ,res)=>{
    const posts=[
        {title:'Post One' ,body:'This is the post one'},
        {title:'Post Two',body:'This is the post two'}
    ];
    function getPosts(){
        setTimeout(()=>{
            let output='';
            posts.forEach((post,index)=>{
                output+=`<li>${post.title}</li>`;
            });
            res.send(output);
        },1000);
    }

    function createPost(post,callback , callback2){
        setTimeout(()=>{
            posts.push(post);
            callback();
            callback2();
        },2000);
    }    
    function newpost(){
        console.log('All post completed');
    }
    createPost({title:'Post Third',body:'This is post three'},getPosts,newpost);
});

router.get('/promise',(req ,res)=>{
    const posts=[
        {title:'First Post',body:'First Post Body'},
        {title:'Sec Post',body:'Second Post Body'}
    ];
    function getPost(){        
        setTimeout(()=>{            
            var output='';
            posts.forEach((post)=>{
                output+=`<li>${post.title}</li>`;
            }); 
            res.send(output);           
        },1000);        
    }
    function createPost(post){
        return new Promise((resolve ,reject)=>{
            setTimeout(()=>{
                if(posts.push(post)){
                    resolve()
                }else{
                    reject('Error:Something went wrong');
                }
            },2000);
        });
    }
    createPost({title:'Third One',body:'Third body'})
    .then(getPost)
    .catch(err=>console.log(err));
});
router.get('/dup',(req ,res)=>{
    let a=[1,2,5,2,5,3,8];
    
    let b=[];
    let length=a.length;
    for(let i=0 ;i<length;i++ ){
        //console.log('Index: a['+a.indexOf(a[i]) +'] Value:'+a[i]);    
        if(b.indexOf(a[i]) === -1)                    
        {
            console.log(b.indexOf(a[i]));
            b.push(a[i]);
        }
    }
    console.log('-----------------------');
    
    console.log(b);

    let price=[10,8,4,88,90,12];
    obj={};
    for(let i of price){
        obj[i]=true;
    }
    console.log(obj);
    let pr=Object.keys(obj);
    console.log(pr);

    console.log('Using set and spread operator: '+[...new Set(price)]);
    let arr=[...new Set(price)];

    res.send('Using set and spread operator: '+arr.sort((a,b)=>{return a-b} ));

});
module.exports=router;
