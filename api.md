
## Functions

Name | Description
------ | -----------
[loadModules(generalImports, rscList, runnerPath)] | The function loads ECMASCRIPT modules together with the modRunner having codes that consume modules, and then appends & executes the codes to HTML body section.
[getResource(location, toblob)] | A switcher function to get module either by ajaxData or fetchData. Fetch API doesn't work with local file path in google chrome and other chromium based browsers. To fetch a resource wether by fetchData or ajaxData for a none-firefox browser is determined by testing the resource's location against a regular expression `/^[^/:]*:/` to match the URL scheme(the protocol identifier before `://` in URL, such as `https` `ftp` and etc.).
[fetchData(location, toblob)] | fetch data and convert it into blob by fetch API
[ajaxData(location, toblob)] | fetch data and convert it into blob by XHR API
[blobsImport(rscCollection)] | blobsImport loads resource collection and returns the promise that either returns modImportStatements message or throws error message
[whichBrowser()] | whichBrowser looks up the glocal variable `window` and return the browser identifier

## Typedefs

Name | Description
------ | -----------
[ModRsc] | ModRsc describes the module resources


## loadModules(generalImports, rscList, runnerPath)

The function loads ECMASCRIPT modules together with the modRunner having codes that consume modules, and then appends & executes the codes to HTML body section.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| generalImports | `string` | general import statements that bind up ECMAScript modules in local file system. |
| rscList | `Array.<ModRsc>` | the collection of module resource information to generate blob DATAURLs when importing. //to do: change it to Map |
| runnerPath | `string` | the path of modRunner that consumes the imported modules |


## getResource(location, toblob)

A switcher function to get module either by ajaxData or fetchData. Fetch API doesn't work with local file path in google chrome and other chromium based browsers. To fetch a resource wether by fetchData or ajaxData for a none-firefox browser is determined by testing the resource's location against a regular expression `/^[^/:]*:/` to match the URL scheme(the protocol identifier before `://` in URL, such as `https` `ftp` and etc.).

**Kind**: global function  
**Fulfill**: `Blob`  
**Reject**: `Error`  

| Param | Type | Default |
| --- | --- | --- |
| location | `string` |  | 
| toblob | `boolean` | `true` | 


## fetchData(location, toblob)

fetch data and convert it into blob by fetch API

**Kind**: global function  
**Fulfill**: `Blob`  
**Reject**: `Error`  

| Param | Type |
| --- | --- |
| location | `string` | 
| toblob | `boolean` | 


## ajaxData(location, toblob)

fetch data and convert it into blob by XHR API

**Kind**: global function  
**Fulfill**: `Blob`  
**Reject**: `Error`  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| location | `string` |  |  |
| toblob | `boolean` | `true` | [toblob=true] |


## blobsImport(rscCollection)

blobsImport loads resource collection and returns the promise that either returns modImportStatements message or throws error message

**Kind**: global function  
**Fulfill**: `string` modImportStatements  
**Reject**: `Error` error message  

| Param | Type | Description |
| --- | --- | --- |
| rscCollection | `Map.<string, string>` | is a map of externalName-location pairs |


## whichBrowser()

whichBrowser looks up the glocal variable `window` and return the browser identifier

**Kind**: global function  
**Returns**: `string` - browser identifier  

## ModRsc

ModRsc describes the module resources

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| location | `string` | specify either a local file path or a URL to construct blob object |
| externalName | `string` | specify the name for the module being imported as |

<!-- LINKS -->

[ModRsc]:#modrsc
[loadModules(generalImports, rscList, runnerPath)]:#loadmodulesgeneralimports-rsclist-runnerpath
[getResource(location, toblob)]:#getresourcelocation-toblob
[fetchData(location, toblob)]:#fetchdatalocation-toblob
[ajaxData(location, toblob)]:#ajaxdatalocation-toblob
[blobsImport(rscCollection)]:#blobsimportrsccollection
[whichBrowser()]:#whichbrowser
