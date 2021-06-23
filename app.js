
// axios for api calls...
const axios = require("axios");    

// readline from nodejs to handle user inputs
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// colored text
let FgGreen = "\x1b[32m%s\x1b[0m";
let FgYellow = "\x1b[33m%s\x1b[0m";
let FgMagenta = "\x1b[35m%s\x1b[0m";
let FgCyan = "\x1b[36m%s\x1b[0m";

// initialized empty book lists
let readingList = [];
let searchResults = [];

function start() {
    console.log(FgYellow, `\nWelcome to your virtual book library!`);
    mainMenu();
}            

// MAIN PAGES...
function mainMenu() {
    console.log(FgMagenta, `\n[Main Menu]\n`); 
    if ( readingList.length === 1)  console.log(`You currently have ${readingList.length} book in your reading list.`);
    else console.log(`You currently have ${readingList.length} books in your reading list.`);
    directory();
    listenForUserInput();
}

function readingListView() {
    console.log(FgMagenta, `\n[Your Reading List]\n`);
    if (!readingList.length) console.log(`Your reading list is empty :( `);
    else displayBookList(readingList);
    directory();
    listenForUserInput();
}

function newBookSearch() {
    console.log(FgMagenta, `\n[New Book Search]\n`);
    console.log(`Type in your search below, then hit enter!`);
    console.log(`------------------------------------------\n`);
    listenForUserBookSearch();
}

function bookSearchResults(searchTerm) {
    console.log(FgCyan, `\n[Book Search Results]`);
    console.log(`You searched: "${searchTerm}"`);
    console.log(`\nsearching now...\n`);
    
    googleBookSearch(searchTerm);

    setTimeout(function() { 
        
        if (!searchResults.length) {
            console.log(`Sorry, no books match your search :( `);
            directory();
            listenForUserInput();
        }
        
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

// HELPER FUNCTIONS....
function directory() {
    console.log(`\n------------------Directory----------------------------`);
    console.log(FgMagenta, `New Book Search:   type "new" + enter`);
    console.log(FgMagenta, `Reading List:      type "list" + enter`);
    console.log(FgMagenta, `Main Menu:         type "main" + enter`);
    console.log(FgMagenta, `Quit:              type "q" + enter`);
    console.log(`--------------------------------------------------------\n`);
}

function displayBookList(list){
    console.log(` #  ||  TITLE  ||  AUTHORS ||  PUBLISHING COMPANY`);
    console.log(` ----------------------------------------------- `);
    for (let i = 0; i < list.length; i++) {
        console.log(` ${i+1}  ||  ${list[i]['title']}  ||  ${list[i]['authors']}  ||  ${list[i]['publisher']} `);
    }
}

function googleBookSearch(userSearch) {
    searchResults = [];
    axios
        .get(
            `https://www.googleapis.com/books/v1/volumes?q=${userSearch}`
        )
        .then(res =>{
            let books = res.data.items; 
            console.log(`loading results...\n`);
            // no results = searchResults stays an empty array
            if (books === undefined) {
                searchResults = [];
            }
            // < 5 results = add all to searchResults
            else if (books.length && books.length < 5 ) {
                for (let i = 0; i < books.length; i++) {
                    searchResults.push({'title': books[i].volumeInfo.title, 'authors': books[i].volumeInfo.authors, 'publisher': books[i].volumeInfo.publisher});
                }
            }
            // > 5 results = add first 5 to searchResults
            else if (books.length > 4 ) {
                for (let i = 0; i < 5; i++) {
                    searchResults.push({'title': books[i].volumeInfo.title, 'authors': books[i].volumeInfo.authors, 'publisher': books[i].volumeInfo.publisher});
                }
            }
        })
}

function addBook(num) {
    readingList.push(searchResults[num-1]);
    console.log(FgGreen, '\nThe book was added to your reading list!\n');
}       

// LISTENING FUNCTIONS...
// listens for directory inputs
function listenForUserInput() {
    rl.question("Where to? ", function(input) {
        if (input !== null) {
            if (input === `new` ) newBookSearch();
            if (input === `list` ) readingListView();
            if (input === `main` ) mainMenu();
            if (input === `q` ) {
                console.log("\nAdios!\n");
                process.exit();
            }
            let arr = ['new','list','main','q'];
            if (!arr.includes(input)) {
                console.log(`\nNot an accepted directory key. Please try again.\n`);
                listenForUserInput();
            } 
        }
    });
}

function listenForUserBookSearch() {
    rl.question("search: ", function(search) {
        bookSearchResults(search);
    });
}

// listens after search results
function listenForReadingListAddition() {
    rl.question("Selection: ", function(selection) {
        if (selection !== null) {
            if (selection === `new` ) newBookSearch();
            if (selection === `list` ) readingListView();
            if (selection === `main` ) mainMenu();
            if (selection === `q` ) {
                console.log("\nAdios!\n");
                process.exit();
            }
            if (selection === `1` ) {
                addBook(1);
                readingListView();
            }
            if (selection === `2` ) {
                addBook(2);
                readingListView();
            }
            if (selection === `3` ) {
                addBook(3);
                readingListView();
            }
            if (selection === `4` ) {
                addBook(4);
                readingListView();
            }
            if (selection === `5` ) {
                addBook(5);
                readingListView();
            }
            let arr = ['new','list','main','q','1','2','3','4','5'];
            if (!arr.includes(selection)) {
                console.log(`\nInvalid entry. Please try again.\n`);
                listenForReadingListAddition();
            }
        }
    });
}


start();


// export functions for testing
exports.checkAddBook = (idx, searchList, readList) => {
    readList.push(searchList[idx-1]);
    return readList;
}
exports.checkListenForUserInput = (input) => {
    let validEntries = ['new','list','main','q'];
    if (input !== null) {
        // directory redirects
        if (input === `new` ) return 'newBookSearch()';
        if (input === `list` ) return 'readingListView()';
        if (input === `main` ) return 'mainMenu()';
        if (input === `q` )  return 'Adios! & exit()';
        // error catch & guidance
        if (!validEntries.includes(input)) return 'Not an accepted input & listenForUserInput()';
    }
}