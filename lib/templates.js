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

module.exports = {
  help,
  notFound,
  hi,
};
