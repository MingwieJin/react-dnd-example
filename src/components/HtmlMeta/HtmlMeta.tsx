/* eslint-disable max-len */
import React from 'react';
import Head from 'next/head';
import getConfig from 'next/config';

const { STATIC_ASSETS_URL } = getConfig().publicRuntimeConfig;

interface IProps {
  title: React.ReactNode;
  disableSiteName?: boolean;
  //
  className?: string;
  style?: React.CSSProperties;
  alwaysDarkMode?: boolean;
}

export const HtmlMeta: React.FC<IProps> = props => (
  <Head>
    <title>{props.title || ''}</title>
    <link rel="icon" href={`${STATIC_ASSETS_URL}/favicons/logo.ico`} type="image/x-icon" />
  </Head>
);
