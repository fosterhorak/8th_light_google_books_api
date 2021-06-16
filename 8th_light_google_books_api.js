// Code Submission Instructions...
// Create a command line application that allows you to use the Google Books API to search for books and construct a reading list.

// You do not have to use a private GitHub repo for this.

// This application should allow you to:
// Type in a query and display a list of 5 books matching that query.
// Each item in the list should include the book's author, title, and publishing company.
// A user should be able to select a book from the five displayed to save to a “Reading List”
// View a “Reading List” with all the books the user has selected from their queries -- this is a local reading list and not tied to Google Books’s account features.
// For programming language, choose any language you want as long as it is not the same language you chose to review in the Code Review section above. Feel free to use a library (or not) for the Google Books call or JSON parsing.

// Please do not add any additional features.

// .......................................................



// "prompt" from nodejs (npm install prompt)
// const prompt = require('prompt');


// "readline" from nodejs (npm install prompt)
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



// reading list - filled for dev
let readingList = [     ["demo title", "demo author", "demo publishing co"], 
                    ["demo title", "demo author", "demo publishing co"], 
                    ["demo title", "demo author", "demo publishing co"], 
                    ["demo title", "demo author", "demo publishing co"], 
                    ["demo title", "demo author", "demo publishing co"]];

// search results list - filled for dev
    // this list will be filled with the top 5 results from google books api with search query is made
    // when user selects one, the info will be copied into the user library reading list
let searchResults = [   [1, "demo title", "demo author", "demo publishing co"], 
                    [2, "demo title", "demo author", "demo publishing co"], 
                    [3, "demo title", "demo author", "demo publishing co"], 
                    [4, "demo title", "demo author", "demo publishing co"], 
                    [5, "demo title", "demo author", "demo publishing co"]];
        
function startupMessage() {
    console.log(``);
    console.log(`Welcome to your virtual book library!`);
    mainMenu();
}            

function mainMenu() {
    console.log(``);
    console.log(``);
    console.log(`[Main Menu]`);
    console.log(``);
    console.log(`You currently have ${readingList.length} books in your Reading List`);
    navOptions();
}

function navOptions() {
    console.log(``);
    console.log(`--------------------------------------------------------`);
    console.log(``);
    console.log(`New Book Search:   type "new" + enter`);
    console.log(`Reading List:      type "list" + enter`);
    console.log(`Main Menu:         type "main" + enter`);
    console.log(`Quit:              type "q" + enter`);
    console.log(``);
    
    // call function to listen to user input
    listenForUserInput();

}

function readingListView() {
    console.log(``);
    console.log(``);
    console.log(`[Your Reading List]`);
    console.log(``);
    if (!readingList.length) console.log(`You're reading list is empty :( `);
    else {
        console.log(` #  ||  TITLE  ||  AUTHOR ||  PUBLISHING COMPANY`);
        console.log(` ------------------------------- `);
        for (let i = 0; i < readingList.length; i++) {
            console.log(` ${i+1}  ||  ${readingList[i][0]}  ||  ${readingList[i][1]}  ||  ${readingList[i][2]} `);
        }
    }
    console.log(``);
    navOptions();
}


function newBookSearch() {
    console.log(``);
    console.log(``);
    console.log(`[New Book Search]`);
    console.log(``);
    console.log(`Type in the your search below, then hit enter!`);
    console.log(`---------------------------------------------- `);
    console.log(``);
    // call function to listen for user book search...
}


 // "[Book Search Results]"
    // will return top 5 results from google books api (numbered 1-5)
    // below search results will provide guidance...
        // To add a book to your reading list: type "# of your book selection" + enter 
            // note - you'll be redirected to your reading list

    // New Book Search: type "new" + enter
    // Reading List: type "list" + enter
    // Main Menu = type "main" + enter
    // Quit = type "q" + enter
        // NOTE - include error catching for invalid entries





function listenForUserInput() {
    // NOTE - include error catching for invalid entries
    
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
                console.log(``);
                console.log(`Not an accepted directory key. Please try again.`);
                console.log(``);
                listenForUserInput();
            } 
        }
    });

}

function listenForUserBookSearch() {
    // NOTE - include error catching for invalid entries

    // provide a way to let users escape from search? or force them to search?
        // -- require them to enter "s:" + search term, then keep other commands active?
        // provide a key word to escape search?

    // what sort of errors / edge cases will I need to catch??
    // how will i need to manipulate the user input for the api query??? 
    // if there are no results, I'll need to provide guidance and allow the user to try again...
}



startupMessage();
