const Metalsmith = require('metalsmith');
const contentful = require('contentful-metalsmith');
const debug = require('metalsmith-debug');
const layouts = require('metalsmith-layouts');
const permalinks  = require('metalsmith-permalinks');

Metalsmith(__dirname)
    .source('./src')
    .destination('./build')
    .ignore([
        '**/*.scss' // build with npm script
    ])
    .clean(true)
    .use(contentful({
        'access_token': process.env.CONTENTFUL_API_KEY,
        'space_id': process.env.CONTENTFUL_SPACE_ID,
        "common": {
            "pages": {
                "content_type": "page"
            }
        }
    }))
    .use(permalinks({
        relative: false
    }))
    .use(layouts({
        directory: 'src/layouts',
        engine: 'pug'
    }))
    .use(debug())
    .build(function (err) {
        if (err) console.log(err);
    });