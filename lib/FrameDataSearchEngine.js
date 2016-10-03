const lunr = require('lunr');

class FrameDataSearchEngine {
  constructor(...frameDataJsons) {
    this.index = lunr(function fieldNames() {
      this.field('notation');
      this.field('hit_level');
      this.field('damage');
      this.ref('id');
    });

    frameDataJsons.forEach((frameDataJson, outerI) => {
      frameDataJson.moves.forEach((frameDataJsonMove, innerI) => {
        this.index.add(Object.assign({}, frameDataJsonMove, {
          character: frameDataJson.metadata.character,
          id: `${outerI}-${innerI}`,
        }));
      });
    });
  }

  search(term) {
    return this.index.search(term);
  }
}

module.exports = FrameDataSearchEngine;
