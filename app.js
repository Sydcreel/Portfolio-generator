//imports inquirer npm
const inquirer = require('inquirer');

//require statement allows app.js file to access fs module
//const fs = require('fs');

//imports page-template.js
//const generatePage = require('./src/page-template.js');

//holds user command-line arguments
const profileDataArgs = process.argv.slice(2);

//array index (0 index array, "name" starts at 0)
const [name, github] = profileDataArgs;

inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    }
  ])
  .then(answers => console.log(answers));


//arguments: 1-name of file being created(output file), 2-data being written onto file(HTML string), 3-callback function used for error handling
//fs.writeFile('index.html', generatePage(name, github), err => {
  //name property is ReferenceError. message property is "fs is not defined"
  //if (err) throw err;

  //console.log('Portfolio complete. Check out index.html to see the output.')
//});

//log inputs and confirm they match
//console.log(name, github);
//print function call
//console.log(generatePage(name, github));

//const printProfileData = profileDataArr => {
  // This...
  //for (let i = 0; i < profileDataArr.length; i += 1) {
    //console.log(profileDataArr[i]);
  //}

  //console.log('================');

  // Is the same as this...
  //profileDataArr.forEach(profileItem => console.log(profileItem));
//};

//printProfileData(profileDataArgs);

