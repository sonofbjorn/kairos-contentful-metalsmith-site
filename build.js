const Metalsmith = require('metalsmith');
const contentful = require('contentful-metalsmith');
const layouts = require('metalsmith-layouts');

Metalsmith(__dirname)
    .source('./src')
    .destination('./build')
    .ignore([
        '**/*.scss' // build with npm script
    ])
    .clean(true)
    .use(contentful({
        'access_token': process.env.CONTENTFUL_API_KEY,
        'space_id': process.env.CONTENTFUL_SPACE_ID
    }))
    .use(layouts({
        directory: 'src/layouts',
        engine: 'pug'
    }))
    .build(function (err) {
        if (err) console.log(err);
    });