// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  APP_NAME: 'Cardifier',
  env_name: 'base',
  production: false,
  DATA_URL: 'http://localhost:5000/graphql', // LOCAL
  // DATA_URL: 'https://graphilestr-dot-webstr-dev.appspot.com/', //DEMO

  firebaseConfig: {
    apiKey: 'AIzaSyCkKKSqbGqlH77JpjVYiUNdDgtghTms6-g',
    authDomain: 'cardifier-test.firebaseapp.com',
    projectId: 'cardifier-test',
    storageBucket: 'cardifier-test.appspot.com',
    messagingSenderId: '910809679109',
    appId: '1:910809679109:web:6030dd582f02683c1e636c',
    measurementId: 'G-01Z6BD1L9X'
  },
  rollbarConfig: {
    accessToken: '7aca8c6a61cd471ba51f4479d0732f42',
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'development'
  }
};

import 'zone.js/dist/zone-error';  // Included with Angular CLI.

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
