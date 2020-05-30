# Going into Depth

The function loadModules aggregates the ECMAScript module loading and execution in an unified manner, different from the existing freestyle in AMD, CommonJS, and UMD ecosystems, where messing up the script order may cause tedious module dependency problems.

`loadModules` function has the signature as belows:
`async function loadModules(generalImports,rscList,runnerPath)`
It accepts `generalImports`  that directly binds the modules by their file paths in standard ECMAScript import statements , for example, `import {a} from './modules/moduleA.js'`. It also accepts `rscCollection` object, which contains the resource information: `location` either URLs or file paths, and `externalName` as the namespace. URLs are preferred in DevOps projects where application-specific modules can be deployed remotely for edge computing. The loadModules function fetches the resources and transform them into temperary blob dataURLs executed on client side. All import statements are concatenated and combined with runner codes described in `runnerPath` into a module script element appended to the end of HTML body. 

The function loadModules is constructed  to explicitely present  the asynchronous process according to ECMAScript module specifications. The whole loading process includes three steps: constructing module records from files; instantiating module records into boxes (module instances) in memory with exports and imports point to the boxes;  evaluating/running  the code to fill in the boxes with the actual values. When module functionality was firstly added by CommonJS, all the three processing steps are done at once: CJS gets hands on  the main.js, pharse the file and get its dependent modules and keep going on till get the full module map. At the same time module instances are created and filled with values. Node.js fetches CJS modules by local file system, in which case waiting time is insignificant. For ECMAScript modules that are deployed in server-browser environment, file fetching through URL schemes is much slower. The process of  ES modules is being done in an asynchronous way: ES modules use static imort statements which allows buiding up the whole module map before parsing the file and running the codelines. The explicitness that loadModules conforms to is to achieve flexible module deloyment in different hosts of javascript engines. Apart from the  typical server-browser deployment, ES module supports are being added to the server side i.e. Node.js and headless browser contexts. 

Module loading also needs to address the CORS issue. Concerning web security over http communication, CORS(cross-origin resource sharing) mechanism is implemented to restrict XmlHttpRequest (abbr. as XHR) and Fetch API to consume server's resources initiated from the client-side scripts. Same-origin HTTP requests are always allowed while cross-origin HTTP requests are handled by HTTP headers responsed from server. Front-end programmers may in some occasions try developing and using modules  in local file system before tackling CORS. For more understanding, check details about  [ECMAScript module support in Node.js](https://2ality.com/2019/04/nodejs-esm-impl.html) and [CORS]( https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

### Supported Browsers for  Local File Access and Prerequisite Settings
- [x] firefox -- open the tab `about:config`, set `security.fileuri.strict_origin_policy` to `false`

- [x] chrome or chromium based -- launch the executable with the option`--allow-file-access-from-files`

## License
Author: *Hui Cheng*
[MIT license](./mitLicense.md) , 2020