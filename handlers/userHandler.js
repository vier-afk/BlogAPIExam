const User = require('../model/User');
const Blog = require('../model/Blog');
const path = require('path');

exports.checkUserId = async (req, res, next, val) => {
    try{
        const user = await User.findById(val);
        next();
    }catch(err){
        res.status(400).send({status: 'fail', message: 'Invalid Id'});
    }
}

exports.checkBlogId = async (req, res, next, val) => {
    try{
        const user = await User.findById(req.params.userId);
        const blog = await Blog.findById(val);
        if(!blog || !user.blogs.includes(val)){
            res.status(400).send({status: 'fail', message: `The provided BlogId parameter, for user: ${req.params.userId},  cannot be found`});
        }else{
            next();
        }
    }catch(err){
        res.status(400).send({status: 'fail', message: err});
    }
}

exports.getAllBlogs = async (req, res) => {
    try{
        const user = await User.findById(req.params.userId);
        const blogs = await Blog.find({ _id: {$in : user.blogs}});

        res.status(200).send(
            {
                status: 'Successs',
                data:{
                    user: {
                        id: user.id, 
                        name: user.name,
                        blogs
                    }
                }
            }
        );
    }catch(err){
        res.status(400).send({status: 'fail', message: err});
    }
}

exports.createBlog = async (req, res) => {
    try{
        const newBlog = await Blog.create(req.body);
        await User.findByIdAndUpdate(req.params.userId, {$push : {blogs: newBlog.id}});
        res.status(202).send(
            {
                status: 'Success',
                data: {
                    user: req.params.userId,
                    blog: newBlog
                }
            }
        );
    }catch(err){
        res.status(404).send({
            status: 'fail', 
            errorMessage: err
        })
    }

}

exports.updateBlog = async (req, res) => {
    try{
        const blog = await Blog.findByIdAndUpdate(req.params.blogId, req.body, {
            new: true,
            runValidators: true});
        res.status(200).send(
            {
                status: 'Success',
                data: {
                    blog
                }
            }
        );
    }catch(err){
        res.status(400).send({status: 'fail', message: err});
    }
}

exports.deleteBlog = async (req, res) => {
    try{
        await User.findByIdAndUpdate(req.params.userId, {$pull : {blogs: req.params.blogId}});
        await Blog.findByIdAndDelete(req.params.blogId);
        res.status(204).send(
            {
                status: 'Success',
                data: {}
            }
        );
    }catch(err){
        res.status(400).send({status: 'fail', message: "Fail to delete, check UserId and BlogId"});
    }



}

exports.getBlog = async (req, res) => {
    try{
        const blog = await Blog.findById(req.params.blogId);
        res.status(200).send(
            {
                status: 'Success',
                data: {
                    user: req.params.userId,
                    blog
                }
            }
        );
    }catch(err){
        res.status(400).send({status: 'fail', message: err});
    }

};

exports.uploadImage = async (req, res) => {
    const image = req.files.upload;
    const fileName = image.name;
    const target = path.join(__dirname, `../public/images/${fileName}`);

    image.mv(target, error => {
        if(error) console.log('failed to upload the file');
    });

    const blog = await Blog.findByIdAndUpdate(req.params.blogId, {$push : {images: `/public/images/${fileName}`}}, {new: true});
    
    res.status(202).send(
        {
            status: 'Success',
            data: {
                blog
            }
        }
    );
    // UPLOADING FILE>
};
