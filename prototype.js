var express = require('express'),
	app = express(),
	bodyParser  = require('body-parser'),
	multer = require('multer'),
	upload = multer({dest: 'uploads/'}),
	fs = require('fs'),
	PNF = require('google-libphonenumber'),
	phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance(),
	mammoth = require("mammoth"),
	pdf_extract = require('pdf-extract');	

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.listen(3000, ()=>{
	console.log('Listening on PORT 3000');

});

app.get('/', (request, response) => {
	let text;
	mammoth.extractRawText({path: "w1.docx"})
    .then(function(result){
        text = result.value; // The raw text
		var messages = result.messages;
		//console.log(text);
		response.status(200).send('Everything seems to be working! ' + text);
    })
    .done();
});


app.get('/api/phonenumbers/parse/text/:string', function(request, response) {
	var stringArr = [];
	stringArr.push(request.params.string);
	let newnumber = stringArr;
		for(var i =0;i<newnumber.length;i++){
			var a = newnumber[i].split(',');
			console.log(a);
			var finalOutput = returnNumbers(a, response);
			response.send(finalOutput);
		}
	
});

//https://www.npmjs.com/package/multer
//https://www.npmjs.com/package/pdf-text
//reads if type pdf then outputs to the screen
app.post('/api/phonenumbers/parse/file', upload.single('file'), function(require, response){
	
	if(require.file.originalname.match(/.*.pdf/)){
		var pString = require.file.path;
		pdfText(pString, function(err,data){
			var string = data.toString('ascii'),
			text = new Buffer(string, 'base64').toString('ascii'),
			stringArr = text.split('\n'),
			finalOutput = returnNumbers(stringArr, response);
			response.send(finalOutput);			
			console.log(data); //print text     
	  	});
	}
	else{
	var buffer = fs.readFileSync(require.file.path),
		string = buffer.toString('ascii'),
		text = new Buffer(string, 'base64').toString('ascii'),
		stringArr = text.split('\n'),
		finalOutput = returnNumbers(stringArr, response);
		response.send(finalOutput);
	}
});

//uses npm package
//https://www.npmjs.com/package/google-libphonenumber
//read the input and return just the phone numbers.
function returnNumbers(stringArr, response){
	var numbers,
		array = [];
		
	try{ //use try catch here to catch exceptions where no string is passed or even a string with no numbers is passed.
		for (var i = 0; i < stringArr.length; i++){
			numbers = phoneUtil.parse(stringArr[i], 'CA');
			array.push(phoneUtil.format(numbers, PNF.INTERNATIONAL));				
		}
	}
	catch(e){
		response.status(400);
	}

	//https://www.codementor.io/tips/8243973127/how-to-remove-duplicates-within-a-javascript-array-using-es6-in-just-one-line	
	var rmDuplicates = Array.from(new Set(array));

	return rmDuplicates;
}

/*
https://stackoverflow.com/questions/33986863/mocha-api-testing-getting-typeerror-app-address-is-not-a-function
*/
module.exports = app;