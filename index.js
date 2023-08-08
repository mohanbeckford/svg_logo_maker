// const inquirer = require('inquirer');
const fs = require('fs');

// const shapes = require('./lib/shapes.test');

const shapes = await import('./lib/shapes');

const Circle = shapes.Circle;
const Triangle = shapes.Triangle;
const Square = shapes.Square;

async function validateColorInput(input) {

    // VALIDATE HEXADECIMAL COLOUR CODE
    // const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    
    if (input.match(hexColorRegex) || input.toLowerCase() === 'red') {
        return true;
    }
    
    return 'Please enter a valid color keyword or hexadecimal color code (e.g., "#FF0000" or "red").';
}

async function generateLogo() {
    const inquirer = await import('inquirer');
    const userInput = await inquirer.prompt([
        {
            type: 'input',
            name: 'text',
            message: 'Enter up to three characters for the logo text:',
            validate: input => input.length <= 3 || 'Text should be up to three characters.',
        },
        {
            type: 'input',
            name: 'textColor',
            message: 'Enter a color keyword or hexadecimal number for the text color:',
            validate: validateColorInput,
        },
        {
            type: 'list',
            name: 'shape',
            message: 'Choose a shape for the logo:',
            choices: ['Circle', 'Triangle', 'Square'],
        },
        {
            type: 'input',
            name: 'shapeColor',
            message: 'Enter a color keyword or hexadecimal number for the shape color:',
            validate: validateColorInput,
        },
        {
            type: 'number',
            name: 'shapeSize',
            message: 'Enter the size (side length or radius) for the shape:',
            validate: input => input > 0 || 'Size should be a positive number.',
        },
    ]);

    let selectedShape;
    switch (userInput.shape) {
        case 'Circle':
            selectedShape = new Circle(userInput.shapeSize, userInput.shapeColor);
            break;
        case 'Triangle':
            selectedShape = new Triangle(userInput.shapeSize, userInput.shapeColor);
            break;
        case 'Square':
            selectedShape = new Square(userInput.shapeSize, userInput.shapeColor);
            break;
        default:
            console.error('Invalid shape selected.');
            return;
    }

    const svgCode = `
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            <!-- Add text SVG element here using userInput.text and userInput.textColor -->
            <text x="150" y="100" text-anchor="middle" fill="${userInput.textColor}">
            ${userInput.text}
            </text>
            ${selectedShape.generateSVG()}
        </svg>
    `;

    fs.writeFileSync('logo.svg', svgCode);
    console.log('Generated logo.svg');
}

generateLogo();
