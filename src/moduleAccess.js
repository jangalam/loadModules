/**
* @version 1.00
* @author CHENG, Hui
* @license MIT
* @todo unit tests by @see https://github.com/test-runner-js/test-runner;  build HTML with combined module with tree shake function
**/
/**
* The function loads ECMASCRIPT modules together with the modRunner having codes that consume modules, and then appends & executes the codes to HTML body section. 
* @async 
* @param {string} generalImports - general import statements that bind up ECMAScript modules in local file system.
* @param {Array.<ModRsc>} rscList - the collection of module resource information to generate blob DATAURLs when importing. //to do: change it to Map
* @param {string} runnerPath - the path of modRunner that consumes the imported modules
**/
async function loadModules(generalImports,rscList,runnerPath) {
	try{
		const modrunnerText = await getResource(runnerPath,false);
		if(modrunnerText.length === 0){throw new Error("Invalid module runner script!")}
		//if(generalImports.length === 0 && rscList.length === 0) {throw new Error("No module to be loaded!")}
		const rscArr = [];
		rscList.forEach(element => rscArr.push([element.externalName,element.location]));
		const rscCollection = new Map(rscArr);
		blobsImport(rscCollection).then(modImportStatements =>{
			if (typeof window === 'undefined'){/* todo: implementation in node.js */}
				else{
					const script = document.createElement("script");
					script.type = "module";
					script.textContent = generalImports + modImportStatements + modrunnerText + "//# sourceURL=" + runnerPath;
					document.body.appendChild(script);
				}
		});
	}catch(err){console.log(err)}
}

/*
For CORS issues, the server sends this header: Access-Control-Allow-Origin: *.@see https://stackoverflow.com/questions/25504851/how-to-enable-cors-on-firefox @see https://stackoverflow.com/questions/3136140/cors-not-working-on-chrome @see https://stackoverflow.com/questions/6060786/file-url-cross-domain-issue-in-chrome-unexpected @see https://stackoverflow.com/questions/4819060/allow-google-chrome-to-use-xmlhttprequest-to-load-a-url-from-a-local-file
As using fetch API to accesss local file by URL scheme "file" is not supported by google chrome, use ajaxData as the alternative.
**/
/**
* A switcher function to get module either by ajaxData or fetchData. Fetch API doesn't work with local file path in google chrome and other chromium based browsers. To fetch a resource wether by fetchData or ajaxData for a none-firefox browser is determined by testing the resource's location against a regular expression `/^[^/:]*:/` to match the URL scheme(the protocol identifier before `://` in URL, such as `https` `ftp` and etc.). 
* @param {string} location 
* @param {boolean} toblob
* @returns {Promise} 
* @fulfill {Blob} 
* @reject {Error}
**/
function getResource(location,toblob=true){
	//https://github.com/jsdoc2md/jsdoc-to-markdown/wiki/How-to-document-Promises-%28using-custom-tags%29
	  //cautiously retrieve resource using XMLHttpRequest   
	if(whichBrowser() !== "firefox" && !(/^[^/:]*:/.test(location))){
		return ajaxData(location,toblob);
	}else {return fetchData(location,toblob);}//URL scheme "file" is not supported when calling accessing local files by google chrome or chromium-based browsers
}
/**
* fetch data and convert it into blob by fetch API 
* @param {string} location
* @param {boolean} toblob
* @returns {Promise}
* @fulfill {Blob}
* @reject {Error}
**/
function fetchData(location,toblob){
	/** why fetch does not work with local file?  @see  https://stackoverflow.com/questions/50007055/fetch-request-to-local-file-not-working @see https://stackoverflow.com/questions/49971575/chrome-fetch-api-cannot-load-file-how-to-workaround @see https://stackoverflow.com/questions/48082907/createobjecturl-from-local-file-system-file-entry **/
		//const init = {method:'GET',headers:{'content-type':'text/javascript'},mode: 'cors',cache:'no-cache'};
		//use the above inits for cor fetching. Currenly use a simple request (Response.url) in the Fetch API, which is the same as XMLHttpRequest.responseURL
		return fetch(location/** new Request(location,init)**/).then(response => {
			if(!response.ok){
			Promise.reject(new Error(`HTTP error! status: ${response.status}`));
			//https://2ality.com/2016/03/promise-rejections-vs-exceptions.html
			//https://github.com/aaronksaunders/firebaseStorage2/issues/1
			} else{
					if(toblob === false) return response.text() 
					else return response.blob()
				}
		});//for promise chain of blob - .then(response => {URL.createObjectURL(response);});
		//understand CORS usage
		//https://fetch.spec.whatwg.org/#cors-protocol
		//https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
		//https://developer.mozilla.org/en-US/docs/Web/API/Response/type
		//getting cloud function via fetch() and then import the file from blob url 
		//http://qnimate.com/an-introduction-to-javascript-blobs-and-file-interface/

} 
/**
* fetch data and convert it into blob by XHR API
* @param {string} location
* @param {boolean} toblob [toblob=true]
* @returns {Promise}
* @fulfill {Blob}
* @reject {Error}
**/
function ajaxData (location, toblob = true){
	console.log("ajaxData is called");
	return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      const reader = new FileReader();
	  request.overrideMimeType("text/javascript");
      reader.onload = () => { resolve(toblob? new Blob([reader.result],{type: "application/x-javascript"}):reader.result) };//https://stackoverflow.com/questions/43743454/how-to-convert-a-file-to-a-blob-in-javascript-without-filereader
      request.open("GET", location);
      request.responseType = "blob";
	  //readAsDataURL readAsArrayBuffer
      request.onload = () => { 
	  reader[toblob ? "readAsArrayBuffer" : "readAsText"](request.response) };
      request.send();
	});
}

/**
* ModRsc describes the module resources
* @typedef ModRsc
* @property {string} location - specify either a local file path or a URL to construct blob object
* @property {string} externalName - specify the name for the module being imported as
**/


/**
* blobsImport loads resource collection and returns the promise that either returns modImportStatements message or throws error message 
* @param {Map.<string,string>} rscCollection is a map of externalName-location pairs
* @returns {Promise}
* @fulfill {string} modImportStatements 
* @reject {Error} error message
**/
function blobsImport(rscCollection){
	const importedNames = Array.from(rscCollection.keys());
	const reConformedName = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
	if (importedNames.some(name => !reConformedName.test(name))) 
		{return Promise.reject(new SyntaxError(`Illegal external name`))}
	const arr = (rscCollection.size > 0)? Array.from(rscCollection.values()).map(location => getResource(location)) : [];
	return new Promise((resolve,reject) => {
		Promise.all(arr).then(blobs =>{
			let modImportStatements ="";
			let index = 0;
			blobs.forEach(blob => {
				let modURL = URL.createObjectURL(blob);
				if(!modURL !== !importedNames[index]){//make sure modURL and modName not empty
					reject(new ReferenceError("Unresolved module - either missing modURL or missing externalName!"));	
				}else {modImportStatements += `import * as ${importedNames[index]} from "${modURL}";`}
				index +=1;
			});
			resolve(modImportStatements);
		}, err => reject(new InternalError("An error in retrieving module:"+ err)));	
	});	
}

/**
* whichBrowser looks up the glocal variable `window` and return the browser identifier
* @returns {string} browser identifier
**/
function whichBrowser(){
	return (function (agent) {
        switch (true) {
            case agent.indexOf("edge") > -1: return "edge";
            case agent.indexOf("edg") > -1: return "chromium based edge (dev or canary)";
            case agent.indexOf("opr") > -1 && !!window.opr: return "opera";
            case agent.indexOf("chrome") > -1 && !!window.chrome: return "chrome";
            case agent.indexOf("trident") > -1: return "ie";
            case agent.indexOf("firefox") > -1: return "firefox";
            case agent.indexOf("safari") > -1: return "safari";
            default: return "other";
        }
    })(window.navigator.userAgent.toLowerCase());	
}