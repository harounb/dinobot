const expect = require('chai').expect;
const FrameDataSearchEngine = require('./FrameDataSearchEngine');

const dummyFrameData = {
  moves: [{
    notation: 'SS+4',
    hit_level: 'l (TC)',
    damage: '22',
    speed: '22~23 (31~)',
    on_block: '-37 OC',
    on_hit: 'KND',
    on_ch: 'KND',
  }, {
    notation: 'BT 1 or 2',
    hit_level: 'h',
    damage: '20',
    speed: '8',
    on_block: '-8',
    on_hit: '+3',
    on_ch: '+3',
  }, {
    notation: 'BT 3 or 4',
    hit_level: 'h',
    damage: '33',
    speed: '10',
    on_block: '-8',
    on_hit: 'KND',
    on_ch: 'KND',
  }],
  metadata: {
    ver: '0.4',
    game: 'ttt2',
    character: 'alex',
    type: 'basic',
  },
};

describe('FrameDataSearchEngine', () => {
  const engine = new FrameDataSearchEngine(dummyFrameData);
  describe('#search', () => {
    it('will return a result array', () => {
      const searchResult = engine.search('SS+4');
      expect(searchResult).to.be.an.array;
    });

    it('returned array will contain objects with a ref, move and score', () => {
      const searchFirstResult = engine.search('SS+4')[0];
      expect(searchFirstResult).to.be.an.object;
      expect(searchFirstResult).to.have.property('ref', '0-0');
      expect(searchFirstResult).to.have.property('document');
      expect(searchFirstResult).to.have.property('score', 0.9027501480103624);
    });
  });
});
