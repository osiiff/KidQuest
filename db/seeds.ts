import "dotenv/config";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
    await prisma.task.deleteMany();
    await prisma.subject.deleteMany();
    const math = await prisma.subject.create({
        data: {
            name: 'Math',
            slug: 'math',
            description: 'Learn numbers, add, subtract, and more.',
            image: '/math.png',
            tasks: {
                create: [
                    {
                        title: 'What comes next?',
                        slug: 'what-comes-next',
                        description: 'Find the next number in a simple number pattern.',
                        image: '/tasks/math/m-task1.png',
                        difficulty: 'beginner',
                        ageGroup: 'Early Primary',
                        question: 'What comes next? 2, 4, 6, ?',
                        options: ["7", "8", "9", "10"],
                        correctAnswer: "8"
                    },
                    {
                        title: 'Find the odd one',
                        slug: 'find-the-odd-one',
                        description: 'Look at the numbers and find the one that does not belong.',
                        image: '/tasks/math/m-task2.png',
                        difficulty: 'medium',
                        ageGroup: 'Early Primary',
                        question: 'Which number is different?',
                        options: ["2", "4", "6", "7"],
                        correctAnswer: "7"
                    },
                    {
                        title: 'Simple adding',
                        slug: 'simple-adding',
                        description: 'Solve an easy addition problem with small numbers.',
                        image: '/tasks/math/m-task3.png',
                        difficulty: 'medium',
                        ageGroup: 'Kindergarted',
                        question: 'What is 3 + 2?',
                        options: ["5", "4", "6", "7"],
                        correctAnswer: "5"
                    },
                    {
                        title: 'Number order',
                        slug: 'number-order',
                        description: 'Practice putting numbers in the correct order.',
                        image: '/tasks/math/m-task4.png',
                        difficulty: 'medium',
                        ageGroup: 'Kindergarten',
                        question: 'Which number comes after 9?',
                        options: ["8", "10", "11", "7"],
                        correctAnswer: "10"
                    },
                    {
                        title: 'Bigger or smaller?',
                        slug: 'bigger-or-smaller',
                        description: 'Compare two numbers and choose the bigger one.',
                        image: '/tasks/math/m-task5.png',
                        difficulty: 'advanced',
                        ageGroup: 'Primary School',
                        question: 'Which number is bigger?',
                        options: ["49", "90", "89", "77"],
                        correctAnswer: "90"
                    },
                    {
                        title: 'Simple subtraction',
                        slug: 'simple-substraction',
                        description: 'Practice taking away numbers with an easy subtraction task.',
                        image: '/tasks/math/m-task6.png',
                        difficulty: 'advanced',
                        ageGroup: 'Primary School',
                        question: 'What is 76 - 39',
                        options: ["39", "40", "36", "37"],
                        correctAnswer: "37"
                    },

                ]
            }
        }
    })

    const english = await prisma.subject.create({
        data: {
            name: 'English',
            slug: 'english',
            description: 'Build vocabulary and practice speaking.',
            image: '/english.png',
            tasks: {
                create: [
                    {
                        title: 'Choose the letter',
                        slug: 'choose-the-letter',
                        description: 'Practice recognizing capital letters.',
                        image: '/tasks/english/e-task1.png',
                        difficulty: 'beginner',
                        ageGroup: 'Kindergarden',
                        question: 'Which letter comes after H?',
                        options: ["J", "L", "I", "G"],
                        correctAnswer: "I"
                    },
                    {
                        title: 'Choose the color',
                        slug: 'choose-the-color',
                        description: 'Learn basic colors in English.',
                        image: '/tasks/english/e-task2.png',
                        difficulty: 'medium',
                        ageGroup: 'Early Primary',
                        question: 'What color is the sky?',
                        options: ["green", "blue", "white", "red"],
                        correctAnswer: "blue"
                    },
                    {
                        title: 'Animal sounds',
                        slug: 'animal-sounds',
                        description: 'Match animals with simple English words.',
                        image: '/tasks/english/e-task3.png',
                        difficulty: 'medium',
                        ageGroup: 'Early Primary',
                        question: 'Which animal says “meow”?',
                        options: ["cow", "dog", "cat", "bird"],
                        correctAnswer: "cat"
                    },
                    {
                        title: 'Choose the opposite',
                        slug: 'choose-the-opposite',
                        description: 'Learn simple opposite words in English.',
                        image: '/tasks/english/e-task4.png',
                        difficulty: 'medium',
                        ageGroup: 'Primary School',
                        question: 'What is the opposite of big?',
                        options: ["small", "tall", "fast", "cool"],
                        correctAnswer: "small"
                    },
                    {
                        title: 'Choose the correct greeting',
                        slug: 'correct-greeting',
                        description: 'Practice simple everyday English phrases.',
                        image: '/tasks/english/e-task5.png',
                        difficulty: 'beginner',
                        ageGroup: 'Primary School',
                        question: 'What do we say when we meet someone?',
                        options: ["Goodbye", "Hello", "Sorry", "Thank you"],
                        correctAnswer: "Hello"
                    },
                    {
                        title: 'Complete the sentence',
                        slug: 'complete-the-sentence',
                        description: 'Practice simple English sentences.',
                        image: '/tasks/english/e-task6.png',
                        difficulty: 'advanced',
                        ageGroup: 'Primary School',
                        question: 'Complete the sentence: I ___ happy.',
                        options: ["am", "is", "are", "be"],
                        correctAnswer: "am"
                    },

                ]
            }
        }
    })


    const reading = await prisma.subject.create({
        data: {
            name: 'Reading',
            slug: 'reading',
            description: 'Read stories and improve comprehension.',
            image: '/reading.png',
            tasks: {
                create: [
                    {
                        title: 'Read the story',
                        slug: 'read-the-story',
                        description: 'Read a short story and answer a simple question.',
                        image: '/tasks/reading/r-task1.png',
                        difficulty: 'beginner',
                        ageGroup: 'Kindergarden',
                        question: 'Anna has a red ball. What color is Anna’s ball?',
                        options: ["Blue", "Green", "Red", "Yellow"],
                        correctAnswer: "Red"
                    },
                    {
                        title: 'Read and choose',
                        slug: 'read-and-choose',
                        description: 'Read a short sentence and choose the correct answer.',
                        image: '/tasks/reading/r-task2.png',
                        difficulty: 'medium',
                        ageGroup: 'Early Primary',
                        question: 'Tom is a boy. He has a dog. What does Tom have?',
                        options: ["A cat", "A dog", "A fish", "A bird"],
                        correctAnswer: "A dog"
                    },
                    {
                        title: 'Find the sentence',
                        slug: 'find-the-sentence',
                        description: 'Choose the option that is a complete sentence.',
                        image: '/tasks/reading/r-task3.png',
                        difficulty: 'advanced',
                        ageGroup: 'Primary School',
                        question: 'Which one is a full sentence?',
                        options: ["The cat.", "Cat running", "Is happy.", "The dog is big."],
                        correctAnswer: "The dog is big. "
                    },
                    {
                        title: 'Read the time word',
                        slug: 'time-word',
                        description: 'Practice understanding simple time words.',
                        image: '/tasks/reading/r-task4.png',
                        difficulty: 'medium',
                        ageGroup: 'Primary School',
                        question: 'In the morning, I eat breakfast. When do I eat breakfast?',
                        options: ["In the morning", "In the evening", "In the dinner", "At school"],
                        correctAnswer: "In the morning"
                    },
                    {
                        title: 'Choose the correct ending',
                        slug: 'correct-ending',
                        description: 'Complete a simple sentence so it makes sense.',
                        image: '/tasks/reading/r-task5.png',
                        difficulty: 'beginner',
                        ageGroup: 'Primary School',
                        question: 'The bird can ___.',
                        options: ["fly", "swim", "write", "cook"],
                        correctAnswer: "fly"
                    },
                    {
                        title: 'Find the feeling',
                        slug: 'find-the-feeling',
                        description: 'Read the sentence and understand how someone feels.',
                        image: '/tasks/reading/r-task6.png',
                        difficulty: 'beginner',
                        ageGroup: 'Primary School',
                        question: 'Mia is smiling. She is very happy. How does Mia feel?',
                        options: ["Sad", "Angry", "Happy", "Tired"],
                        correctAnswer: "Happy"
                    }

                ]
            }
        }
    })

    console.log(math, english, reading);
}


main();