const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Post=mongoose.model('Post');
const Comment=mongoose.model('Comment');

router.get('/',async (req,res)=>{
        const posts=await Post.find();
        res.send(posts);    
});
router.post('/',async (req,res)=>{            
        const post=new Post();
        post.title=req.body.title;
        post.content=req.body.content;
        await post.save();
        res.send(post);
});

router.get('/:id',async (req , res)=>{    
        const post=await Post.find({_id:req.params.id});
        res.send(post);    
});
router.put('/:id',async (req,res)=>{    
        const post=await Post.findByIdAndUpdate({_id:req.params.id,},req.body,{new:true , runValidators:true});
        res.send(post);    
});
router.delete('/:id',async (req , res)=>{    
        const post=await Post.findByIdAndRemove({_id:req.params.id});
        res.send(post);    
});
router.post('/:id/comment',async (req ,res)=>{
        //Find a post
        const post=await Post.findOne({_id:req.params.id});
        
        //create a comment
        const comment=new Comment();
        comment.content=req.body.content;
        comment.post=post._id;
        await comment.save();

        //associlate post with commets
        post.comments.push(comment._id);
        await post.save();

        res.send(comment);
});
router.get('/:id/comment',async (req,res)=>{
        const post=await Post.findOne({_id:req.params.id}).populate('comments');
        res.send(post);
});
module.exports=router;