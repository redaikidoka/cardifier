export const environment = {
  APP_NAME: 'Cardifier',
  env_name: 'prod',
  production: true,
  // DATA_URL: 'http://localhost:5000/graphql', // LOCAL
  // DATA_URL: 'https://graphilestr-dot-webstr-dev.appspot.com/', //DEMO

  firebaseConfig: {
    apiKey: 'AIzaSyCkKKSqbGqlH77JpjVYiUNdDgtghTms6-g',
    authDomain: 'cardifier-test.firebaseapp.com',
    projectId: 'cardifier-test',
    storageBucket: 'cardifier-test.appspot.com',
    messagingSenderId: '910809679109',
    appId: '1:910809679109:web:6030dd582f02683c1e636c',
    measurementId: 'G-01Z6BD1L9X',
  },
  rollbarConfig: {
    accessToken: '7aca8c6a61cd471ba51f4479d0732f42',
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'development',
  },
};
