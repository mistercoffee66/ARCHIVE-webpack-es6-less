# webpack-es6-less
Minimal starter Webpack project for ES6 and Less for when you are not using React.

```git clone https://github.com/samelwitt/webpack-es6-less.git```

```npm install```

Develop
```npm start```

Build
```npm run build```

There's a ```./static``` directory for assets that aren't processed by Webpack for whatever reason, for example if you have images that aren't imported anywhere in javascript.

The script ```./static.js``` handles these along with any processing you want. Out of the box, it optimizes images and has a function to just copy anything else to the build folder.

Uncomment the line

```//getOthers('static/pdf/')```

to target whatever directories you want for this.
