const { Circle, Triangle, Square } = require('../lib/shapes');


describe('Shape Classes', () => {
    describe('Circle', () => {
        test('generates correct SVG code', () => {
            const circle = new Circle(50, '#FF0000');
            const expectedSVG = '<circle cx="150" cy="100" r="50" fill="#FF0000" />';
            expect(circle.generateSVG()).toBe(expectedSVG);
        });
    });

    describe('Triangle', () => {
        test('generates correct SVG code', () => {
            const triangle = new Triangle(100, 'blue');
            const expectedSVG = '<polygon points="150,50 100,150 200,150" fill="blue" />';
            expect(triangle.generateSVG()).toBe(expectedSVG);
        });
    });

    describe('Square', () => {
        test('generates correct SVG code', () => {
            const square = new Square(80, 'green');
            const expectedSVG = '<rect x="110" y="60" width="80" height="80" fill="green" />';
            const generatedSVG = square.generateSVG();
            expect(generatedSVG).toBe(expectedSVG);
        });
    });
});
