const Metalsmith = require('metalsmith');
const contentful = require('contentful-metalsmith');
const handlebars = require('handlebars');
const layouts = require('metalsmith-layouts');
const sass = require('metalsmith-sass');

handlebars.registerHelper('addOne', number => number + 1);
handlebars.registerHelper('homeSectionId', (baseString, number) => baseString + (number + 1));

Metalsmith(__dirname)
    .source('./src')
    .destination('./build')
    .use(contentful({
        'access_token': process.env.CONTENTFUL_API_KEY,
        'space_id': process.env.CONTENTFUL_SPACE_ID
    }))
    .use(layouts({
        directory: 'src/layouts',
        engine: 'pug'
    }))
    .use(sass({
        outputDir: 'css',
        outputStyle: 'expanded'
    }))
    .build(function (err) {
        if (err) console.log(err);
    });