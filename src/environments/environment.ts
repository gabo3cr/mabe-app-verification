// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  loginUrl: 'https://mabe.neo-branding.com/',
  apiUrl: 'http://10.1.80.203:443', //'http://181.167.206.232:82' // http://181.167.206.232:8081
  apiUrlSQL: 'http://10.1.80.203:5000',
  username: 'app', 
  password: 'app.2022'
  //username: 'admin', 
  //password: 'zkteco1234'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
