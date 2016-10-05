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
    this.field('character');
    this.ref('id');
  });

  frameDataDocuments.forEach((frameDataDocument) => {
    index.add(frameDataDocument);
  });

  return index;
}

function getDocumentFromRef(ref, documents) {
  return (documents.filter(document => (document.id === ref)) || [])[0];
}

class FrameDataSearchEngine {
  constructor(...frameDataJsons) {
    this.frameDataDocuments = createFrameDataDocuments(frameDataJsons);
    this.index = createIndex(this.frameDataDocuments);
  }

  search(term) {
    return this.index.search(term).map(result => (Object.assign({},
      result,
      {
        document: getDocumentFromRef(result.ref, this.frameDataDocuments),
      }
    )));
  }
}

module.exports = FrameDataSearchEngine;
