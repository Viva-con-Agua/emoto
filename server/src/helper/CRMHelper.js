'use strict';

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/main.json')[env];

const SITE_KEY = process.env.EMOTO_CIVI_SITE_KEY || undefined;
const USER_KEY = process.env.EMOTO_CIVI_USER_KEY || undefined;
const NWT_GROUP_ID = config.civi_crm.nwt_group_id;
const CIVI_CRM_URL= config.civi_crm.api_endpoint +"/sites/all/modules/civicrm/extern/rest.php?entity=Contact&action=get&api_key="+USER_KEY+"&key="+SITE_KEY+"&json=";

let JSON_PAYLOAD = {
                      sequential:1,
                      return:"group",
                      email: null
                  };

const axios = require('axios');

class CRMHelper{
  static validateAccess(email){

    if(SITE_KEY === undefined || USER_KEY === undefined){
      return Promise.reject(new Error("civi crm credentials are not defined"));
    }

    JSON_PAYLOAD.email = email;
    return  axios.get(CIVI_CRM_URL+JSON.stringify(JSON_PAYLOAD))
    .then(function(r){
      if(r.data.count === 1){
        const groupStr = r.data.values[0].groups;
        const groups = groupStr.split(',').map(Number);
        if(groups.indexOf(NWT_GROUP_ID) >= 0){
          return Promise.resolve(true);
        }else{
          return Promise.resolve(false);
        }
      }else{
        return Promise.resolve(false);
      }
    });
  }
}

module.exports = CRMHelper;