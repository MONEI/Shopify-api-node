{get} = require 'http'
# ###Blog
# Clase para manejar el recurso Blog
# sobre un blog podemos hacer
# * Un listado de todos los blogs
#
# * Recibir la cantidad de blogs
#
# * Recibir un único blog
#
# * Crear un nuevo blog
#
# * Modificar un blog existente
#
# * Eliminar un blog de la base de datos
#
class Blog

  # Son obligatorios pasar 3 parámetros
  #
  # * Key y pass para el proceso de autentificación
  #
  # * shop, el nombre de la tienda
  #
  # **Nunca** se debería de instanciar directamente esta clase ya que eso lo hará la clase del cliente
  constructor: (key, pass, shop) ->
    throw new Error 'Blog missing parameters' if not pass? or not key? or not shop?
    
    # Devuelve el objeto para la configuración de la llamada `get`
    @options = (->
      hostname: "http://#{key}:#{pass}@#{shop}.myshopify.com"
      path: "/admin")()

  all: (cb) ->

    get @options, (res) ->
      response = ''
      console.log res.headers
      res.setEncoding('utf8')
      res.on 'data', (data) ->
        response += data
      res.on 'end', ->
        console.log res
        error = new Error 'Request Error #{res.statusCode}' unless res.statusCode is 200
        process.nextTick ->
          cb(error, JSON.parse(response))




module.exports = Blog
