const { iconsDirectoryTo, iconsDirectoryFrom } = require("./_icons_directory");
const folderIcons = `${__dirname}${iconsDirectoryTo}`;
const deployComponentsIcons = `${__dirname}${iconsDirectoryFrom}`;
const fs = require("fs");
const path = require("path");
const XML_STR = '<?xml version="1.0" encoding="iso-8859-1"?>';
const DOC_TYPE_STR = `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">`;
const promisify = (f) => {
  return function (...args) {
    // возвращает функцию-обёртку
    return new Promise((resolve, reject) => {
      function callback(err, result) {
        // наш специальный колбэк для f
        if (err) {
          return reject(err);
        } else {
          resolve(result);
        }
      }

      args.push(callback); // добавляем колбэк в конец аргументов f

      f.call(this, ...args); // вызываем оригинальную функцию
    });
  };
};
const ucFirst = (str) => {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
};
const readDir = promisify((...props) => fs.readdir(...props));
const readFile = promisify((...props) => fs.readFile(...props));
const writeFile = promisify((...props) => fs.writeFile(...props));
const npm = require("npm");

async function createIcons() {
  const files = await readDir(folderIcons);
  for (const file of files) {
    const extname = path.extname(file);
    const expFromExtname = new RegExp(extname, "gi");
    const fileName = file.replace(expFromExtname, "");

    if (extname.toLowerCase() !== ".svg") {
      continue;
    }

    const bufferFileContent = await readFile(`${folderIcons}/${file}`);
    let fileContent = bufferFileContent
    .toString()
    .replace(/<!--(\n|\s)*(\s|\S)*(\s\n)*-->/gi, '')
    .replace(XML_STR, '')
    .replace(DOC_TYPE_STR, '')
    .replace(/style="[^"]+"/gi, '')
    .replace(/xml:space="[^"]+"/, '')
    .replace(/xmlns="[^"]+"/gi, '')
    .replace(/xmlns:xlink="[^"]+"/gi, '');
    const expFromProps = /[a-z]+-[a-z]+="/gi;
    const fileContentAllMathData = fileContent.matchAll(expFromProps);

    for (const matchData of fileContentAllMathData) {
      const currentText = matchData[0];
      const currentTextArr = currentText.split("-");
      const resultPropName = currentTextArr.reduce((prev, current) => {
        if (prev === "") {
          return current;
        }

        return `${prev}${ucFirst(current)}`;
      }, "");
      fileContent = fileContent.replace(currentText, ` ${resultPropName}`);
    }

    const oldPath = `${fileName}.tsx`;
    await writeFile(
      `${deployComponentsIcons}/${oldPath}`,
      `
        import React, { FC } from 'react';
        
        export const IconComponent: FC<{ className?: string; }> = ({ className }) => (
            <span className={className}>
              ${fileContent}
            </span>
          );
      `
    );
  }
  npm.load(() => npm.run("format"));
  return "Успешная генерация иконок!";
}

createIcons().then(console.log).catch(console.log);
