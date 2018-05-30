import React from 'react'
import Link from 'gatsby-link';

const messages = [
  `You just hit a route that doesn't exist... the sadness.`,
  `You look a little lost. Sorry about that.`,
  `Oh noes! A 404!`
];

const NotFoundPage = () => (
  <div>
    <h1>NOT FOUND</h1>
    <p>{messages[Math.floor(Math.random() * messages.length)]}</p>
    <Link to="/">Back to safety &raquo; drhayes.io</Link>
  </div>
)

export default NotFoundPage
