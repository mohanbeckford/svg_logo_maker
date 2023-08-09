const inquirer = require('inquirer');
const fs = require('fs');
const shapes = require('./lib/shapes');

const Circle = shapes.Circle;
const Triangle = shapes.Triangle;
const Square = shapes.Square;

async function validateColorInput(input) {
    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    
    if (input.match(hexColorRegex)) {
        return true;
    }

    // CHECKING FOR VALID COLOUR NAMES
    const colorKeywords = ['red', 'blue', 'green', 'yellow', 'orange', 'purple']; 
    if (colorKeywords.includes(input.toLowerCase())) {
        return true;
    }
    
    return 'Please enter a valid color keyword, color name, or hexadecimal color code (e.g., "red", "#FF0000").';
}


async function generateLogo() {
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
            <!-- Add shape SVG element -->
            ${selectedShape.generateSVG()}
            
            <!-- Add text SVG element -->
            <text x="150" y="120" text-anchor="middle" fill="${userInput.textColor}" font-size="70">
                ${userInput.text}
            </text>
        </svg>
    `;

    fs.writeFileSync('logo.svg', svgCode);
    console.log('Generated logo.svg');
}

generateLogo();
