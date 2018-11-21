import React from 'react';
import rehypeReact from "rehype-react"
import ArticlesList from './articlesList';

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    "articles-list": ArticlesList,
  }
}).Compiler;

const BlogContent = ({ htmlAst }) => (
  <div>{renderAst(htmlAst)}</div>
);

export default BlogContent;
