const expect = require('chai').expect;
const DinoBot = require('./DinoBot');
const templates = require('./templates');
const phrases = require('./phrases');

describe('DinoBot', () => {
  it(
    'will throw an error if not given a phrases array and templates object',
    () => {
      expect(() => (new DinoBot())).to.throw(Error);
      expect(() => (new DinoBot({ phrases }))).to.throw(Error);
      expect(() => (new DinoBot({ templates }))).to.throw(Error);
      expect(() => (new DinoBot({ phrases: '' }))).to.throw(Error);
      expect(() => (new DinoBot({ templates: 1 }))).to.throw(Error);
    }
  );

  const mockPhrases = [];
  const dinoBot = new DinoBot({ templates, phrases: mockPhrases });
  describe('#answer', () => {
    it('will answer not recognised queries with notFound template', () => {
      expect(dinoBot.answer('Yo')).to.equal(templates.notFound());
    });

    it('will answer queries with \'help\' as the first word with the help template', () => {
      expect(dinoBot.answer('help')).to.equal(templates.help());
    });

    it('will answer queries with \'hi\' as the first word with the hi template', () => {
      expect(dinoBot.answer('hi')).to.equal(templates.hi());
    });

    it('queries are not case sensitive', () => {
      expect(dinoBot.answer('hi')).to.equal(dinoBot.answer('Hi'));
    });
  });
});
