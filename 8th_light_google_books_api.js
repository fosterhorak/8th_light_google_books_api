// Code Submission Instructions...
// Create a command line application that allows you to use the Google Books API to search for books and construct a reading list.

// You do not have to use a private GitHub repo for this.

// This application should allow you to:
// Type in a query and display a list of 5 books matching that query.
// Each item in the list should include the book's author, title, and publishing company.
// A user should be able to select a book from the five displayed to save to a “Reading List”
// View a “Reading List” with all the books the user has selected from their queries -- this is a local reading list and not tied to Google Books’s account features.
// For programming language, choose any language you want as long as it is not the same language you chose to review in the Code Review section above. 
// Feel free to use a library (or not) for the Google Books call or JSON parsing.

// Please do not add any additional features.

// .......................................................



// NOTES  (to do)
    // - google api functioning...
    // - copy top 5 results to searchResults
    // - user selection to add book to reading list...
    // - test for bugs and edge cases...
    // - add colors to make readability easier (welcome message, menu, list, search, and goodbye message)


// "readline" from nodejs (npm install prompt) -- to handle user inputs
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// reading list - filled for dev purposes
let readingList = [];
// let readingList = [     ["demo title", "demo author", "demo publishing co"], 
//                     ["demo title", "demo author", "demo publishing co"], 
//                     ["demo title", "demo author", "demo publishing co"], 
//                     ["demo title", "demo author", "demo publishing co"], 
//                     ["demo title", "demo author", "demo publishing co"]];

// search results list - filled for dev purposes
let searchResults = [   ["demo search title 1", "demo search author", "demo search publishing co"], 
                    ["demo search title 2", "demo search author", "demo search publishing co"], 
                    ["demo search title 3", "demo search author", "demo search publishing co"], 
                    ["demo search title 4", "demo search author", "demo search publishing co"], 
                    ["demo search title 5", "demo search author", "demo search publishing co"]];

function startupMessage() {
    console.log(`\nWelcome to your virtual book library!`);
    mainMenu();
}            

function mainMenu() {
    console.log(`\n[Main Menu]\n`);
    console.log(`You currently have ${readingList.length} books in your Reading List`);
    navOptions();
    listenForUserInput();
}

function navOptions() {
    console.log(`\nDirectory`);
    console.log(`--------------------------------------------------------`);
    console.log(`New Book Search:   type "new" + enter`);
    console.log(`Reading List:      type "list" + enter`);
    console.log(`Main Menu:         type "main" + enter`);
    console.log(`Quit:              type "q" + enter`);
    console.log(`--------------------------------------------------------\n`);

}

function readingListView() {
    console.log(`\n[Your Reading List]\n`);
    if (!readingList.length) console.log(`Your reading list is empty :( `);
    else displayBookList(readingList);
    navOptions();
    listenForUserInput();
}

function displayBookList(list){
    console.log(` #  ||  TITLE  ||  AUTHOR ||  PUBLISHING COMPANY`);
    console.log(` ----------------------------------------------- `);
    for (let i = 0; i < list.length; i++) {
        console.log(` ${i+1}  ||  ${list[i][0]}  ||  ${list[i][1]}  ||  ${list[i][2]} `);
    }
}

function newBookSearch() {
    console.log(`\n[New Book Search]\n`);
    console.log(`Type in your search below, then hit enter!`);
    console.log(`------------------------------------------\n`);
    listenForUserBookSearch();
}


function listenForUserInput() {
    let userInput = null;
    rl.question("Where to? ", function(input) {
        userInput = input;
        if (userInput !== null) {
            if (userInput === `new` ) newBookSearch();
            if (userInput === `list` ) readingListView();
            if (userInput === `main` ) mainMenu();
            if (userInput === `q` ) {
                console.log("\nAdios!\n");
                process.exit();
            }
            if (userInput != "new" && userInput != "list" && userInput != "main" && userInput != "q") {
                console.log(`\nNot an accepted directory key. Please try again.\n`);
                listenForUserInput();
            } 
        }
    });
}

function listenForUserBookSearch() {
    // NOTE - include error catching for invalid entries??
    let userSearch;
    rl.question("search: ", function(search) {
        userSearch = search;
        bookSearchResults(userSearch);
    });
    // notes - possible feature to add
        // provide a way to let users escape from search? or do i force them to search?
        // '**main' = key word to escape to main menu
}

function listenForReadingListAddition() {
    let userSelection;
    rl.question("Selection: ", function(selection) {
        userSelection = selection;
        if (userSelection !== null) {
            if (userSelection === `new` ) newBookSearch();
            if (userSelection === `list` ) readingListView();
            if (userSelection === `main` ) mainMenu();
            if (userSelection === `q` ) {
                console.log("\nAdios!\n");
                process.exit();
            }
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
            let arr = ['new','list','main','q','1','2','3','4','5'];
            if (!arr.includes(userSelection)) {
                console.log(`\nInvalid entry. Please try again.\n`);
                listenForReadingListAddition();
            }
        }
    });
}


function bookSearchResults(searchTerm) {
    console.log(`\n[Book Search Results]`);
    console.log(`You searched: ${searchTerm}`);
    console.log(`Results...\n`);
    
    // call helper function - googleBookSearch(searchTerm);
    // will return / update my temporary searchResults (book array);
    
    displayBookList(searchResults);
    console.log(`\nTo add a book to your reading list, enter the book's number [1-5]`);
    console.log(`^ You will be redirected to your reading list ^\n`);
    console.log(`Or navigate using the directory below...`);
    navOptions();
    listenForReadingListAddition();

    // need to account for situation for no search results...
}

function googleBookSearch(searchTerm) {
    // take user search
    // call google API
    // get resulting object from google API
    // copy/scrape to my temporary searchResults array
    // return array
}

function addBook(num) {
    readingList.push(searchResults[num-1]);
    console.log('\nBook Added to Reading List!!!\n');
}       



startupMessage();
