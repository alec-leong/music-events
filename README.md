<!-- https://docs.microsoft.com/en-us/azure/devops/project/wiki/markdown-guidance?view=azure-devops -->

# react-express-starter

## About

### Main Development Dependencies

| DevDependency | Version |
| ------------- | :-----: |
| @babel        | 7       |
| jest          | 26      |
| react         | 16      |
| webpack       | 4       |

### Initial File Directory

```text
  .
  ├── client
  │   ├── dist
  │   |   └── index.html
  │   |
  │   └── src
  │       ├── components
  │       |   └── App.jsx
  │       ├── css
  │       |   └── App.style.jsx
  │       └── index.jsx
  │
  ├── db
  │   ├── config.js
  │   └── index.js
  |
  ├── server
  │   └── config.js
  │   └── index.js
  │
  ├── tests
  │   └── App.test.jsx
  |
  ├── .eslintignore
  ├── .gitignore
  ├── .eslintrc.js
  ├── babel.config.js
  ├── nightwatch.js
  ├── nightwatch.conf.js
  ├── webpack.config.js
  ├── package.json
  └── README.md
```

---

## Getting Started

### 1. Install dependencies and development dependencies

```sh
  $ npm install
```

### &emsp;&emsp;_node_modules_ directory is now added

```
    .
    └── node_modules
```

### 2. Start webpack

```sh
  $ npm run react-dev
```

#### &emsp; &emsp;_bundle.js_ is now compiled

```
    .
    └── client
        └── dist
            ├── index.html
            └── bundle.js
```

### 3. Open a new terminal

### 4. Start Express.js server

```sh
  $ npm run server-dev
```

---

## Test App.jsx

```sh
  $ npm run react-test
```

### &emsp;&emsp;_App.test.jsx.snap_ is now created; output of test results

```
    .
    └── tests
        └── __snapshots__
            └── App.test.jsx.snap
```

---

## Final File Directory

```
  .
  ├── client
  │   ├── dist
  │   |   ├── index.html
  │   |   └── bundle.js
  │   └── src
  │       ├── components
  │       |   └── App.jsx
  │       ├── css
  │       |   └── App.style.jsx
  │       └── index.jsx
  │
  ├── db
  │   ├── config.js
  │   └── index.js
  |
  ├── node_modules
  |
  ├── server
  │   └── config.js
  │   └── index.js
  │
  ├── tests
  │   ├── __snapshots__
  │   |   └── App.test.jsx.snap
  │   └── App.test.jsx
  |
  ├── .eslintignore
  ├── .gitignore
  ├── .eslintrc.js
  ├── babel.config.js
  ├── nightwatch.js
  ├── nightwatch.conf.js
  ├── webpack.config.js
  ├── package.json
  └── README.md
```
