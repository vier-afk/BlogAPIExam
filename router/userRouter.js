const express = require('express');
const {getAllBlogs, createBlog, updateBlog, deleteBlog, getBlog, uploadImage, checkUserId, checkBlogId} = require('../handlers/userHandler');

const router = express.Router();

router.param('userId', checkUserId);

router.route('/:userId')
      .get(getAllBlogs) //- returns all blog posts for a certain user
      .post(createBlog) //- create a new Blog post for a certian user


router.param('blogId', checkBlogId);
router.route('/:userId/:blogId')
      .patch(updateBlog) // - update a specific blog for a user
      .delete(deleteBlog) // - delete a specific blog for a user
      .get(getBlog)
      .post(uploadImage); // - get a specific blog for a user


module.exports = router;