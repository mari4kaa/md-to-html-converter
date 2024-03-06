# Md-to-html converter
This application is a console program that converts content of markdown files into HTML. The result of conversion can be outputted either in console or another file if its path is provided. 

The program can process paragraphs and work with bold, italic, monospaced and preformatted text. It also checks whether the content of provided .md file is valid and whether pathes to both input and output files have correct extensions and no access problems. 

## Installation
1. Ensure thay you have NodeJS installed.
2. Clone the repository.
```shell
git clone https://github.com/mari4kaa/md-to-html-converter
```
3. Install dependencies
```shell
npm install
```

## Running the program
Run this command:
```shell
node app.js <mdFilePath> [-o, --out <HTMLfilepath>]
```
`<mdFilePath>` - path to your markdown file.

`<HTMLfilepath>` - path to your output file.

## Examples
### Output to console
![screensot](assets\cli.png)
### Output to file
![screensot](assets\cli-to-file.png)
![screenshot](assets\result-in-file.png)

## Revert commit
[Link](https://github.com/mari4kaa/md-to-html-converter/commit/fb395a99633d69288dc1470b86a2c59fdc2cf6de)