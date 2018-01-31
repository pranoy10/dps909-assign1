# dps909-assign1
This an app that uses Google's libphonenumber library which is used for parsing, formatting, and validating international phone numbers.

# How-To
* Download and install Node.js (https://nodejs.org/en/)
* Clone or download this repo.
* Open command-line interface and ensure that the downloaded repo is the current working directory.
* Then enter the following commands in the order its written. (This should start up the server.)
``` bash
# install dependencies
npm install

npm run proto
```
* Server will be now accessible at localhost:3000/

# REQUESTS
* You may use Postman (https://www.getpostman.com/) for checking the following requests.

## GET
* localhost:3000/api/phonenumbers/parse/text/{...string...}  

## POST
* localhost:3000/api/phonenumbers/parse/file
* For the file, ensure its base64 encoded.

# FRAMEWORK TESTING
* Ensure the server is not running.
* If it is running you can turn it off by "Ctrl + C", and then "Y" when asked to do so.
* Then enter the following commands in the order its written. (This would start up the testing.)
``` bash
npm run test
```
* This will carry out the testing and give you results on whether its working or not.