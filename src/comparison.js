#!/usr/bin/env node
import _ from 'lodash';

/*
const compareFiles = (data1, data2) => {
    // const keys = new Set([...Object.keys(data1), ...Object.keys(data2)]);

    const data1Keys = _.keys(data1);
    const data2Keys = _.keys(data2);
    const sortedKeys = _.sortBy(_.union(data1Keys, data2Keys));

    //const diff = Array.from(keys).sort().map((key) => {
    const diff = sortedKeys.map((key) => {
      if (!_.has(data1, key)) {
        return `  + ${key}: ${JSON.stringify(data2[key])}`;
      }
      if (!_.has(data2, key)) {
        return `  - ${key}: ${JSON.stringify(data1[key])}`;
      }
      if (data1[key] !== data2[key]) {
        return `  - ${key}: ${JSON.stringify(data1[key])}\n  + ${key}: ${JSON.stringify(data2[key])}`;
      }
      return `    ${key}: ${JSON.stringify(data1[key])}`;
    }).join('\n');
  
    return `{\n${diff}\n}`;
  };

  export default compareFiles;
  */
  const buildAST = (data1, data2) => {
    const data1Keys = _.keys(data1);
    const data2Keys = _.keys(data2);
    const sortedKeys = _.sortBy(_.union(data1Keys, data2Keys));
  
    const children = sortedKeys.map((key) => {
      if (!_.has(data1, key)) {
        return {
          type: 'added',
          key,
          value: data2[key],
        };
      }
      if (!_.has(data2, key)) {
        return {
          type: 'removed',
          key,
          value: data1[key],
        };
      } if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
        return {
          type: 'nested',
          key,
          children: buildAST(data1[key], data2[key]),
        };
      }
      if (_.isEqual(data1[key], data2[key])) {
        return {
          type: 'unchanged',
          key,
          value: data2[key],
        };
      }
      return {
        type: 'changed',
        key,
        value: data1[key],
        value2: data2[key],
      };
    });
    return children;
  };
  
  const compareFiles = (data1, data2) => ({
    type: 'root',
    children: buildAST(data1, data2),
  });

export default compareFiles;