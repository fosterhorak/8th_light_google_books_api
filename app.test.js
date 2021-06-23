const tbd = require ('./app');


test('tbd', () => {
    const tbd = tbd(tbd);
    expect(tbd).toBe(tbd);
});