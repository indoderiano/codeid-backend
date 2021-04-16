"# codeid-backend" 

##Restful endpoints
<!-- --- -->
# URL
```
Server URL : https://indo-halim-codeid.herokuapp.com
```


### POST/user

Request body
{
    userName,
    accountNumber,
    emailAddress: <must be unique>,
    identityNumber
}
Request headers
{
    token: <string>
}

Response
{
    "result": {
        "n": 1,
        "opTime": {
            "ts": "6951585670167003137",
            "t": 29
        },
        "electionId": "7fffffff000000000000001d",
        "ok": 1,
        "$clusterTime": {
            "clusterTime": "6951585670167003137",
            "signature": {
                "hash": "TJLVB38FfYh74F3R8RMtkfAbUGc=",
                "keyId": "6918428359433125890"
            }
        },
        "operationTime": "6951585670167003137"
    },
    "connection": {
        "id": 1,
        "host": "cluster0-shard-00-02.oefsh.mongodb.net",
        "port": 27017
    },
    "ops": [
        {
            "userName": "test6",
            "accountNumber": 6,
            "emailAddress": "test6@mail.com",
            "identityNumber": 60,
            "_id": "6078fe55a0b38700156a0364"
        }
    ],
    "insertedCount": 1,
    "insertedId": "6078fe55a0b38700156a0364",
    "n": 1,
    "opTime": {
        "ts": "6951585670167003137",
        "t": 29
    },
    "electionId": "7fffffff000000000000001d",
    "ok": 1,
    "$clusterTime": {
        "clusterTime": "6951585670167003137",
        "signature": {
            "hash": "TJLVB38FfYh74F3R8RMtkfAbUGc=",
            "keyId": "6918428359433125890"
        }
    },
    "operationTime": "6951585670167003137"
}

Response
{
    "driver": true,
    "name": "MongoError",
    "index": 0,
    "code": 11000,
    "keyPattern": {
        "emailAddress": 1
    },
    "keyValue": {
        "emailAddress": "test5@mail.com"
    }
}



### GET/user

Response
[
    {
        "_id": "6077a6560cad287e57597dec",
        "userName": "indo",
        "accountNumber": "1",
        "emailAddress": "mde50526@gmail.com",
        "identityNumber": "10"
    },
    {
        "_id": "6077aebaa28b391cdc06f97a",
        "userName": "test",
        "accountNumber": "2",
        "emailAddress": "test@mail.com",
        "identityNumber": "20"
    },
    ...
]




### PUT/user/:id

Request Body
{
    userName,
    accountNumber,
    emailAddress: <must be unique>,
    identityNumber
}
Request headers
{
    token: <string>
}

Response
{
    "result": {
        "n": 1,
        "nModified": 1,
        "opTime": {
            "ts": "6951586829808173057",
            "t": 29
        },
        "electionId": "7fffffff000000000000001d",
        "ok": 1,
        "$clusterTime": {
            "clusterTime": "6951586829808173057",
            "signature": {
                "hash": "NFVrqu/Y7ug4N4Gz9YKUkZe9z9I=",
                "keyId": "6918428359433125890"
            }
        },
        "operationTime": "6951586829808173057"
    },
    "connection": {
        "id": 3,
        "host": "cluster0-shard-00-02.oefsh.mongodb.net",
        "port": 27017
    },
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1,
    "n": 1,
    "nModified": 1,
    "opTime": {
        "ts": "6951586829808173057",
        "t": 29
    },
    "electionId": "7fffffff000000000000001d",
    "ok": 1,
    "$clusterTime": {
        "clusterTime": "6951586829808173057",
        "signature": {
            "hash": "NFVrqu/Y7ug4N4Gz9YKUkZe9z9I=",
            "keyId": "6918428359433125890"
        }
    },
    "operationTime": "6951586829808173057"
}

Response
{
    "driver": true,
    "name": "MongoError",
    "index": 0,
    "code": 11000,
    "keyPattern": {
        "emailAddress": 1
    },
    "keyValue": {
        "emailAddress": "test5@mail.com"
    }
}




### DELETE/user/:id

Response
{
    "result": {
        "n": 1,
        "opTime": {
            "ts": "6951587370974052353",
            "t": 29
        },
        "electionId": "7fffffff000000000000001d",
        "ok": 1,
        "$clusterTime": {
            "clusterTime": "6951587370974052353",
            "signature": {
                "hash": "MSxedDWADUU+yje9ui21IcPua54=",
                "keyId": "6918428359433125890"
            }
        },
        "operationTime": "6951587370974052353"
    },
    "connection": {
        "id": 3,
        "host": "cluster0-shard-00-02.oefsh.mongodb.net",
        "port": 27017
    },
    "deletedCount": 1,
    "n": 1,
    "opTime": {
        "ts": "6951587370974052353",
        "t": 29
    },
    "electionId": "7fffffff000000000000001d",
    "ok": 1,
    "$clusterTime": {
        "clusterTime": "6951587370974052353",
        "signature": {
            "hash": "MSxedDWADUU+yje9ui21IcPua54=",
            "keyId": "6918428359433125890"
        }
    },
    "operationTime": "6951587370974052353"
}




### GET/user/identitynumber/:identityNumber

Response
[
    {
        "_id": "6078fe55a0b38700156a0364",
        "userName": "test6edited",
        "accountNumber": 6,
        "emailAddress": "test6@mail.com",
        "identityNumber": 60
    }
]



### GET/user/accountnumber/:accountNumber

Response
[
    {
        "_id": "6078fe55a0b38700156a0364",
        "userName": "test6edited",
        "accountNumber": 6,
        "emailAddress": "test6@mail.com",
        "identityNumber": 60
    }
]





### GET/user/token
Response
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZW1wbG95ZXIiLCJpYXQiOjE2MTg1NDcyNTB9.UrLm72fVSxtuIZLSTH6SXUAs32XBFLc10f57G-uSRyI"
}