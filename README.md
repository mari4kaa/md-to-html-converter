# Md-to-html converter
This application is a console program that converts content of markdown files into HTML. The result of conversion can be outputted either to console or another file if its path is provided. 

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

## User guide
1. In the command line navigate to the folder where you want the program to be.
2. Run commands descriped [in the installation ](https://github.com/mari4kaa/md-to-html-converter/blob/main/README.md#L6)
3. Prepare your markdown file. Don't use nested or unclosed tags.
4. Run the program using commands from [here](https://github.com/mari4kaa/md-to-html-converter/blob/main/README.md#L17). Flag `--out` or `-o` is optional and lets you save the result to file without outputting it to console.

## Examples
### Output to console
![image](https://github.com/mari4kaa/md-to-html-converter/assets/103357823/4ac0dca2-11ed-4e86-97f7-0d2c68490061)

### Output to file
![image](https://github.com/mari4kaa/md-to-html-converter/assets/103357823/2be34aec-02b4-4cb5-8638-1fe1fa06ae0b)

![image](https://github.com/mari4kaa/md-to-html-converter/assets/103357823/3a4753f3-eb15-4af3-b8a6-199c58e6cd08)

## Revert commit
[Link](https://github.com/mari4kaa/md-to-html-converter/commit/fb395a99633d69288dc1470b86a2c59fdc2cf6de)
