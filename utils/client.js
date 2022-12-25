import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'jdijgvr3',
  dataset: 'production',
  apiVersion: '2022-12-20',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});