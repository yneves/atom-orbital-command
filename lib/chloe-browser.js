'use babel';

import selenium from 'selenium-launcher';
import chromedriver from 'chromedriver';
import newTab from './new-tab';
const webdriver = require('webdriverio');


export default class ChloeBrowser {

  constructor() {
  }

  load(callback) {
    this.loadSelenium((error) => {
      if (error) {
        callback(error);
      } else {
        this.loadDriver((error, driver) => {
          if (error) {
            callback(error);
          } else if (driver) {
            callback(null, driver);
          }
        });
      }
    });
  }

  loadSelenium(callback) {
    this.stop();
    selenium((error, process) => {
      if (error) {
        callback(error);
      } else {
        this.selenium = process;
        callback(null, this.selenium);
      }
    });
  }

  loadDriver(callback) {

    this.driver = webdriver.remote({
      logLevel: 'silent',
      host: this.selenium.host,
      port: this.selenium.port,
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: [
            'start-maximized',
            'user-data-dir=/Users/yneves1/code/chrome'
          ]
        }
      }
    });

    this.driver.addCommand('blank', function() {
      return this.url('data:text/html;base64,PCFET0NUWVBFIGh0bWw+CjxodG1sPgogIDxoZWFkPjwvaGVhZD4KICA8Ym9keT48L2JvZHk+CjwvaHRtbD4K');
    });

    this.driver.addCommand('newTab', function async (url) {
      return newTab.call(this, url);
    });

    this.driver.init().blank().then(() => {
      setImmediate(callback, null, this.driver);
    }).catch((error) => {
      callback.call(error);
    });
  }

  stop() {
    if (this.driver) {
        this.driver.endAll().then(() => {
        if (this.selenium) {
          this.selenium.kill();
          this.selenium = undefined;
        }
      });
    } else if (this.selenium) {
      this.selenium.kill();
      this.selenium = undefined;
    }
  }
}
