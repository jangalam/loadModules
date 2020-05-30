# Readme

It is also in [Chinese](./自述.md).

## Introduction
*loadModules*  combines module loading and execution in one function call. The method serves for the standard ECMAScript modules and it is developed for the browser environment at this stage. `loadModules` at the present version supports importing modules as the pure functions. Neither importing a module for its side effect (affecting global context) or dynamic imports is covered.

##  Use 
The function loadModules combines  javascript modules and the execution codes into  one unified runner script to HTML body section.  loadModules handles all the modules in triforms through the interface: `loadModules(generalImports, rscList, runnerPath)`. Notice that unlike webpack's bundling several modules into one for I/O optimization, loadModules conforms to an explicit delaration of ECMAScript's asynchronous module importing for flexible deloyment. Users or contributors can welcome to go [in-depth](./in-depth.md). See the source code [moduleAccess.js](./src/moduleAccess.js).

From a sample webpage,  "moduleAccess.min.js" is linked in head tag of HTML document.

```html
<script src="./lib/moduleAccess.min.js"></script>
```

Then module runner codes are presented inside the next script tag. Note that either first argument importsText or the second argument rscCollection [] can be `""` /`null`. 

```javascript
const importsText = "import {upperCase} from './upperCase.js';"; 
const modName1 = 'shout';
const modPath1 = './shout.js';
const modName2 = 'amplified';
const modPath2 = './amplified.js';
const modRunnerPath = './modrunner.js';
loadModules(importsText,[{location:modPath1,externalName:modName1},{location:modPath2,externalName:modName2}],modRunnerPath);
```
## Samples
Check the example in `textChangesByloadModules.html` and linked js files in folder `./samples/` in this repository. View the demostration page from [github pages](https://jangalam.github.io).

## License
Author: *Hui Cheng*
[MIT license](./LICENSE.md) , 2020