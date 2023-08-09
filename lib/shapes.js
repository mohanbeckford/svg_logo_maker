
//CIRCLE

class Circle {
    constructor(radius, color) {
        if (radius <= 0) {
            throw new Error('Circle radius must be a positive number.');
        }
        this.radius = radius;
        this.color = color;
    }

    generateSVG() {
        return `<circle cx="150" cy="100" r="${this.radius}" fill="${this.color}" />`;
    }
}

class Triangle {
    constructor(sideLength, color) {
        if (sideLength <= 0) {
            throw new Error('Triangle side length must be a positive number.');
        }
        this.sideLength = sideLength;
        this.color = color;
    }

    generateSVG() {
        const halfSide = this.sideLength / 2;
        const height = (Math.sqrt(3) / 2) * this.sideLength;
        
        return `
            <svg width="300" height="${height + 20}" xmlns="http://www.w3.org/2000/svg">
                <polygon points="150,${100 - halfSide} ${150 - halfSide},${100 + halfSide} ${150 + halfSide},${100 + halfSide}" fill="${this.color}" />
                <text x="150" y="${height + 10}" text-anchor="middle" fill="black">
                    ${this.name}
                </text>
            </svg>
        `;
    }
    

    // generateSVG() {
    //     const halfSide = this.sideLength / 2;
    //     const height = (Math.sqrt(3) / 2) * this.sideLength;
    //     return `
    //         <polygon points="150,${100 - halfSide} ${150 - halfSide},${100 + halfSide} ${150 + halfSide},${100 + halfSide}" fill="${this.color}" />
    //     `;
    // }
}

//TRIANGLE

class Square {
    constructor(sideLength, color) {
        if (sideLength <= 0) {
            throw new Error('Square side length must be a positive number.');
        }
        this.sideLength = sideLength;
        this.color = color;
    }

    generateSVG() {
        const halfSide = this.sideLength / 2;
        return `
            <rect x="${150 - halfSide}" y="${100 - halfSide}" width="${this.sideLength}" height="${this.sideLength}" fill="${this.color}" />
        `;
    }
}

module.exports = { Circle, Triangle, Square };
