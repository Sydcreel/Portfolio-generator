//imports inquirer npm
const inquirer = require('inquirer');

//imports page-template.js
const generatePage = require('./src/page-template');

const {writeFile, copyFile} = require('./src')
//holds user command-line arguments
const profileDataArgs = process.argv.slice(2);

//array index (0 index array, "name" starts at 0)
const [name, github] = profileDataArgs;

//Profile questions
const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'Name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name.');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'Github',
      message: 'Enter your Github username (Required)',
      validate: githubInput => {
        if (githubInput) {
          return true;
        } else {
          console.log('Please enter your Github username.');
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to enter information about yourself for an "About" section?',
      default: true
    },
    {
      type: 'input',
      name: 'About',
      message: 'Provide some information about yourself',
      when: ({confirmAbout}) => confirmAbout
  }
  ]);
};

//Project questions
const promptProject = portfolioData => {
  console.log(`
  =================
  Add a New Project
  =================
    `);
  //if no Projects array property, create one
  if (!portfolioData.projects) {
    //add Projects array and initialize function to collect data
    portfolioData.projects = [];
  }
  return inquirer.prompt([
    {
      type: 'input',
      name: 'Name',
      message: 'What is the name of your project? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter the name of your project.');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'Description',
      message: 'Provide a description of the project (Required)',
      validate: descriptionInput => {
        if (descriptionInput) {
          return true;
        } else {
          console.log('Please enter a project description.');
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'Languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'Link',
      message: 'Enter the Github link to your project (Required)',
      validate: linkInput => {
        if (linkInput) {
          return true;
          } else {
            console.log('Please enter a link to your Github.');
            return false;
          }
        }
    },
    {
      type: 'confirm',
      name: 'Feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      deafult: false
    }
  ])
  //projectData: answer object  confirmAddProject: property
  //if user wishes to add more projects, condition = true and calls promptProject(portfolioData) function
  .then(projectData => {
    portfolioData.projects.push(projectData);
    //condition that will call promptProject(portfolioData) function when confirmAddProject = true
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData);
      //if user decides to not add more projects, condition = false
    } else {
      return portfolioData;
    }
  });
};
//display input in order: Profile questions, Project questions
promptUser()
  .then(promptProject)
  .then(projectData => {
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(portfolioDataHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });


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

