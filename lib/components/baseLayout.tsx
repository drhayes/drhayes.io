import Head from './head';

export default function BaseLayout({ title = 'drhayes.io', description = '', children }) {
  return (
    <>
      <Head title={title} description={description} />
      {children}
    </>
  );
}
//   <!-- indieauth -->
//   <link rel="authorization_endpoint" href="https://indieauth.com/auth">
//   <link rel="token_endpoint" href="https://tokens.indieauth.com/token">
//   <!-- webmention -->
//   <link rel="webmention" href="https://webmention.io/drhayes.io/webmention">
//   <link rel="pingback" href="https://webmention.io/drhayes.io/xmlrpc">
//   <!-- misc -->
//   <link rel="pgpkey" href="/key.txt">
//   <meta name="theme-color" content="#ffffff">
//   <meta name="google-site-verification" content="{{ site.googleSiteVerification }}">
//   <link rel="canonical" href="{{ site.host }}{{ page.url }}">
//   {%- if description %}
//   <meta name="description" content="{{ description }}">
//   {% endif %}
//   <meta name="robots" content="index, follow" />
//   <link rel="alternate" type="application/rss+xml" href="{{ site.host }}/feed.xml">
// </head>
// <body class="font-mono text-sm sm:text-lg md:text-xl p-2 leading-normal">
//   <div class="mx-auto max-w-prose">
//     {% block content %}
//       {{ content | safe }}
//     {% endblock %}
//   </div>
// </body>
// </html>
