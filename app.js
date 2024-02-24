'use strict';

const { program } = require('commander');
const fs = require('fs');

program
  .version('1.0.0')
  .arguments('<filePath>')
  .action((filePath) => {

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }
  
        convertMd(data)
      });
  });

program.parse(process.argv);

const convertMd = (data) => {

}
