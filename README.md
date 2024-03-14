# Md-to-html converter
This application is a console program that converts content of markdown files into HTML and ANSI. The result of conversion can be outputted either to console or another file if its path is provided. User can choose between HTML and ANSI formats.

The program can process paragraphs and work with bold, italic, monospaced and preformatted text. It also checks whether the content of provided .md file is valid and whether paths to both input and output files have correct extensions and don't have problems with access. 

## Installation
1. Ensure that you have NodeJS installed.
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
node app.js <mdFilePath> [-o, --out <HTMLfilepath>] [-f, --format <format>]
```
`<mdFilePath>` - path to your markdown file.

`<HTMLfilepath>` - path to your output file: either `.html` or `.txt`.

`<format>` - output format: either `html` or `ansi`.

#### Examples
```shell
node app.js ./path/to/file.md --out ./path/to/output.html --format=html
```

```shell
node app.js ./path/to/file.md --out ./path/to/output.txt --format=ansi
```

## Running tests
In general mode:
```shell
npm test
```

In developer mode:
```shell
npm run test:dev
```

## User guide
1. In the command line navigate to the folder where you want the program to be.
2. Run commands described in the [Installation](#installation).
3. Prepare your markdown file. Don't use nested or unclosed tags.
4. Run the program using commands from [here](#running-the-program). Flag `--out` (or `-o`) is optional and lets you save the result to file without outputting it to console. Flag `--format` (or `-f`) is optional too and lets you choose whether present your output in HTML or ANSI format. By default output to the console is in ANSI format and to the file in HTML format.

## Conclusion after implementing tests
Implementing unit tests was quite interesting and useful at the same time. Obviously, while writing test cases I thought about many more possible ways of content placement in .md, which made me fix almost the half of my project logic. Another important thing is that writing tests made me reorganize my code, separate some modules and functions and build more optimal architecture.

The ***main conclusion*** I made after all that work is that the best way of buiding an application is firstly to think about all possible inputs and desired outputs, write at least some tests and only then build an actual application. If I was working accordingly to this plan from the beginning I wouldn't spend hours fixing bugs and completely changing architecture.

So, ***think about tests first and only then about other code***, otherwise you would waste your time writing code that is simply not enough to cover every test case and then waste even more time fixing it. 

## Revert commits
[Commit from lab1](https://github.com/mari4kaa/md-to-html-converter/commit/fb395a99633d69288dc1470b86a2c59fdc2cf6de)

[Commit from lab2](https://github.com/mari4kaa/md-to-html-converter/commit/96e42cf869641d5665b164898c9cec95e8005705)

## Commit with failed tests
[Link](https://github.com/mari4kaa/md-to-html-converter/commit/14aa1782ffdaa9b80201f99feeeeb1ab11b70384)

## Examples
### Output to console
![image](https://github.com/mari4kaa/md-to-html-converter/assets/103357823/e6791ade-c51b-42f5-ba25-558e12d84b1c)
![image](https://github.com/mari4kaa/md-to-html-converter/assets/103357823/6b12d0a3-5e6d-428a-b50a-2542a02da69b)

### Output to file
![image](https://github.com/mari4kaa/md-to-html-converter/assets/103357823/44f4d1e8-1dcd-4b8d-89f4-6241468a574e)

![image](https://github.com/mari4kaa/md-to-html-converter/assets/103357823/fce33bb6-a1dd-4a8a-8539-d945ebc3e8b3)
