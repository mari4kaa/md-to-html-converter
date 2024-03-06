# Md-to-html converter
This application is a console program that converts content of markdown files into HTML. The result of conversion can be outputted either in console or another file if its path is provided. 

The program can process paragraphs and work with bold, italic, monospaced and preformatted text. It also checks whether the content of provided .md file is valid and whether paths to both input and output files have correct extensions and no access problems. 

## Installation
1. Ensure thay you have NodeJS installed.
2. Clone the repository:
```shell
git clone https://github.com/mari4kaa/md-to-html-converter
```
3. Install dependencies:
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
![image](https://github.com/mari4kaa/md-to-html-converter/assets/103357823/20bbc572-22dc-45d9-8545-ccaecc3b5ace)

### Output to file
![image](https://github.com/mari4kaa/md-to-html-converter/assets/103357823/b2ff6a6d-6f6a-49c7-ac40-074b7425c1e6)

![image](https://github.com/mari4kaa/md-to-html-converter/assets/103357823/29dacc35-b8bb-42f8-956e-289e28f67957)

## Revert commit
[Link](https://github.com/mari4kaa/md-to-html-converter/commit/fb395a99633d69288dc1470b86a2c59fdc2cf6de)
