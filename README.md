# Car-Parking-API

This API is to be used by only a limited group of people to connect to a certain database which will store parking information for a specific area. 

Prior permission needs to be taken to access the hosted site. I've made sure that the API cannot be misused by any other person.

# Documentation

There are three major functional requests in this API. However, once you receive the hosted URL, it is advised to first test the workinng of the API for you in the browser.

> {{URL}}

#### Expected Output:
```
Parking Project Working
```

### Request 1: Get all booked parking spots 
> {{URL}}/allspots
#### Type: GET request
#### Function
To get the list of all booked parking spots
#### Expected Output:
A JSON Array that holds all users, basically it returns the entire database collection
```
[
    {
        "_id": "5be2b982461fcd00166e0ca3",
        "name": "Utkarsh Singh",
        "numberPlate": "MH-12-SQ-1234",
        "parkingNumber": 3,
        "__v": 0
    }
]
```

### Request 2: Post a booking from a user
> {{URL}}/newparking
#### Type: POST request
#### Function
To post a booking for a specific parking spot. The request will be **invalid** if the the parking spot requested to be booked is already occupied.

#### Expected Input
In the request body, an object:
```
{
  "name": "name-of-user",
  "numberPlate": "number-plate-of-car",      // ALL CAPS, NO SPACES
  "parkingNumber": parking-spot-number-between-1-to-50    //Should be a Number, Not a String
}
```

#### Expected Output
The same user who has registered will be returned in JSON OBJECT
An error will be returned if the parking spot is already reserved, or the input is in invalid format, or in case of other inernal server errors.

```
{
    "_id": "5be2b982461fcd00166e0ca3",
    "name": "Utkarsh Singh",
    "numberPlate": "MH-12-SQ-1234",
    "parkingNumber": 3,
    "__v": 0
}
```

### Request 3: Get info about a specific user
> {{URL}}/getuser/:id
#### Type: GET request
#### Function
To get info about the user whose car number plate is passed in **:id** of the URL.

#### Expected Output
A JSON Object is returned with certain additional information. 
The parkingTime which tells when did the user register in the parking spot.
The timePeriod which tells how many **seconds** have elapsed since the spot was occupied by the user.
```
{
    "name": "Utkarsh Singh",
    "numberPlate": "MH-12-SQ-1234",
    "parkingNumber": 3,
    "parkingTime": "2018-11-07T10:08:02.000Z",
    "timePeriod": 241
}
```

