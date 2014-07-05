/* Copyright (c) 2014 Richard Rodger, MIT License */
"use strict";


var _     = require('underscore')



module.exports = function( options ) {
  var seneca = this
  var plugin   = 'web-access'


  options = seneca.util.deepextend({
    prefixlist:['/restricted']
  },options)
  

  // web interface
  seneca.act({role:'web', use:function(req,res,next){
    var prefixmap = ((req.seneca.context.access||{}).prefixmap||{})

    for( var i = 0; i < options.prefixlist.length; i++ ) {
      var prefix = options.prefixlist[i]

      if( 0 == req.url.indexOf(prefix) ) { 
        if( prefixmap[prefix] ) {
          return next();
        }

        res.writeHead(401)
        return res.end()
      }
    }

    return next();
  }})



  return {
    name: plugin
  }
}
