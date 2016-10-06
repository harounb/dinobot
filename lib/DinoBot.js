const FrameDataSearchEngine = require('./FrameDataSearchEngine');

function getTemplateFromCommand(command, templates) {
  const searchKey = command.toLowerCase();
  if (typeof searchKey !== 'string' || !templates[searchKey]) {
    return templates.notFound;
  }

  return templates[searchKey];
}

function pickPhraseAtRandom(phrases) {
  return phrases[Math.floor(Math.random() * phrases.length)];
}

class DinoBot {
  constructor(options) {
    const { templates, phrases, frameDataJsons } = options;

    if (
      !templates ||
      !phrases ||
      typeof templates !== 'object' ||
      !Array.isArray(phrases)
    ) {
      throw new Error(
        'DinoBot needs a valid templates object and phrases array'
      );
    }

    if (frameDataJsons) {
      if (!Array.isArray(frameDataJsons)) {
        throw new Error(
          'frameDataQueries in options needs to be an object'
        );
      }

      this.searchEngine = new FrameDataSearchEngine(...frameDataJsons);
    }

    this.templates = options.templates;
    this.phrases = options.phrases;
  }

  answer(query) {
    // Removes all @mentions, trims the ends and splits words into array
    const sanitisedQuery = query.replace(/@\w+/g, '').trim().split(' ');
    const [command, ...search] = sanitisedQuery;
    let frameDataResults;
    if (command === 'framedata') {
      frameDataResults = this.searchEngine.search(search.join(' ')).slice(0, 5);
    }

    const reply = getTemplateFromCommand(command, this.templates)({
      phrase: pickPhraseAtRandom(this.phrases),
      frameDataResults,
    });

    console.log(`replied: ${reply}`);

    return reply;
  }
}

module.exports = DinoBot;
