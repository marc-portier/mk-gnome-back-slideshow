var argv = require('yargs')
    .usage('Generate a gnome-background-slideshow-config xml for the listed files.\nUsage: $0 img1 img2 [more_imgs...]')
    .example('$0 ~/Pictures/*.jpg > /tmp/wallslist.xml', 'Generate the output to stdout and redirect it.')
    .describe('s', 'The time to show each image, in seconds')
    .alias('s', 'show')
    .default('s', 895)
    .describe('t', 'The time to transition from one image to another, in seconds')
    .default('t', 5)
    .alias('t', 'trans')
    .describe('o', 'The location of the xml file to write, defaults to stdout')
    .alias('o', 'out')
    .demand(2)
    .argv;
    
var walllist=require('./lib/walllist');

walllist.produce(argv);