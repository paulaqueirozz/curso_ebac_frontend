/*
* Copyright (c) 2015 Amazon.com. All rights reserved. 
*/
/*
* Copyright (c) 2020 Amazon.com. All rights reserved. 
*/
/**
 * This is the version of scriptInjector that will be used in obfuscated mode
 */
/**
 * In obfuscated mode, commons.js is directly concatenated with main.js, hence the below function is empty
 */
function injectCommonUtilityScriptToPhantom() {
	
}
/**
 * In obfuscated mode, all scripts that are supposed to be injected to phantom is directly concatenated
 * with main.js, hence the below function is empty
 */
function injectScriptsToPhantom() {
	
}

function injectScriptsToWebpage(webpage) {
    injectJsInToObject(webpage, "rasterizerProcessor.js");
}
