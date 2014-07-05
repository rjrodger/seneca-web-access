/* Copyright (c) 2014 Richard Rodger, MIT License */
"use strict";

// mocha project.test.js


var seneca  = require('seneca')

var assert  = require('assert')

var _      = require('underscore')


describe('web-access', function() {

  it('happy', function(fin) {
    var si = seneca().use('..').ready(function(){

      var mw = si.export('web')

      var call = {}

      function writeHead(code){
        call.code = code
      }


      block()

      function block() {
        mw(
          {
            url:       '/restricted/area',
          },
          {      
            writeHead: writeHead,
            end:       function() {
              assert(401,call.code)
              allow()
            }
          },
          function(){
            console.trace()
            assert.fail()
          })
      }


      function allow() {
        call = {}
        mw(
          {
            url:       '/happy/days',
          },
          {      
            writeHead: writeHead,
            end:       function() {
              assert.fail()
            }
          },
          function() {
            assert(!call.code)
            fin()
          })
      }

    })
  })
    

})

