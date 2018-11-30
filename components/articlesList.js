import React from 'react';
import getConfig from 'next/config';
import Link from 'next/link'

const { publicRuntimeConfig: { games } } = getConfig();

const ArticlesList = ({ game }) => (
  <ol>
    {games[game].articles.map(article => (
      <li key={article.title}>
        <Link href={article.slug}>
          <a>{article.title}</a>
        </Link>
      </li>
    ))}
  </ol>
);

export default ArticlesList;
