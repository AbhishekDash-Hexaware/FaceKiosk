import requests 
import json
import sys

class AwsRekognizer:

    def __init__(self):
        print ("initializing Aws rekognizer")

    def recognize(self,imagedata):

        url = "https://t4l1or1me8.execute-api.us-east-1.amazonaws.com/v1/query"

        headers = {
            'Content-Type': "application/json",
            'cache-control': "no-cache"
            }

        try:
            
            response = requests.request("POST", url, data=json.dumps({"gallery":"testcollection","image":imagedata}), headers=headers)
        
        except requests.exceptions.RequestException as e:
            
            print("ERROR in making call to aws rekognition engine",e)
            sys.exit(1)
        
        else:

            if(response.status_code != 200):
                # print(json.loads(response.text))
                return(dict(json.loads(response.text)))
            else:
                # print(json.loads(response.text)['results'])
                # print(response.status_code)
                return(json.loads(response.text)['results'])
        