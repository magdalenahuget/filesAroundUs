// All three of fs.readFile(), fs.readFileSync() and fsPromises.readFile() read the full content of the file in memory before returning the data.


// Read text from a text file
console.log("-------------------Read text from a text file-----------------------------------");

import * as fs from 'node:fs';
// const fs = require('fs');

fs.readFile('first.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
});

// let data = fs.readFileSync('first.txt', 'utf8');
// console.log(data);

// // Read data from json file
console.log("-------------------Read data from json file-----------------------------------");

fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const fruits = JSON.parse(data);
    console.log(fruits[0].name);
});

// let jsonData = fs.readFileSync('data.json', 'utf8');
// let jsonDAtaParsed = JSON.parse(jsonData)
// console.log(jsonDAtaParsed[0].name);

// Reorganise callback function 
console.log("-------------------Reorganise callback function-----------------------------------");

let dataRead = (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const fruits = JSON.parse(data);
    console.log(fruits[0].name);
}
fs.readFile('data.json', 'utf8', dataRead);

// Use data from json file
console.log("-------------------Use data from json file-----------------------------------");

let averageNutritions = (fruitsProvidedFromFile) => {
    let toRet = {
        carbohydrates: 0,
        protein: 0,
        fat: 0,
        calories: 0,
        sugar: 0
    }

    for (const item of fruitsProvidedFromFile) {
        toRet.carbohydrates += item.nutritions.carbohydrates;
        toRet.protein += item.nutritions.protein;
        toRet.fat += item.nutritions.fat;
        toRet.calories += item.nutritions.calories;
        toRet.sugar += item.nutritions.sugar;
    }


    toRet.carbohydrates += toRet.carbohydrates / fruitsProvidedFromFile.length;
    toRet.protein += toRet.protein / fruitsProvidedFromFile.length;
    toRet.fat += toRet.fat / fruitsProvidedFromFile.length;
    toRet.calories += toRet.calories / fruitsProvidedFromFile.length;
    toRet.sugar += toRet.sugar / fruitsProvidedFromFile.length;

    return toRet;
}

let dataRead2 = (errorIfProblemWithFile, file) => {
    if (errorIfProblemWithFile) {
        console.error(errorIfProblemWithFile);
        return;
    }
    const fruits = JSON.parse(file);
    console.log(averageNutritions(fruits));
}

fs.readFile('data.json', 'utf8', dataRead2);

// Arrange by id
console.log("-------------------Arrange by id-----------------------------------");

let orderById = (orderedFruits) => {
    return orderedFruits.sort((a, b) => a.id - b.id);
}

let dataRead3 = (error, file) => {
    if (error) {
        console.error(error);
        return;
    }
    const fruits = JSON.parse(file);
    console.log(orderById(fruits));
}

fs.readFile('data.json', 'utf8', dataRead3);


// DON'T MODIFY THE CODE BELOW THIS LINE

let toExport;

try {
    toExport = [
        { name: "averageNutritions", content: averageNutritions, type: "function" },
        { name: "dataRead", content: dataRead, type: "function" }
    ]

} catch (error) {
    toExport = { error: error.message }
}

export { toExport };