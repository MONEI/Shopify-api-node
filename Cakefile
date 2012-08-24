{spawn, exec} = require 'child_process'
sys = require 'util' #util might be outdated on your system

resources = ['blog']

runCommand = (name, args...) ->
  proc = spawn name, args
  proc.stderr.on 'data', (buffer) -> console.log buffer.toString()
  proc.stdout.on 'data', (buffer) -> console.log buffer.toString()
  proc.on 'exit', (status) -> process.exit(1) if status isnt 0

task 'project:watch', 'Watch source files and build JS', (options) ->
  runCommand './node_modules/.bin/coffee', '-o', 'lib/', '-wc', 'src/'
  runCommand './node_modules/.bin/coffee', '-o', 'lib/resources', '-wc', 'src/resources'

task 'test', 'Run all tests', ->
   runCommand './node_modules/mocha/bin/mocha', '-c'
   # runCommand './node_modules/mocha/bin/mocha', '-c', "test/resources/#{resource}.coffee" for resource in resources

task 'docs', 'Generate all Docs', ->
  runCommand './node_modules/paige/bin/paige',  './paige.config'
