const { checkAddBook, checkListenForUserInput } = require ('./app');

const demoReadingList1 = [];
const demoReadingList2 = [];
const demoReadingList3 = [];
const demoSearchResults = [
    {'authors':"author1", 'publisher':'publisher1', 'title':'title1'},
    {'authors':"author2", 'publisher':'publisher2', 'title':'title2'},
    {'authors':"author3", 'publisher':'publisher3', 'title':'title3'},
];




test('add book from search results to reading list', () => {
    
    expect(checkAddBook(1, demoSearchResults, demoReadingList1)
    ).toEqual([demoSearchResults[0]]);
    
    expect(checkAddBook(2, demoSearchResults, demoReadingList2)
    ).toEqual([demoSearchResults[1]]);
    
    expect(checkAddBook(3, demoSearchResults, demoReadingList3)
    ).toEqual([demoSearchResults[2]]);

});


test('valid entries to call correct function', () => {
    
    expect(checkListenForUserInput('new')
    ).toEqual('newBookSearch()');
    
    expect(checkListenForUserInput('list')
    ).toEqual('readingListView()');
    
    expect(checkListenForUserInput('main')
    ).toEqual('mainMenu()');
    
    expect(checkListenForUserInput('q')
    ).toEqual('Adios! & exit()');

});

test('invalid entries to trigger message and recall listen function', () => {
    
    expect(checkListenForUserInput('asdfsaaweawerqwewrd')
    ).toEqual('Not an accepted input & listenForUserInput()');
    
    expect(checkListenForUserInput('qmains')
    ).toEqual('Not an accepted input & listenForUserInput()');
    
    expect(checkListenForUserInput()
    ).toEqual('Not an accepted input & listenForUserInput()');
    
    expect(checkListenForUserInput('mains')
    ).toEqual('Not an accepted input & listenForUserInput()');
    
    expect(checkListenForUserInput('1234234')
    ).toEqual('Not an accepted input & listenForUserInput()');
    
    expect(checkListenForUserInput('list main new')
    ).toEqual('Not an accepted input & listenForUserInput()');
    
    expect(checkListenForUserInput(' new')
    ).toEqual('Not an accepted input & listenForUserInput()');

});