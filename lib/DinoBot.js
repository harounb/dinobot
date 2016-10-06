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
    if (
      !options ||
      !options.templates ||
      !options.phrases ||
      typeof options.templates !== 'object' ||
      !Array.isArray(options.phrases)
    ) {
      throw new Error(
        'DinoBot needs a valid templates object and phrases array'
      );
    }

    this.templates = options.templates;
    this.phrases = options.phrases;
  }

  answer(query) {
    // Removes all @mentions, trims the ends and splits words into array
    const [command] = query.replace(/@\w+/g, '').trim().split(' ');
    return getTemplateFromCommand(command, this.templates)({
      phrase: pickPhraseAtRandom(this.phrases),
    });
  }
}

module.exports = DinoBot;
