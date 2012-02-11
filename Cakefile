{spawn, exec} = require 'child_process'


writeMessages = (childProcess) ->
  childProcess.stdout.on 'data', (data) ->
    process.stdout.write "#{data}"
  childProcess.stderr.on 'data', (data) ->
    process.stderr.write "! #{data}"

task 'test', 'Run all tests', ->
  writeMessages spawn './node_modules/mocha/bin/mocha'
