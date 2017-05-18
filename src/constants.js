export const DEV = process.env.NODE_ENV !== 'production';

export const Cache = {
  KEY: DEV ? 'PROJECT_ANT_DEV' : 'PROJECT_ANT_PROD', // rename PROJECT_ANT for your project name
};
