// NOTES  (to do)
    // - test for bugs and edge cases...
    // - add colors to make readability easier (welcome message, menu, list, search, and goodbye message)


// axios for api calls...
const axios = require("axios");    

// readline from nodejs to handle user inputs
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// colored texts options...
let FgRed = "\x1b[31m%s\x1b[0m";
let FgGreen = "\x1b[32m%s\x1b[0m";
let FgYellow = "\x1b[33m%s\x1b[0m";
let FgBlue = "\x1b[34m%s\x1b[0m";
let FgMagenta = "\x1b[35m%s\x1b[0m";
let FgCyan = "\x1b[36m%s\x1b[0m";

// creating empty reading list
let readingList = [];

// creating empty search results list
let searchResults = [];

// start up function
function start() {
    console.log(FgYellow, `\nWelcome to your virtual book library!`);
    mainMenu();
}            


// MAIN PAGES...

// main menu - "main"
function mainMenu() {
    console.warn(FgMagenta, `\n[Main Menu]\n`);
    console.log(`You currently have ${readingList.length} books in your reading list.`);
    directory();
    listenForUserInput();
}

// displays current reading list - "list"
function readingListView() {
    console.log(FgMagenta, `\n[Your Reading List]\n`);
    if (!readingList.length) console.log(`Your reading list is empty :( `);
    else displayBookList(readingList);
    directory();
    listenForUserInput();
}

// new book search page - "new"
function newBookSearch() {
    console.log(FgMagenta, `\n[New Book Search]\n`);
    console.log(`Type in your search below, then hit enter!`);
    console.log(`------------------------------------------\n`);
    listenForUserBookSearch();
}

// search results page (landing page after submitting a book search)
function bookSearchResults(searchTerm) {
    console.log(FgCyan, `\n[Book Search Results]`);
    console.log(`You searched: "${searchTerm}"`);
    console.log(`\nsearching now...\n`);
    
    // call helper function - googleBookSearch(searchTerm);
    googleBookSearch(searchTerm);

    // setting delay to allow for googleBookSearch function to finish...
    setTimeout(function() { 
        
        // in the case that there were no results...
        if (!searchResults.length) {
            console.log(`Sorry, no books match your search :( `);
            directory();
            listenForUserInput();
        }
        
        // display results
        else {
            displayBookList(searchResults);
            console.log(FgGreen, `\nTo add a book to your reading list, enter the book's number [1-5]`);
            console.log(`^ You will be redirected to your reading list ^\n`);
            console.log(`Or navigate using the directory below...`);
            directory();
            listenForReadingListAddition();
        }   
        ;}, 2500 );
}


// COMPONENTS....

// prints directory instructions
function directory() {
    console.log(`\n------------------Directory----------------------------`);
    console.log(FgMagenta, `New Book Search:   type "new" + enter`);
    console.log(FgMagenta, `Reading List:      type "list" + enter`);
    console.log(FgMagenta, `Main Menu:         type "main" + enter`);
    console.log(FgMagenta, `Quit:              type "q" + enter`);
    console.log(`--------------------------------------------------------\n`);
}

// displays lists of books (readingList or searchResults)
function displayBookList(list){
    console.log(` #  ||  TITLE  ||  AUTHOR ||  PUBLISHING COMPANY`);
    console.log(` ----------------------------------------------- `);
    for (let i = 0; i < list.length; i++) {
        console.log(` ${i+1}  ||  ${list[i][0]}  ||  ${list[i][1]}  ||  ${list[i][2]} `);
    }
}

// api function - copies api data to searchResults array
function googleBookSearch(searchTerm) {
    // clearing out searchResults (incase of prevous search...)
    searchResults = [];
    
    // todo: modify search string to replace spaces with "+" marks
    let urlSearch = searchTerm;
    
    axios
        .get(
            `https://www.googleapis.com/books/v1/volumes?q=${urlSearch}`
        )
        .then(res =>{
            let books = res.data.items; 
            console.log(`loading results...\n`);

            // if there are no results... searchResults stays an empty array
            if (books === undefined) {
                searchResults = [];
            }

            // if there are less than 5 results... add them to searchResults
            else if (books.length && books.length < 5 ) {
                for (let i = 0; i < books.length; i++) {
                    searchResults.push([ books[i].volumeInfo.title, books[i].volumeInfo.authors, books[i].volumeInfo.publisher]);
                }
            }

            // if there are 5 or more results... add the first 5 to searchResults
            else if (books.length > 4 ) {
                for (let i = 0; i < 5; i++) {
                    searchResults.push([ books[i].volumeInfo.title, books[i].volumeInfo.authors, books[i].volumeInfo.publisher]);
                }
            }
        })

}

// adds the user's selected book from searchResults to readingList
function addBook(num) {
    readingList.push(searchResults[num-1]);
    console.log(FgGreen, '\nYour selection was added to your reading list!\n');
}       




// LISTENING FUNCTIONS...

// listens for user's directory inputs
function listenForUserInput() {
    let userInput = null;
    rl.question("Where to? ", function(input) {
        userInput = input;
        if (userInput !== null) {
            // directory redirects
            if (userInput === `new` ) newBookSearch();
            if (userInput === `list` ) readingListView();
            if (userInput === `main` ) mainMenu();
            if (userInput === `q` ) {
                console.log("\nAdios!\n");
                process.exit();
            }
            // error catch & guidance
            let arr = ['new','list','main','q'];
            if (!arr.includes(userInput)) {
                console.log(`\nNot an accepted directory key. Please try again.\n`);
                listenForUserInput();
            } 
        }
    });
}

// listens for user book search term
function listenForUserBookSearch() {
    let userSearch;
    rl.question("search: ", function(search) {
        userSearch = search;
        bookSearchResults(userSearch);
    });

    // notes - possible feature to add: provide a way to let users escape from search?
        // '**main' = key word to escape to main menu
}

// listens for user's directory inputs OR which book to add to their reading list
function listenForReadingListAddition() {
    let userSelection;
    rl.question("Selection: ", function(selection) {
        userSelection = selection;
        if (userSelection !== null) {
            // directory redirects
            if (userSelection === `new` ) newBookSearch();
            if (userSelection === `list` ) readingListView();
            if (userSelection === `main` ) mainMenu();
            if (userSelection === `q` ) {
                console.log("\nAdios!\n");
                process.exit();
            }
            // adding a book to their reading list
            if (userSelection === `1` ) {
                addBook(1);
                readingListView();
            }
            if (userSelection === `2` ) {
                addBook(2);
                readingListView();
            }
            if (userSelection === `3` ) {
                addBook(3);
                readingListView();
            }
            if (userSelection === `4` ) {
                addBook(4);
                readingListView();
            }
            if (userSelection === `5` ) {
                addBook(5);
                readingListView();
            }
            /// ^^^ note -  need to account for scenario where there are less than 5 options... (dependent on length of searchResults)

            // error catch & guidance
            let arr = ['new','list','main','q','1','2','3','4','5'];
            if (!arr.includes(userSelection)) {
                console.log(`\nInvalid entry. Please try again.\n`);
                listenForReadingListAddition();
            }
        }
    });
}

start();