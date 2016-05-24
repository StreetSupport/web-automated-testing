# Website automated testing

## Requirements
- CasperJS (minimum v1.1)
- PhantomJS

Installation on OS X:
```
brew install casperjs --devel
```

## Usage
```
casperjs test .
```

## Directory structure
Each subdirectory or subdomain on the site matches a subdirectory in the tests. Each page is a .js file.

Examples:
- The tests for https://streetsupport.net/give-help/give-items is in /give-help/give-items.js
- The tests for https://streetsupport.net/give-help is in /give-help.js
- The tests for https://charter.streetsupport.net/ is in /charter.js
- The tests for https://charter.streetsupport.net/pledge-your-support/ is in /charter/pledge-your-support.js

