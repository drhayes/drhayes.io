import NextHead from 'next/head';

export default function Head({ title, description, canonical }) {
  let titleElem = <title>drhayes.io</title>;
  if (title) {
    titleElem = <title>{title} - drhayes.io</title>;
  }

  let descriptionElem = null;
  if (description) {
    descriptionElem = <meta name="description" content={description} />;
  }

  let canonicalElem = null;
  if (canonical) {
    canonicalElem = <link rel="canonical" href={`https://drhayes.io${canonical}`} />;
  }

  return (
    <NextHead>
      <meta charSet="utf-8" />
      {canonicalElem}
      {titleElem}
      {descriptionElem}
    </NextHead>
  );
}
