request = require 'request'

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
  constructor: (@key, @pass, @shop) ->
    throw new Error 'Blog missing parameters' if not pass? or not key? or not shop?
    
  # Metodo _privado_ que se encarga de hacer las llamadas al server
  __get__: (path, cb) ->
    request "http://#{@shop}.myshopify.com/admin#{path}", ( err, response ,body) ->
      status = parseInt response.statusCode
      # En caso de tener una respues distinta a 20x se concidera la peticion al servidor como erronea y se devolvera un `Error`
      # especificando la respuesta del servidor en el mensaje de respuesta
      if status >= 300 then err = new Error "Status code #{status}" else err = null
      unless err?
        process.nextTick ->
          cb err, JSON.parse body
      else
        process.nextTick ->
          cb err

  # Obtiene todos los blogs de una tienda en concreto.
  # es posible especificar un parametro especial `since` para obtener todos los blogs a partir de esa id
  #
  #     cb = (err, blogs) ->
  #       throw err unless err?
  #       console.dir blogs // Array con todos los blogs encontrados
  #
  # Como caso especial seria posible en el tercer parametro agregar un path nuevo para la peticion cosa que no deberia ser necesario
  all: (since, cb, path = '/blogs.json') ->
    
    if typeof since is 'function'
      cb = since
    else
      path += "?since_id=#{since}" if typeof since is 'number'

    @__get__ path, cb

  # Obtendra la cantidad total de blogs asignadas a esa tienda
  #
  #     cb = (err, count) ->
  #       throw err unless err?
  #       console.log count.count //-> Numero de blogs que contiene esa tienda
  count: (cb, path = '/blogs/count.json')->
    @__get__ path, cb



module.exports = Blog
