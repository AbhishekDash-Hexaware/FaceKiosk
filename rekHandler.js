var config = require('./config')
var request = require('request')
class recHnadler {

    constructor() {

    }

    recognizer(payload,callback) {
        // console.log(payload);

        // new Promise((reject, resolve) => {

        var options = {
            method: 'POST',
            url: config.Rekognition.Url + "query",
            body: {
                image: payload.myImage,
                gallery: "tempid_cto_org_dev"
            },
            json: true
        };
        request(options, function (error, response, body) {
            if (error || response.status == 500 || response.status == 404) {
                console.error("Error in calling Rekog Searchface API : " + error)
                if (error) {
                    callback(error, null);
                    // reject(error);
                } else {
                    console.error(response.status)
                    callback(response.status, null);
                    // reject(response.status)
                }
            }
            else {
                // console.debug("Rekognition Searchface API Response : " + JSON.stringify(body))
                callback(null, body)
                // resolve(body)
            }

        })
    }


    enroll (imagepath, subjectid, callback) {
        logger.debug("Indexing face of "+subjectid);
        options = {
            method: 'POST',
            url: config.Rekognition.Url+"train",
            body: {
                path: imagepath,
                empId: subjectid,
                gallery: process.env.gallery
            },
            json: true
        };
        request(options, function (error, response, body) {
            if (error || response.status == 500 || response.status == 404) {
                console.error("Error in calling Rekog Searchface API : " + error)
                if (error) {
                    callback(error, null);
                    // reject(error);
                } else {
                    console.error(response.status)
                    callback(response.status, null);
                    // reject(response.status)
                }
            }
            else {
                logger.debug("Rekognition Indexface API Response : " + JSON.stringify(response.body))
                callback(null, body)
            }

        })
    }
    

        // })
    
}

module.exports = recHnadler;