const help = ({ phrase = '' } = {}) => (
  `
    **${phrase}**
    You asked for help!
    Here are the commands I support:
    \`@DinoBot help\` list the commands I support
    \`@DinoBot hi\` make me say something
  `
);

const notFound = ({ phrase = '' } = {}) => (
  `
    **${phrase}**
    I didn't recognise that command.
    For help do \`@DinoBot help\`
    If you want me to say something do \`@DinoBot hi\`
  `
);

const hi = ({ phrase = '' } = {}) => (
  `
    **${phrase}**
  `
);

const framedata = ({ phrase = '', frameDataResults = [] } = {}) => (
  `
    **${phrase}**
    ${frameDataResults.length} Results found
    ${frameDataResults.map(result => (
      `
        character: ${result.document.character}
        game: ${result.document.game}
        notation: ${result.document.notation}
        game: ${result.document.game}
        hit level: ${result.document.hit_level}
        damage: ${result.document.damage}
        speed: ${result.document.speed}
        on block: ${result.document.on_block}
        on hit: ${result.document.on_hit}
        on counterhit: ${result.document.on_ch}
      `
    ))}
  `
);

module.exports = {
  help,
  notFound,
  hi,
  framedata,
};
