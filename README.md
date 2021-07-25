# Kraken Node

[![Build Status](https://travis-ci.com/restuwahyu13/graphql-typedefs-loader.svg?branch=main)](https://travis-ci.com/restuwahyu13/graphql-typedefs-loader) [![Coverage Status](https://coveralls.io/repos/github/restuwahyu13/graphql-typedefs-loader/badge.svg?branch=main)](https://coveralls.io/github/restuwahyu13/graphql-typedefs-loader?branch=main) [![codebeat badge](https://codebeat.co/badges/857cbfb1-53a4-41e5-a9a0-38152987a7d4)](https://codebeat.co/projects/github-com-restuwahyu13-graphql-typedefs-loader-main) [![CodeFactor](https://www.codefactor.io/repository/github/restuwahyu13/graphql-typedefs-loader/badge)](https://www.codefactor.io/repository/github/restuwahyu13/graphql-typedefs-loader) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/d368f0998e7641c4a85a796e7dae3f6a)](https://www.codacy.com/gh/restuwahyu13/graphql-typedefs-loader/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=restuwahyu13/graphql-typedefs-loader&amp;utm_campaign=Badge_Grade) ![node-current](https://img.shields.io/node/v/gtl-node?style=flat-square) ![npm](https://img.shields.io/npm/dm/gtl-node) ![npm bundle size](https://img.shields.io/bundlephobia/min/gtl-node?style=flat-square) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/gtl-node?style=flat-square) ![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/restuwahyu13/graphql-typedefs-loader)

**kinode** is dependency injection to register module to global access, you can load each given module from **kraken.config.json**, without the need to load module using `require` or `import` again in every file, then module can be accessed as a global with very easy and then only register modules to kraken config, which you often the most used in each every file, example module like `axios`, `lodash`, `moment` etc.

- [Installation](#installation)
- [Config](#config)
- [Example Usage](#example-usage)
- [Testing](#testing)
- [Bugs](#bugs)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
$ npm install kinode -S or yarn add kinode -S
```

## Config

- #### Kraken config property

  + **name** for to calling module in each every file and default value is to undefined
  + **module** for to register module to global access and default value is to undefined
  + **inject** for to disabled module to global access, if value is set to false and default value is to true

- #### Example kraken.config.json

  ```json
  {
    "packages": [
      {
        "name": "$axios",
        "module": "axios"
      },
      {
        "name": "$_",
        "module": "lodash"
      },
      {
        "name": "$moment",
        "module": "moment",
        "inject": false
      }
    ]
  }
  ```

## Example Usage

+ ##### Example Usage Config Outside Directory

  - ##### Example Usage Using CommonJs With JavaScript

    ```javascript
     require('kinode').config()

     $axios.get('https://jsonplaceholder.typicode.com/users')
     .then(res => console.log(res.data))
     .catch(err => console.log(err.response.data))
    ```
    ```javascript
     require('kinode/config')

     $axios.get('https://jsonplaceholder.typicode.com/users')
     .then(res => console.log(res.data))
     .catch(err => console.log(err.response.data))
    ```

  - ##### Example Usage Using Esm With JavaScript

    ```javascript
     import { config } from 'kinode'
     config()

     $axios.get('https://jsonplaceholder.typicode.com/users')
     .then(res => console.log(res.data))
     .catch(err => console.log(err.response.data))
    ```
    ```javascript
     import 'kinode/config'

     $axios.get('https://jsonplaceholder.typicode.com/users')
     .then(res => console.log(res.data))
     .catch(err => console.log(err.response.data))
    ```
  - ##### Example Usage With Typescript

    ```typescript
     import { config } from 'kinode'
     config()

     global.$axios.get('https://jsonplaceholder.typicode.com/users')
     .then(res => console.log(res.data))
     .catch(err => console.log(err.response.data))
    ```
    ```typescript
     import 'kinode/config'

     global.$axios.get('https://jsonplaceholder.typicode.com/users')
     .then(res => console.log(res.data))
     .catch(err => console.log(err.response.data))
    ```

+ ##### Example Usage Config Inside Directory

  - ##### Example Usage Using CommonJs With JavaScript

    ```javascript
     require('kinode').config({ directory: 'config' })

     $axios.get('https://jsonplaceholder.typicode.com/users')
     .then(res => console.log(res.data))
     .catch(err => console.log(err.response.data))
    ```

  - ##### Example Usage Using Esm With JavaScript

    ```javascript
     import { config } from 'kinode'
     config({ directory: 'config' })

     $axios.get('https://jsonplaceholder.typicode.com/users')
     .then(res => console.log(res.data))
     .catch(err => console.log(err.response.data))
    ```
  - ##### Example Usage With Typescript

    ```typescript
     import { config } from 'kinode'
     config({ directory: 'config' })

     global.$axios.get('https://jsonplaceholder.typicode.com/users')
     .then(res => console.log(res.data))
     .catch(err => console.log(err.response.data))
    ```

## Testing

- Testing Via Local

  ```sh
  npm test or make test
  ```

- Testing Via Local And Build

  ```sh
  make build
  ```

- Testing Via Docker

  ```sh
  docker build -t kraken-node or make dkb tag=kraken-node
  ```

## Bugs

For information on bugs related to package libraries, please visit [here](https://github.com/restuwahyu13/kraken-node/issues)

## Contributing

Want to make **kraken-node** more perfect ? Let's contribute and follow the [contribution guide.](https://github.com/restuwahyu13/kraken-node/blob/main/CONTRIBUTING.md)

## License

- [MIT License](https://github.com/restuwahyu13/kraken-node/blob/main/LICENSE.md)

<p align="right" style="padding: 5px; border-radius: 100%; background-color: red; font-size: 2rem;">
  <b><a href="#kraken-node">BACK TO TOP</a></b>
</p>
