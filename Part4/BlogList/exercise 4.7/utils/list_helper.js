const _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (max, item) => {
        return (max.likes > item.likes) ? max : item
    }
    
    return blogs.reduce(reducer, 0)
}

const mostBlogs = (blogs) => {
    const blogCount = _.countBy(blogs, 'author')
    const max = _.maxBy(_.keys(blogCount), (o) => { return blogCount[o] })
    return { author: max, 
        blogs: blogCount[max] }
}

const mostLikes = (blogs) => {
    const blogCount = _.groupBy(blogs, 'author')
    const max = _.maxBy(_.keys(blogCount), (o) => {
        return _.sumBy(blogCount[o], 'likes')
    })
    return { author: max,
        likes: _.sumBy(blogCount[max], 'likes') }
}

  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  };
  