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
    it('will return the move object when searching the character and notation', () => {
      expect(engine.search('SS+4')[0].ref).to.equal('0-0');
    });
  });
});
