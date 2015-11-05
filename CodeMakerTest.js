"use strict";

var wd = require("wd");
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

var desired = {
	"appium-version": "1.0",
	platformName: "Android",gg
	platformVersion: "4.3",
	deviceName: "android02",
	appPackage: "eu.donkeyguard",
	appActivity: "eu.donkeyguard.gui.activities.MainActivity"
};
var startDonkeyGuard = {
		appPackage:"eu.donkeyguard",
		appActivity:"eu.donkeyguard.gui.activities.MainActivity"
	}


var browser = new wd.promiseChainRemote("0.0.0.0", 4723);
var wdQuery = require('wd-query');
var $ = wdQuery(browser);

var tWaitFor = function  (type,selector,timeout) {
		var icheck=0;
		var hasElement=false;
		return browser.sleep(1)
		.then(function checkElement () {
			icheck++;
			console.log(type,icheck,"check check");
			if(type=="byId"){
				browser.hasElementById(selector,function  (err,has) {
					if(has)hasElement=true;
				})
			}
			if(type=="name"){
				browser.hasElementByName(selector,function  (err,has) {
					if(has)hasElement=true;
				})
			}
			if(type=="xpath"){
				browser.hasElementByXPath(selector,function  (err,has) {
					if(has)hasElement=true;
				})
			}
			if(type=="uiselector"){
				browser.waitForElementByAndroidUIAutomator("new UiSelector()."+selector,function  (err,has) {
					if(has)hasElement=true;
				})
			}
			
			if(!hasElement&&(icheck*1000)<timeout)return browser.sleep(1000).then(checkElement);
		})
}


browser.init(desired)
	.then(tWaitFor("name","heheha",20000))
	.then(function  () {
		console.log("nextSetp")
		//return browser.sleep(1000)
	})
	.then(function  () {
		console.log("End")
	})
