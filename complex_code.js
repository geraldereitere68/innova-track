/* 
   Filename: complex_code.js
   Content: Complex code example demonstrating advanced JavaScript concepts and techniques.
*/

// Array of objects representing students
const students = [
  { name: 'John', age: 20, gender: 'Male', grade: 'A' },
  { name: 'Emily', age: 22, gender: 'Female', grade: 'B' },
  { name: 'Robert', age: 21, gender: 'Male', grade: 'C' },
  { name: 'Sophia', age: 19, gender: 'Female', grade: 'A' },
  // ... more student objects
];

// Function to calculate the average age of male students
function calculateAverageAge(students) {
  const maleStudents = students.filter(student => student.gender === 'Male');
  const totalAge = maleStudents.reduce((sum, student) => sum + student.age, 0);
  
  return totalAge / maleStudents.length;
}

// Calculate and log the average age of male students
const averageAgeOfMales = calculateAverageAge(students);
console.log(`Average age of male students: ${averageAgeOfMales}`);

// Class representing a Car
class Car {
  constructor(brand, model, color) {
    this.brand = brand;
    this.model = model;
    this.color = color;
  }
  
  getFullDescription() {
    return `${this.color} ${this.brand} ${this.model}`;
  }
}

// Create car objects
const car1 = new Car('Ford', 'Mustang', 'Red');
const car2 = new Car('Tesla', 'Model S', 'Black');

// Log the full description of the cars
console.log(car1.getFullDescription());
console.log(car2.getFullDescription());

// Function to check if a number is prime
function isPrimeNumber(num) {
  if (num <= 1) return false;
  
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }
  
  return true;
}

// Check if a number is prime
const number = 17;
console.log(`Is ${number} a prime number? ${isPrimeNumber(number)}`);

// ...

// More code and complex logic goes here...

// ... (at least 200 lines of code)

// End of complex_code.js