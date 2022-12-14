# AtomSpace TypeScript API and Browser viewer.
This project offers two components:
* A way to interact with an OpenCog
  [AtomSpace](https://github.com/opencog/atomspace)
  using JavaScript/TypeScript.
* A minimal proof-of-concept AtomSpace viewer app.

This project was bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).

## Tech overview
The API talks to the AtomSpace through the
[CogServer](https://github.com/opencog/cogserver), via a WebSockets
socket.  It talks to the JSON shell provided by the CogServer.  The
CogServer also provides Scheme and Python shells, but the JSON shell
might be easiest for most web programmers.

The AtomSpace viewer is a React app. It should probably be combined
with the
[AtomSpace Explorer](https://github.com/opencog/atomspace-explorer).
The problem here is that the AtomSpace Explorer uses an obsolete API
to the AtomSpace: it should be replaced with the API here.

## Running

### Prerequisites
First, install `npm`. Then
```
npm install react-scripts
```

### Start the CogServer
Like so:
```
$ guile
> (use-modules (opencog) (opencog cogserver))
> (start-cogserver)
```

Verify that the cogserver is running: use a browser and open the default
URL [http://localhost:18080](http://localhost:18080) to view the
CogServer status page.

### Configure typescript
Edit `src/services/OpenCogAPI.ts` and verify that the URL reflects where
your CogServer JSON shell actually is. The default location is
`ws://localhost:18080/json`. If you are running the CogServer in a
container, you will need to change the address from `localhost` to the
container addr.

### Run this app
Run `npm start` from this directory (the project directory). This runs
the app in the development mode.  Open
[http://localhost:3000](http://localhost:3000) to view it in the
browser.  The page will reload if you make edits to project files.
You will also see lint errors in the console.

### Verify operation
Create some Atoms in the browser. Verify that they have appeared in the
AtomSpace. This can be done at the `guile` prompt:
```
guile> (cog-prt-atomspace)
... stuff should print...
guile> (cog-report-counts)
... summary report ...
```

Create some Atoms in the AtomSpace:
```
guile> (Evaluation (Predicate "mars") (List (Concept "martian") (Concept "rock")))
```
Pull them into the browser by clicking on "Get Atoms".

### Network Debug
If the app is connected to the CogServer, then it will appear in the
CogServer Status page. Just reload
[http://localhost:18080](http://localhost:18080) and look for a line
marked `json`.

## Other Available Scripts

In the project directory, you can run:

### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes
the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
