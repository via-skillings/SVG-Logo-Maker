import inquirer from 'inquirer';
import { writeFile } from 'fs/promises';
import { Triangle, Square, Circle } from './lib/shapes.mjs';

function writeToFile(fileName, answers) {
    let svgString = '';
    svgString = '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
    svgString += '<g>';

    if (answers.shape === 'Triangle') {
        svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>`;
    } else if (answers.shape === 'Square') {
        svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;
    } else {
        svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
    }

    svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
    svgString += '</g>';
    svgString += '</svg>';

    writeFile(fileName, svgString)
        .then(() => console.log('Generated logo.svg'))
        .catch(err => console.error('Error generating logo:', err));
}

function promptUser() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'text',
            message: 'Enter text for the logo (up to 3 characters):',
            validate: input => input.length <= 3 || 'Text must be 3 characters or less',
        },
        {
            type: 'input',
            name: 'textColor',
            message: 'Enter the text color (keyword or hexadecimal):',
        },
        {
            type: 'list',
            name: 'shape',
            message: 'Choose a shape for the logo:',
            choices: ['Triangle', 'Square', 'Circle'],
        },
        {
            type: 'input',
            name: 'shapeBackgroundColor',
            message: 'Enter the shape background color (keyword or hexadecimal):',
        },
    ])
    .then(answers => {
        writeToFile('logo.svg', answers);
    })
    .catch(error => {
        console.error('Error generating logo:', error);
    });
}

promptUser();
