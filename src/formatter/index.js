import makeStylishDiff from './stylish.js';
import makePlain from './plain.js';
import json from './json.js';

const formatter = (tree, format) => {
  switch (format) {
    case 'stylish':
      return makeStylishDiff(tree);
    case 'plain':
      return makePlain(tree);
    case 'json':
      return json(tree);
    default:
      throw new Error(`Error: ${format} - this format is not supported. Available formats: stylish, plain, json`);
  }
};

export default formatter;
