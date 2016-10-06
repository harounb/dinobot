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

    describe('with frame data', () => {
      const dinoBot2 = new DinoBot({
        templates,
        phrases: mockPhrases,
        frameDataJsons: [{
          moves: [{
            notation: 'f,f+2',
            hit_level: 'h',
            damage: '18',
            speed: '10',
            on_block: '+2',
            on_hit: '+6',
            on_ch: '+6',
          }],
          metadata: {
            character: 'roger',
            game: 'ttt2',
          },
        }],
      });
      it('will reply with something containing the result', () => {
        expect(dinoBot2.answer('framedata roger f,f+2')).to.contain('roger');
        expect(dinoBot2.answer('framedata roger f,f+2')).to.contain('f,f+2');
        expect(dinoBot2.answer('framedata roger f,f+2')).to.contain('ttt2');
        expect(dinoBot2.answer('framedata roger f,f+2')).to.contain('+2');
      });
    });
  });
});
