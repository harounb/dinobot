const expect = require('chai').expect;
const loadFrameDataJson = require('./loadFrameDataJson');
const mock = require('mock-fs');

describe('loadFrameDataJson', () => {
  describe('valid json', () => {
    before(() => {
      mock({
        game: {
          'character1.json': '{"hi": 1}',
          'character2.json': '{"bye": 2}',
        },
      });
    });

    it('will receive a glob and return a promise', () => {
      expect(loadFrameDataJson('./game/*.json')).to.be.an('promise');
    });

    it('each element in returned array will be an object', (done) => {
      const frameDataPromise = loadFrameDataJson('./game/*.json');
      frameDataPromise
        .then((frameDataJson) => {
          frameDataJson.forEach((obj) => {
            expect(obj).to.be.an('object');
          });
          done();
        })
        .catch(done);
    });

    after(() => {
      mock.restore();
    });
  });

  describe('invalid json', () => {
    before(() => {
      mock({
        game: {
          'character1.json': '{"hi": 1}',
          'character2.json': '{"bye: 2}',
        },
      });
    });

    it('will still receive a glob and return a promise', () => {
      expect(loadFrameDataJson('./game/*.json')).to.be.an('promise');
    });

    it('the promise will reject', (done) => {
      loadFrameDataJson('./game/*.json').then(() => {
        done('The promise did not reject');
      }).catch((err) => {
        expect(err).to.be.an('error');
        done();
      });
    });

    after(() => {
      mock.restore();
    });
  });
});
