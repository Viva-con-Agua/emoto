'use strict';

const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');

// how the identity provider can be reached from the users browser
var server = 'http://your.ip.address:3000';
// how the identity provider can be reached from this server - could be a docker instance name
var serverInternal = 'http://localhost:3000';
// how this service is reachable from the users browser
var callbackServer = 'http://localhost/emoto';

// oauth 2 configuration for the passport strategy
var oauth2_config = {
    tokenURL: serverInternal + '/oauth2/token',
    authorizationURL: server + '/oauth2/dialog/authorize',
    // insert client id and secret as created in task 1
    clientID: 'emoto',
    clientSecret: 'client-secret-as-generated',
    callbackURL: callbackServer + '/identify/drops'
};

class OAuth2Controller{

  static init(){
    
  }

}

module.exports = OAuth2Controller;