/* eslint-disable react/require-default-props */
import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PAGE_SETTING from '@/utils/site-configs';

type MegaHeadProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  name?: string;
  author?: string;
};

const MegaHead = (props: MegaHeadProps) => {
  const { asPath } = useRouter();
  let { title, description, image, url, name, author } = props;
  if (!title) title = PAGE_SETTING.title;
  if (!description) description = PAGE_SETTING.description;
  if (!image) image = PAGE_SETTING.image;
  if (!url) url = `${PAGE_SETTING.url}${asPath}`;
  if (!name) name = PAGE_SETTING.name;
  if (!author) author = PAGE_SETTING.author;

  return (
    <Head>
      <meta
        content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no"
        name="viewport"
      />
      <title>{title}</title>
      <link href={url} rel="preconnect" />
      <link href={url} rel="canonical" />
      <meta content={description} name="description" />
      <meta content={title} property="og:title" />
      <meta content={name} property="og:site_name" />
      <meta content={url} property="og:url" />
      <meta content={description} property="og:description" />
      <meta content="article" property="og:type" />
      <meta content={image} property="og:image" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={author} name="twitter:site" />
      <meta content={title} name="twitter:title" />
      <meta content={description} name="twitter:description" />
      <meta content={image} name="twitter:image" />
      {process?.env?.NEXT_PUBLIC_IS_PRODUCTION === '1' ? (
        <>
          <meta content="index, follow, archive" name="robots" />
          <meta content={author} name="author" />
          <meta content={author} name="copyright" />
        </>
      ) : (
        <>
          <meta content="noindex, nofollow, noarchive" name="robots" />
          <meta content="noindex" name="googlebot" />
        </>
      )}
    </Head>
  );
};

export default MegaHead;
