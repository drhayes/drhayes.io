import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../components/layout';
import styled from 'react-emotion';


const IndexPage = (data) => (
  <React.Fragment>
    <Layout data={data}>

      <h1>About</h1>

      <p>My name is David Hayes. I do stuff with computers. I live in Austin, TX.</p>

      <p>This site is made with some help from these technologies and media:</p>

      <ul>
        <li><a href="https://www.sublimetext.com/3">Sublime Text 3</a> is where the typing happens.</li>
        <li><a href="https://code.visualstudio.com/">Visual Studio Code</a> is also where the typing happens.</li>
        <li><a href="https://daringfireball.net/projects/markdown/">Markdown</a> has the content.</li>
        <li><a href="https://www.gatsbyjs.org/">Gatsby</a> generates the site.</li>
        <li><a href="https://github.com/">GitHub</a> hosts the code.</li>
        <li><a href="https://aws.amazon.com/">Amazon AWS</a> publishes the site via S3.</li>
        <li><a href="https://www.cloudflare.com/">Cloudflare</a> makes it fast.</li>
      </ul>

      <h2 id="contact-me">Contact Me</h2>

      <p>I can be found pretty much everywhere fine Internets are made as <code class="highlighter-rouge">drhayes</code> or some variation.</p>

      <p>In particular, you can email me at <a href="mailto:drhayes@gmail.com">drhayes@gmail.com</a> or chat me at <a href="https://t.me/drhayes">@drhayes on Telegram</a> and I might even answer.</p>

    </Layout>
    <Helmet>
      <title>About</title>
    </Helmet>
  </React.Fragment>
);

export default IndexPage;
