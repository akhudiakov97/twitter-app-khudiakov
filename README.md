# TwitterAppKhudiakov

Twitter Search App

## Development server

Run `yarn install`, then `ng serve` or `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## APIs

API end-points is provided at (https://bitbucket.org/adasiaholdings/anymind-recruiting-python-backend/src/master/).

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Points to improve

1. Add unit tests, unfortunately didn't have enough time last week
1. Update Back End documentation, I always got 10 tweets regardless of limit or offset query parameter, I had a look at source code, noticed that only offset query param is being used there, possible to add separate endpoint for fetching total amount of tweets by hashtag or user, current endpoints can be just used to fetch tweets with given offset (currently 10).
1. Fix CORS issue, for now I used (https://github.com/Rob--W/cors-anywhere)
