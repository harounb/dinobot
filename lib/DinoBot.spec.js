const expect = require('chai').expect;
const DinoBot = require('./DinoBot');

describe('DinoBot', () => {
  const dinoBot = new DinoBot();
  describe('#answer', () => {
    it('will answer every question with "I respect it" currently', () => {
      expect(dinoBot.answer('Yo')).to.equal('I respect it');
    });
  });
});
