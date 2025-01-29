/*
* Copyright (c) 2015 Amazon.com. All rights reserved. 
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
	injectJsInToObject(webpage, "coreprocessor.js");
	//Mathjax Script will injected only when mathml is present.
  //injectJsInToObject(webpage, "MathJax.js");
}

/**
 * This function will inject mathjax script into webpage
 * @param webpage webpage object to inject script.
 */
function injectMathJaxScriptsToWebpage(webpage)
{
  injectJsInToObject(webpage, 'MathJax.js');
}
