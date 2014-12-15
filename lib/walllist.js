var fs   = require('fs')
  , util = require('util');

function produce(cmd) {
    
    // determing output and open output stream for writing
    var out = process.stdout;
    if (cmd.out) {
        out = fs.createWriteStream(cmd.out, {"encoding": "utf-8"});
    }
    
    // produce trailer
    out.write('<?xml version="1.0" ?>\n');
    out.write('<background>\n');
    out.write(util.format('<!-- produced by mk-gnome-back-slidewhow - listing %s different images -->\n', cmd._.length));
    
    var start = new Date();
    out.write(util.format('  <starttime><year>%s</year><month>%s</month><day>%s</day><hour>00</hour><minute>00</minute><second>00</second></starttime>', start.getFullYear(), start.getMonth() + 1, start.getDate()));
    
    // loop through all elements to produce list (wrap around to last for transition on last
    var prev;
    cmd._.forEach(function(item){
        if (prev) {
            //out.write(util.format('<!-- transition from %s to %s -->\n', prev, item));
            out.write(
                util.format('  <transition><duration>%s</duration><from>%s</from><to>%s</to></transition>\n'
                    , cmd.trans, prev, item)
            );
        }
        out.write(
            util.format('  <static><duration>%s</duration><file>%s</file></static>\n', cmd.show, item)
        );
        prev = item;
    });
    out.write(
        util.format('  <transition><duration>%s</duration><from>%s</from><to>%s</to></transition>\n'
            , cmd.trans, prev, cmd._[0])
    );
    
    // add a comment to explain about the gnome-tweak-tool
    out.write('<!-- add this file into the gnome settings through a tool like gnome-tweak-tool section "Desktop" > "Background" -->\n');
    // close up
    out.write('</background>');
    if (out !== process.stdout) {
        out.end();
    }
}

module.exports = function(gopts) {
    return {
        produce: produce
    }
}
module.exports.produce = produce;