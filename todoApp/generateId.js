exports.generateId = function() {
    let letters = [];
    let numbers = [];
    for (let i = 0; i < 2; i++) {
        const randomLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 65 )
        letters.push(randomLetter)
    }
    for (let i = 0; i < 4; i++) {
        const randomNumbers = String.fromCharCode(Math.floor(Math.random() * 10) + 48 )
        numbers.push(randomNumbers)
    }
    const generatedId = `${letters.join('')}${numbers.join('')}`
    return generatedId
}