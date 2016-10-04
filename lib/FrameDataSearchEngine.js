const lunr = require('lunr');

function createFrameDataDocuments(frameDataJsons) {
  const dataDocuments = frameDataJsons.reduce((prev, current, dataJsonIndex) => {
    const { moves, metadata: { character } } = current;
    const frameDataDocumentsForCharacter = moves.map((move, moveIndex) => (Object.assign({
      character,
      id: `${dataJsonIndex}-${moveIndex}`,
    }, move)));
    return [
      ...prev,
      ...frameDataDocumentsForCharacter,
    ];
  }, []);

  return dataDocuments;
}

function createIndex(frameDataDocuments) {
  const index = lunr(function fieldNames() {
    this.field('notation');
    this.field('hit_level');
    this.field('damage');
    this.ref('id');
  });

  frameDataDocuments.forEach((frameDataDocument) => {
    index.add(frameDataDocument);
  });

  return index;
}

class FrameDataSearchEngine {
  constructor(...frameDataJsons) {
    this.frameDataDocuments = createFrameDataDocuments(frameDataJsons);
    this.index = createIndex(this.frameDataDocuments);
  }

  search(term) {
    return this.index.search(term);
  }
}

module.exports = FrameDataSearchEngine;
