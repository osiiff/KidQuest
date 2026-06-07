import "dotenv/config";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hashSync } from "bcrypt-ts-edge";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
    await prisma.task.deleteMany();
    await prisma.subject.deleteMany();
    await prisma.account.deleteMany();
    await prisma.session.deleteMany();
    await prisma.verificationToken.deleteMany();
    await prisma.user.deleteMany();

    await prisma.subject.create({
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

                        questions: {
                        create: [
                            {
                            text: 'What comes next: 2, 4, 6, ?',
                            options: ['7', '8', '9', '10'],
                            correctAnswer: '8',
                            },
                            {
                            text: 'What comes next: 5, 10, 15, ?',
                            options: ['19', '20', '30', '25'],
                            correctAnswer: '20',
                            },
                            {
                            text: 'What comes next: 1, 3, 5, ?',
                            options: ['6', '7', '8', '9'],
                            correctAnswer: '7',
                            },
                            {
                            text: 'What comes next: 10, 20, 30, ?',
                            options: ['35', '40', '45', '50'],
                            correctAnswer: '40',
                            },
                            {
                            text: 'What comes next: 3, 6, 9, ?',
                            options: ['10', '11', '12', '13'],
                            correctAnswer: '12',
                            },
                        ],
                        },
                    },
                    {
                        title: 'Find the odd one',
                        slug: 'find-the-odd-one',
                        description: 'Look at the numbers and find the one that does not belong.',
                        image: '/tasks/math/m-task2.png',
                        difficulty: 'medium',
                        ageGroup: 'Early Primary',
                        questions: {
                            create: [
                            {
                                text: 'Which number is different?',
                                options: ['2', '4', '6', '7'],
                                correctAnswer: '7',
                            },
                            {
                                text: 'Which number is different?',
                                options: ['10', '12', '14', '15'],
                                correctAnswer: '15',
                            },
                            {
                                text: 'Which number is different?',
                                options: ['3', '6', '9', '10'],
                                correctAnswer: '10',
                            },
                            {
                                text: 'Which number is different?',
                                options: ['5', '10', '15', '18'],
                                correctAnswer: '18',
                            },
                            {
                                text: 'Which number is different?',
                                options: ['20', '25', '30', '33'],
                                correctAnswer: '33',
                            },
                            ],
                        },
                        },
                        {
                        title: 'Simple adding',
                        slug: 'simple-adding',
                        description: 'Solve an easy addition problem with small numbers.',
                        image: '/tasks/math/m-task3.png',
                        difficulty: 'medium',
                        ageGroup: 'Kindergarten',
                        questions: {
                            create: [
                            {
                                text: 'What is 3 + 2?',
                                options: ['5', '4', '6', '7'],
                                correctAnswer: '5',
                            },
                            {
                                text: 'What is 4 + 1?',
                                options: ['3', '4', '5', '6'],
                                correctAnswer: '5',
                            },
                            {
                                text: 'What is 2 + 6?',
                                options: ['7', '8', '9', '10'],
                                correctAnswer: '8',
                            },
                            {
                                text: 'What is 5 + 5?',
                                options: ['8', '9', '10', '11'],
                                correctAnswer: '10',
                            },
                            {
                                text: 'What is 7 + 2?',
                                options: ['8', '9', '10', '11'],
                                correctAnswer: '9',
                            },
                            ],
                        },
                        },
                        {
                        title: 'Number order',
                        slug: 'number-order',
                        description: 'Practice putting numbers in the correct order.',
                        image: '/tasks/math/m-task4.png',
                        difficulty: 'medium',
                        ageGroup: 'Kindergarten',
                        questions: {
                            create: [
                            {
                                text: 'Which number comes after 9?',
                                options: ['8', '10', '11', '7'],
                                correctAnswer: '10',
                            },
                            {
                                text: 'Which number comes after 4?',
                                options: ['3', '5', '6', '7'],
                                correctAnswer: '5',
                            },
                            {
                                text: 'Which number comes before 8?',
                                options: ['6', '7', '9', '10'],
                                correctAnswer: '7',
                            },
                            {
                                text: 'Which number comes after 12?',
                                options: ['11', '13', '14', '15'],
                                correctAnswer: '13',
                            },
                            {
                                text: 'Which number comes before 20?',
                                options: ['18', '19', '21', '22'],
                                correctAnswer: '19',
                            },
                            ],
                        },
                        },
                        {
                        title: 'Bigger or smaller?',
                        slug: 'bigger-or-smaller',
                        description: 'Compare two numbers and choose the bigger one.',
                        image: '/tasks/math/m-task5.png',
                        difficulty: 'advanced',
                        ageGroup: 'Primary School',
                        questions: {
                            create: [
                            {
                                text: 'Which number is bigger?',
                                options: ['49', '90', '89', '77'],
                                correctAnswer: '90',
                            },
                            {
                                text: 'Which number is bigger?',
                                options: ['12', '21', '9', '18'],
                                correctAnswer: '21',
                            },
                            {
                                text: 'Which number is bigger?',
                                options: ['45', '54', '39', '50'],
                                correctAnswer: '54',
                            },
                            {
                                text: 'Which number is smaller?',
                                options: ['30', '25', '40', '35'],
                                correctAnswer: '25',
                            },
                            {
                                text: 'Which number is smaller?',
                                options: ['99', '87', '76', '89'],
                                correctAnswer: '76',
                            },
                            ],
                        },
                        },
                        {
                        title: 'Simple subtraction',
                        slug: 'simple-subtraction',
                        description: 'Practice taking away numbers with an easy subtraction task.',
                        image: '/tasks/math/m-task6.png',
                        difficulty: 'advanced',
                        ageGroup: 'Primary School',
                        questions: {
                            create: [
                            {
                                text: 'What is 76 - 39?',
                                options: ['39', '40', '36', '37'],
                                correctAnswer: '37',
                            },
                            {
                                text: 'What is 10 - 4?',
                                options: ['4', '5', '6', '7'],
                                correctAnswer: '6',
                            },
                            {
                                text: 'What is 15 - 7?',
                                options: ['6', '7', '8', '9'],
                                correctAnswer: '8',
                            },
                            {
                                text: 'What is 20 - 9?',
                                options: ['9', '10', '11', '12'],
                                correctAnswer: '11',
                            },
                            {
                                text: 'What is 50 - 25?',
                                options: ['20', '25', '30', '35'],
                                correctAnswer: '25',
                            },
                            ],
                        },
                        },

                ]
            }
        }
    })

    await prisma.subject.create({
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
                    ageGroup: 'Kindergarten',
                    questions: {
                        create: [
                        {
                            text: 'Which letter comes after H?',
                            options: ['J', 'L', 'I', 'G'],
                            correctAnswer: 'I',
                        },
                        {
                            text: 'Which letter comes after A?',
                            options: ['B', 'C', 'D', 'E'],
                            correctAnswer: 'B',
                        },
                        {
                            text: 'Which letter comes before D?',
                            options: ['A', 'B', 'C', 'E'],
                            correctAnswer: 'C',
                        },
                        {
                            text: 'Which letter comes after M?',
                            options: ['N', 'O', 'L', 'P'],
                            correctAnswer: 'N',
                        },
                        {
                            text: 'Which letter comes before Z?',
                            options: ['X', 'Y', 'W', 'V'],
                            correctAnswer: 'Y',
                        },
                        ],
                    },
                    },
                    {
                    title: 'Choose the color',
                    slug: 'choose-the-color',
                    description: 'Learn basic colors in English.',
                    image: '/tasks/english/e-task2.png',
                    difficulty: 'medium',
                    ageGroup: 'Early Primary',
                    questions: {
                        create: [
                        {
                            text: 'What color is the sky?',
                            options: ['green', 'blue', 'white', 'red'],
                            correctAnswer: 'blue',
                        },
                        {
                            text: 'What color is grass?',
                            options: ['green', 'pink', 'black', 'orange'],
                            correctAnswer: 'green',
                        },
                        {
                            text: 'What color is a banana?',
                            options: ['yellow', 'blue', 'purple', 'brown'],
                            correctAnswer: 'yellow',
                        },
                        {
                            text: 'What color is snow?',
                            options: ['red', 'white', 'green', 'black'],
                            correctAnswer: 'white',
                        },
                        {
                            text: 'What color is an orange?',
                            options: ['orange', 'blue', 'gray', 'pink'],
                            correctAnswer: 'orange',
                        },
                        ],
                    },
                    },
                    {
                    title: 'Animal sounds',
                    slug: 'animal-sounds',
                    description: 'Match animals with simple English words.',
                    image: '/tasks/english/e-task3.png',
                    difficulty: 'medium',
                    ageGroup: 'Early Primary',
                    questions: {
                        create: [
                        {
                            text: 'Which animal says “meow”?',
                            options: ['cow', 'dog', 'cat', 'bird'],
                            correctAnswer: 'cat',
                        },
                        {
                            text: 'Which animal says “woof”?',
                            options: ['dog', 'cat', 'duck', 'fish'],
                            correctAnswer: 'dog',
                        },
                        {
                            text: 'Which animal says “moo”?',
                            options: ['horse', 'cow', 'pig', 'sheep'],
                            correctAnswer: 'cow',
                        },
                        {
                            text: 'Which animal says “quack”?',
                            options: ['duck', 'cat', 'lion', 'rabbit'],
                            correctAnswer: 'duck',
                        },
                        {
                            text: 'Which animal says “baa”?',
                            options: ['bird', 'sheep', 'dog', 'cow'],
                            correctAnswer: 'sheep',
                        },
                        ],
                    },
                    },
                    {
                    title: 'Choose the opposite',
                    slug: 'choose-the-opposite',
                    description: 'Learn simple opposite words in English.',
                    image: '/tasks/english/e-task4.png',
                    difficulty: 'medium',
                    ageGroup: 'Primary School',
                    questions: {
                        create: [
                        {
                            text: 'What is the opposite of big?',
                            options: ['small', 'tall', 'fast', 'cool'],
                            correctAnswer: 'small',
                        },
                        {
                            text: 'What is the opposite of hot?',
                            options: ['cold', 'warm', 'big', 'short'],
                            correctAnswer: 'cold',
                        },
                        {
                            text: 'What is the opposite of fast?',
                            options: ['slow', 'small', 'happy', 'clean'],
                            correctAnswer: 'slow',
                        },
                        {
                            text: 'What is the opposite of happy?',
                            options: ['sad', 'good', 'nice', 'funny'],
                            correctAnswer: 'sad',
                        },
                        {
                            text: 'What is the opposite of tall?',
                            options: ['short', 'long', 'big', 'young'],
                            correctAnswer: 'short',
                        },
                        ],
                    },
                    },
                    {
                    title: 'Choose the correct greeting',
                    slug: 'correct-greeting',
                    description: 'Practice simple everyday English phrases.',
                    image: '/tasks/english/e-task5.png',
                    difficulty: 'beginner',
                    ageGroup: 'Primary School',
                    questions: {
                        create: [
                        {
                            text: 'What do we say when we meet someone?',
                            options: ['Goodbye', 'Hello', 'Sorry', 'Thank you'],
                            correctAnswer: 'Hello',
                        },
                        {
                            text: 'What do we say when we leave?',
                            options: ['Goodbye', 'Hello', 'Please', 'Yes'],
                            correctAnswer: 'Goodbye',
                        },
                        {
                            text: 'What do we say when someone helps us?',
                            options: ['Thank you', 'Goodbye', 'No', 'Sorry'],
                            correctAnswer: 'Thank you',
                        },
                        {
                            text: 'What do we say when we ask for something nicely?',
                            options: ['Please', 'Bye', 'No', 'Hello'],
                            correctAnswer: 'Please',
                        },
                        {
                            text: 'What do we say when we make a mistake?',
                            options: ['Sorry', 'Thanks', 'Hello', 'Good night'],
                            correctAnswer: 'Sorry',
                        },
                        ],
                    },
                    },
                    {
                    title: 'Complete the sentence',
                    slug: 'complete-the-sentence',
                    description: 'Practice simple English sentences.',
                    image: '/tasks/english/e-task6.png',
                    difficulty: 'advanced',
                    ageGroup: 'Primary School',
                    questions: {
                        create: [
                        {
                            text: 'Complete the sentence: I ___ happy.',
                            options: ['am', 'is', 'are', 'be'],
                            correctAnswer: 'am',
                        },
                        {
                            text: 'Complete the sentence: She ___ my friend.',
                            options: ['am', 'is', 'are', 'be'],
                            correctAnswer: 'is',
                        },
                        {
                            text: 'Complete the sentence: They ___ students.',
                            options: ['am', 'is', 'are', 'be'],
                            correctAnswer: 'are',
                        },
                        {
                            text: 'Complete the sentence: He ___ a book.',
                            options: ['has', 'have', 'am', 'are'],
                            correctAnswer: 'has',
                        },
                        {
                            text: 'Complete the sentence: We ___ English.',
                            options: ['like', 'likes', 'is', 'am'],
                            correctAnswer: 'like',
                        },
                        ],
                    },
                    },
                ],
            },
        }
    })


    await prisma.subject.create({
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
                    ageGroup: 'Kindergarten',
                    questions: {
                        create: [
                        {
                            text: 'Anna has a red ball. What color is Anna’s ball?',
                            options: ['Blue', 'Green', 'Red', 'Yellow'],
                            correctAnswer: 'Red',
                        },
                        {
                            text: 'Ben has a blue car. What color is Ben’s car?',
                            options: ['Blue', 'Red', 'Green', 'Black'],
                            correctAnswer: 'Blue',
                        },
                        {
                            text: 'Lily has a yellow hat. What color is Lily’s hat?',
                            options: ['Pink', 'Yellow', 'White', 'Blue'],
                            correctAnswer: 'Yellow',
                        },
                        {
                            text: 'Max has a green bag. What color is Max’s bag?',
                            options: ['Green', 'Orange', 'Red', 'Purple'],
                            correctAnswer: 'Green',
                        },
                        {
                            text: 'Sara has a pink dress. What color is Sara’s dress?',
                            options: ['Black', 'Pink', 'Blue', 'Brown'],
                            correctAnswer: 'Pink',
                        },
                        ],
                    },
                    },
                    {
                    title: 'Read and choose',
                    slug: 'read-and-choose',
                    description: 'Read a short sentence and choose the correct answer.',
                    image: '/tasks/reading/r-task2.png',
                    difficulty: 'medium',
                    ageGroup: 'Early Primary',
                    questions: {
                        create: [
                        {
                            text: 'Tom is a boy. He has a dog. What does Tom have?',
                            options: ['A cat', 'A dog', 'A fish', 'A bird'],
                            correctAnswer: 'A dog',
                        },
                        {
                            text: 'Emma is a girl. She has a cat. What does Emma have?',
                            options: ['A dog', 'A cat', 'A horse', 'A duck'],
                            correctAnswer: 'A cat',
                        },
                        {
                            text: 'Jack has a small fish. What does Jack have?',
                            options: ['A fish', 'A bird', 'A rabbit', 'A dog'],
                            correctAnswer: 'A fish',
                        },
                        {
                            text: 'Mia has a red apple. What does Mia have?',
                            options: ['A banana', 'An apple', 'A pear', 'A cake'],
                            correctAnswer: 'An apple',
                        },
                        {
                            text: 'Leo has a book. What does Leo have?',
                            options: ['A pencil', 'A toy', 'A book', 'A ball'],
                            correctAnswer: 'A book',
                        },
                        ],
                    },
                    },
                    {
                    title: 'Find the sentence',
                    slug: 'find-the-sentence',
                    description: 'Choose the option that is a complete sentence.',
                    image: '/tasks/reading/r-task3.png',
                    difficulty: 'advanced',
                    ageGroup: 'Primary School',
                    questions: {
                        create: [
                        {
                            text: 'Which one is a full sentence?',
                            options: ['The cat.', 'Cat running', 'Is happy.', 'The dog is big.'],
                            correctAnswer: 'The dog is big.',
                        },
                        {
                            text: 'Which one is a full sentence?',
                            options: ['Runs fast.', 'The boy runs.', 'A small dog', 'Very happy'],
                            correctAnswer: 'The boy runs.',
                        },
                        {
                            text: 'Which one is a full sentence?',
                            options: ['On the table', 'She is reading.', 'The blue book', 'Is tall'],
                            correctAnswer: 'She is reading.',
                        },
                        {
                            text: 'Which one is a full sentence?',
                            options: ['The sun is hot.', 'Very bright', 'In the sky', 'Sun shining'],
                            correctAnswer: 'The sun is hot.',
                        },
                        {
                            text: 'Which one is a full sentence?',
                            options: ['My friend', 'Has a toy', 'I like apples.', 'Big house'],
                            correctAnswer: 'I like apples.',
                        },
                        ],
                    },
                    },
                    {
                    title: 'Read the time word',
                    slug: 'time-word',
                    description: 'Practice understanding simple time words.',
                    image: '/tasks/reading/r-task4.png',
                    difficulty: 'medium',
                    ageGroup: 'Primary School',
                    questions: {
                        create: [
                        {
                            text: 'In the morning, I eat breakfast. When do I eat breakfast?',
                            options: ['In the morning', 'In the evening', 'At night', 'At school'],
                            correctAnswer: 'In the morning',
                        },
                        {
                            text: 'At night, I go to sleep. When do I go to sleep?',
                            options: ['In the morning', 'At night', 'At lunch', 'In the park'],
                            correctAnswer: 'At night',
                        },
                        {
                            text: 'In the afternoon, I play outside. When do I play outside?',
                            options: ['In the afternoon', 'At night', 'In the morning', 'At breakfast'],
                            correctAnswer: 'In the afternoon',
                        },
                        {
                            text: 'In the evening, we eat dinner. When do we eat dinner?',
                            options: ['In the evening', 'In the morning', 'At school', 'At noon'],
                            correctAnswer: 'In the evening',
                        },
                        {
                            text: 'At noon, I eat lunch. When do I eat lunch?',
                            options: ['At noon', 'At night', 'In the evening', 'Before bed'],
                            correctAnswer: 'At noon',
                        },
                        ],
                    },
                    },
                    {
                    title: 'Choose the correct ending',
                    slug: 'correct-ending',
                    description: 'Complete a simple sentence so it makes sense.',
                    image: '/tasks/reading/r-task5.png',
                    difficulty: 'beginner',
                    ageGroup: 'Primary School',
                    questions: {
                        create: [
                        {
                            text: 'The bird can ___.',
                            options: ['fly', 'swim', 'write', 'cook'],
                            correctAnswer: 'fly',
                        },
                        {
                            text: 'The fish can ___.',
                            options: ['run', 'swim', 'read', 'jump high'],
                            correctAnswer: 'swim',
                        },
                        {
                            text: 'The dog can ___.',
                            options: ['bark', 'write', 'cook', 'fly'],
                            correctAnswer: 'bark',
                        },
                        {
                            text: 'The baby can ___.',
                            options: ['cry', 'drive', 'teach', 'fly'],
                            correctAnswer: 'cry',
                        },
                        {
                            text: 'The cat can ___.',
                            options: ['meow', 'sing songs', 'cook soup', 'read books'],
                            correctAnswer: 'meow',
                        },
                        ],
                    },
                    },
                    {
                    title: 'Find the feeling',
                    slug: 'find-the-feeling',
                    description: 'Read the sentence and understand how someone feels.',
                    image: '/tasks/reading/r-task6.png',
                    difficulty: 'beginner',
                    ageGroup: 'Primary School',
                    questions: {
                        create: [
                        {
                            text: 'Mia is smiling. She is very happy. How does Mia feel?',
                            options: ['Sad', 'Angry', 'Happy', 'Tired'],
                            correctAnswer: 'Happy',
                        },
                        {
                            text: 'Tom is crying. He lost his toy. How does Tom feel?',
                            options: ['Happy', 'Sad', 'Excited', 'Hungry'],
                            correctAnswer: 'Sad',
                        },
                        {
                            text: 'Anna is yawning. She wants to sleep. How does Anna feel?',
                            options: ['Tired', 'Angry', 'Happy', 'Scared'],
                            correctAnswer: 'Tired',
                        },
                        {
                            text: 'Ben is shouting. He is very angry. How does Ben feel?',
                            options: ['Calm', 'Angry', 'Sleepy', 'Happy'],
                            correctAnswer: 'Angry',
                        },
                        {
                            text: 'Lily got a gift. She is smiling. How does Lily feel?',
                            options: ['Sad', 'Tired', 'Happy', 'Angry'],
                            correctAnswer: 'Happy',
                        },
                        ],
                    },
                    },
                ],
                },
        }
    })


    await prisma.user.createMany({
        data: [
                {
                name: 'John',
                email: 'admin@example.com',
                password: hashSync('123456', 10),
                role: 'admin',
                },
                {
                name: 'Jane',
                email: 'user@example.com',
                password: hashSync('123456', 10),
                role: 'user',
                },
            ]

    })

}


main();