#!/usr/bin/env node

import { readFileSync } from 'fs';
import path from 'path';
import parser from './src/parser.js';
import getDifferenceTree from './src/comparison.js';
import formatter from './src/formatter/index.js';

// eslint-disable-next-line no-undef
const getPath = (filepath) => path.resolve(process.cwd(), filepath);
const getFileFormat = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const path1 = getPath(filepath1);
  const path2 = getPath(filepath2);

  const data1 = readFileSync(filepath1, 'utf-8');
  const data2 = readFileSync(filepath2, 'utf-8');

  const parseObj1 = parser(data1, getFileFormat(path1));
  const parseObj2 = parser(data2, getFileFormat(path2));

  const result = getDifferenceTree(parseObj1, parseObj2);
  return formatter(result, format);
};

export default genDiff;
