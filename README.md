# [Stuart Frontend Challenge](http://jalbertsr.github.io/stuart-frontend-challenge) 

## Step 5 - Comments:

- I would add the option of an error toaster in the case the job can't be created.
- Using Google Maps API I would have drew the route from the pickup address to the drop off point.
- I think the `https://stuart-frontend-challenge.now.sh/geocode` endpoint should be a `GET` not a `POST` since it is used for requesting information, not creating it.

##### Notes:

- **Step 3 - Bonus point:** Please notice it is implemented, but your API is blazing fast! 😆 So the `Creating...` state button is difficult to see.
- **Tests:** I always try to write test driven code, I like to have a good % of test coverage with Unit tests, Snapshots and E2E tests; But I didn't want to use more time than what I should for the challenge so this is why this part is missing.  

### Installing

You need to have installed [npm](https://www.npmjs.com/)

Install all the dependencies.

```
npm install
```

Configuration of `.env` file:

You need to create an **.env** file in the project root with the following environment variables configured:  
You can take as example the `env.example`.    

  ```
  GOOGLE_MAPS_API_KEY=
  ```

Run the project:

```
npm start
```

You should be able to go to `localhost:8080`, which will mean our frontend is up and running!

### Running linters

The followed coding style convention is `airbnb-base`, you can find more info about it here: https://github.com/airbnb/javascript 

To run eslint check do:

```
npm run lint
```

### Deployment

Deployment is set for Github Pages at http://jalbertsr.github.io/stuart-frontend-challenge

```
npm run deploy
```


### Authors

**Joan Albert Segura Rueda** - [Github](https://github.com/jalbertsr) - [LinkedIn](https://www.linkedin.com/in/jalbertsr/)
