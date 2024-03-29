# Cardifier

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.8.

## Resources

- css framework is [TailwindsCss](https://tailwindcss.com/docs/grid-auto-rows)
- We are using [font awesome](https://fontawesome.com/v5.15/icons?d=gallery&p=2&q=home&s=solid&m=free)
- we are using [Firebase](https://console.firebase.com)

# Standard Angular Stuff:

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).



# GIT going

## Tagging
`git tag -a 1.7.2 -m "email and new date setting"`

`git push origin 1.7.2`

## Branching

1.  new branch

    `git checkout -b branchname`

2. work work work

    `git checkout parent-branch-name`

    `git merge branchname`

## Import common js modules

```
export function normalizeCommonJSImport<T>(
  importPromise: Promise<T>,
): Promise<T> {
  // CommonJS's `module.exports` is wrapped as `default` in ESModule.
  return importPromise.then((m: any) => (m.default || m) as T);
}
```
then 
```
import { normalizeCommonJSImport } from '../utils/normalizeCommonJSImport';

// import() returns a Promise
const importChart = normalizeCommonJSImport(
import(/* webpackChunkName: "chart" */ 'chart.js'),
);
```
