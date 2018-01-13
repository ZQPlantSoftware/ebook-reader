# E-Book Reader

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/facebook/react/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request)

This is a nice e-book reader base on `epub.js` `React` support both PC and mobile.

- [DEMO for PC](http://ebook.tefact.com/?r={bid:5,probation:100,uid:1})
- [DEMO for mobile](http://ebook.tefact.com/mobile.html?r={bid:5,probation:100,uid:1})

The whole reader system with 3 part, React front end application, JAVA backend services with mysql database and a python search engine.

1. [Reader Frontend Page](https://github.com/ZQPlantSoftware/epub-reader) React base front end application

2. [Java Reader Backend Services](https://github.com/ZQPlantSoftware/epub-reader-services) We use Spring Boot and MySQL

3. [Reader Search Engine](https://github.com/ZQPlantSoftware/ebook-reader-search-engine) Python whoosh

** It's a e-book reader only for EPUB now, we may support other format of ebook later **

## Front End Part

To install and start

```
$ npm install
$ npm start
```

Then go to http://localhost:8989?r={bid:5,probation:100,uid:1}

At this point, we need start [backend server](https://github.com/ZQPlantSoftware/ebook-reader-services) which run in port 9898.

#### Init Parameters

- bid: book id in database.
- probation: How long user can read this book(For user which not pay).
- uid: User's union id.

And this json parameter `r` can be encryption by `DES` ([Data Encryption Standard](https://en.wikipedia.org/wiki/Data_Encryption_Standard)) When it's encrypted, it will looks like:

```
http://localhost:8989?r=2a6d47860742100b969b22a33273f91a38bcfa0ed8370d6d3a087fa090b88ae0
```

To build production model:

```
npm run build
```

## License

MIT
