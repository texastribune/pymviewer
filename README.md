# The Pymviewer

A single-page site for testing [Pym.js](http://blog.apps.npr.org/pym.js/) embeds. Built using the Texas Tribune [News Apps Graphic Kit](https://github.com/texastribune/newsapps-graphic-kit).

## Setup

First, install the dependencies.

```sh
npm install
```

## Usage

During development, you can serve the page locally.

```sh
npm run serve
```

To build the production version, run the build command. It can then be found in the `dist` folder.

```sh
npm run build
```

All of the content placed in `dist` will be gzipped, and will only work if push it somewhere that can serve gzipped files. If you would rather this not happen, you can go into the `gulpfile.babel.js` file and comment out all the gzip tools. (This will be better soon!) Then run `npm run build` again.

```js
gulp.task('styles', () => {
  return gulp.src('app/**/*.scss')
    .pipe($.sass({
      precision: 10,
      onError: console.error.bind(console, 'Sass error: ')
    }))
    .pipe($.autoprefixer(['last 2 versions', 'IE 9', 'IE 8']))
    .pipe(gulp.dest('.tmp'))
    .pipe(stream({match: '**/*.css'}))
    .pipe($.if('*.css', $.csso()))
    // .pipe($.gzip({append: false}))
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'styles'}));
});
```

## Connect and deploy to S3

The default method of publication is via Amazon S3 and [`awscli`](https://aws.amazon.com/cli/).

To use the commands to deploy your project to Amazon S3, you'll need to add a [profile newsapps] to ~/.aws/config. It should look something like this:

```
[profile newsapps]
aws_access_key_id=YOUR_UNIQUE_ID
aws_secret_access_key=YOUR_SECRET_ACCESS_KEY
```

The project will deploy to the bucket and slug provided in `package.json`. Change those from our locations to push to your own bucket!

Run this command to deploy.

```
npm run deploy
```

You don't **have** to use this &mdash; the files `npm run build` compiles in `dist` can be moved anywhere that serves files.
