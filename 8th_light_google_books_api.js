// Code Submission
// Create a command line application that allows you to use the Google Books API to search for books and construct a reading list.

// You do not have to use a private GitHub repo for this.

// This application should allow you to:
// Type in a query and display a list of 5 books matching that query.
// Each item in the list should include the book's author, title, and publishing company.
// A user should be able to select a book from the five displayed to save to a “Reading List”
// View a “Reading List” with all the books the user has selected from their queries -- this is a local reading list and not tied to Google Books’s account features.
// For programming language, choose any language you want as long as it is not the same language you chose to review in the Code Review section above. Feel free to use a library (or not) for the Google Books call or JSON parsing.

// Please do not add any additional features.



// planning:

// program will initialize the following:
    //  - empty user reading list
    //  - empty (temp/resuable) search results list (include books author, title, publishing company)
        // this list will be filled with the top 5 results from google books api with search query is made
        // when user selects one, the info will be copied into the user library reading list



// user experience / flow

// welcome message w/ instructions
    // [upon starting program]
    // "Welcome to Your Library!!"

    // "[Main Menu]"
        // You currently have {readingList.length} books in your Reading List.

        // New Book Search: type "new" + enter
        // Reading List: type "list" + enter
        // Main Menu = type "main" + enter
        // Quit = type "q" + enter
            // NOTE - include error catching for invalid entries
    

    // "[Reading List]"
        // note = will display current reading list in a table
        // [#      title      author      publishin company]
        
        // New Book Search: type "new" + enter
        // Reading List: type "list" + enter
        // Main Menu = type "main" + enter
        // Quit = type "q" + enter
            // NOTE - include error catching for invalid entries

    // "[New Book Search]""
        // Please type your search query and press enter...
            // how to let user escape from search function?? 
                // -- require them to enter "s:" + search term, then keep other commands active?
                // provide a key word to escape search?
            // any sort of error catching or edge cases that need to be caught here??
            // anything special that needs to be done to query to work with API??
            // if there are no results, provide guidance and allow user to try again

        
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

                