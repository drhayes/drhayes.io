import NextHead from 'next/head';

export default function Head({ title, description, canonical }) {
  let titleElem = (
    <title>notes.drhayes.io</title>
  );
  if (title) {
    titleElem = (
      <title>{title} - notes.drhayes.io</title>
    );
  }

  let descriptionElem = (
    <meta name="description" content="Notes from the digital garden of drhayes" />
  );
  if (description) {
    descriptionElem = (
      <meta name="description" content={description} />
    );
  }

  let canonicalElem = null;
  if (canonical) {
    canonicalElem = (
      <link rel="canonical" href={`https://notes.drhayes.io${canonical}`} />
    );
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
