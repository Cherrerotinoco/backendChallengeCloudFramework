## Getting Started

This API was made on [NextJS](https://nextjs.org/) framework. 

In this case only for backend purpose, using express under the hood and MongoDB as noSQL DB.


## Requirements for the project

To build a Rest-API to manage users and their contacts.

User needs: 
- To create an user.
- To update the contacts of a certain user.
- To get the contacts in common of 2 or more users.
- To get all the contacts from an user.

For this case we found a solution with 2 endpoints, *"/users"* and *"/users/contacts"*, later on we go in deep with this.

## Running the server

First, build the docker image:

```bash
docker build . -t nextjs-docker
```

Then run the container:

```bash
 docker run -p 3000:3000 nextjs-docker
```

Once the container is running in localhost:3000 you can start making request to the API.

## REST API

You can use this [postman collection](/backendChallenge.postman_collection) if you want.

- **To create an user: “/api/users”** (POST)
    
    ```json
    {
      "name": "John",
      "lastName": "Doe",
      "phone": "+34672690444"
    }
    ```
    
- **To save/update contacts by user given: “/api/users/contacts?userid=1”** (PUT)

    Create an user and save the ID given once created.

    ```json
    [
      {
          "contactName":"Mengano",
          "phone":"+34672690444"
      },
      {
          "contactName":"Fulano",
          "phone":"+34672690451"
      }
    ]
    ```
    
- **To get common contacts of 2 users given “/api/users/contacts?userid=1&userid=2”** (GET)
    
    
- **To get all the contacts by user given “/api/users/contacts?userid=1”** (GET)

## Flow chart
![ScreenShot](/flowchart.png)