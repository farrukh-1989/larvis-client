# React + TypeScript + Vite + Antd + Victory charts

Project was bootstraped with vite. You can start the application by running:

`npm run dev`

The application by default start on port 5173. That ofcourse can be changed.

before doing anything, one can run

`npm install`

to install the dependencies

The application structure is as follows

- src
  - assets
    - all logical external files including translation file
  - components
    - logical components "molecules"
    - test files
    - style sheets
  - features
    - component holders
  - hooks
    - custom hooks
  - routes
    - main pages
  - services
    - external data management
  - store
    - used for rtk query moslty
  - test
    - test helpers
  - types
  - utils
    - common functions

# Environment Setup

To configure your docker instance running, you can setup .env file with variables

`VITE_API_URL=127.0.0.1`

`VITE_API_PORT=5173`

By default, if not provided, the front end will proxy api requests to http://127.0.0.1:8080

## Testing

Application uses jest for unit testing. Not the fastest of options but the most versatile. Unfortunately i couldn;t unit test all function/components. i would've liked to use jest-canvas to validate histogram as well.

`npm run test`

## API store and RTK query

I decided to use RTk query due to its cache management and relatively easy setup. API configurations can be found under

`src/store/api.ts`

the api is broken into different sub-files and they are sewn togather. The API provides a graphQL like experience which makes it robust and easy to use.

### Acquisitions service

Requests acquisitions on histogram component load. Loads data as type `AcquisitionsResponse`

The type structure could've been better, but without openApi spec i couldn't generate automatic schemas which would've resulted in more coherent data structure. Methods exposed are:

`useGetAcquisitionsQuery`

### User service

Requests related to user management, getting users profile, getting list of users and modifying user profile.

`useGetUserQuery`

takes arguments as user_id and return username, password in response if logged in user requests their own profile.

`useLazyGetUserQuery`

Does the same as above, except the query is explicitly called.

`useUpdateUserMutation`

POST request to update user.

`useGetUsersQuery`

Get list of all users.

### Login service

Logs in the user with username and password

`useLoginMutation`

## Architecture

For simplicity, there are only two routes, login page and dashboard page. Login page takes username and password, attempts to login and upon successful request, stores the token in session storage. In case session storage isn't available there is a backup storage service.

Upon login, user is navigated to dashboard, where there are two features. A histogram, and users list. Histogram can be viewed as hourly: i.e. site acquisitons per hour throughout the data set, and day of week.

Users list shows all the users stored in database. User can attempt to update user profile, however it is prevented if user tries to update non logged in profile.

There is a signout button, pressing it will **clear session storage** and log user out of the application.

## Thoughts on the API

The api should've been prepended by '/api/ path. It makes development alot easier as developers can proxy one single path. Also it would've allowed to use the same web server for more than one type of requests.

1. Login API
   Protocol is to pass credentials as base64 string and passed in Authorization header if not using TLS. But of course, some authentication service is mostly always used such as keycloak or AWS cognito. Furthermore, the token when parsed didn't have any expiry. Which could be a vulnerability.
2. Users Service
   PATCH or PUT to update partial user data. POST is generally used to create a first time instance. So, when updating user it was a little weird to see a POST request.
   Username and password should never be returned as a response, it is insecure and a complete api design anti pattern.
3. Acquisitions Service
   API was straightforward. Though backend should take the brunt of formulating and presenting the data. Client side takes the data and renders it. Also, might have been benifitial if filtering was provided, i.e. between data range or something like that.

## Improvements

As always, there room for improvement. In this case many things could've been improved or implemented. Focus was on getting 3 api's to work, acquisitons, login and user management. i would've loved to try cats API but in the end lacked energy and time.

### Unit testing

Of course i talked about unit testing and how it means alot, it does. But some components i wished i had spent more time testing. The histogram charts, the login form were two key features i would've tested further. Also i would've preffered to have code coverage above 80%.

### CSS Styling

Maybe it doesnt work in my favour, but i wanted to use tailwind but decided to stick with antd. Layouts are a bit of a dealerschoice with antd and documentation while thorough, can be a pain to follow at times.

### Features

Having little to no experience with Histograms, i would've loved to present data in more formats. But again time constraints came into play and i did what i could. I wanted to use cats API as well.

### Production ready

Current setup may not work with production bundle as it always requires tweeking. But i do understand the process.

## Painpoints

First and foremost, setting up a client application to my liking. There were many configurations to do and i'd say i spent a day or two configuring jest, react, typescript, plugins, API. If i had a boilerplate ready, the process could've gone a lot smoother.

It was also somewhat a pain to get Docker running on my local machine. As its mostly a machine i use for gaming, i hadn't enabled virtualization and setting up Docker took a while. LINUX is definately the go to OS for Docker i reckon.

Lastly, design vs feature conundrum. It might not look like it bt some time was spent deciding what to focus on. In the end i wanted to get the APIs working and displaying data over looks. So please excuse my ugly child.
