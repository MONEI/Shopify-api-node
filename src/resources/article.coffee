class Article
  blog = null
  constructor: (opts) ->
    throw new Error 'missing blog id' unless opts?.blog?
    blog = opts.blog

module.exports = Article
