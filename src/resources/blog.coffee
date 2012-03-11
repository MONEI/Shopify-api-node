request = require 'request'

# ###Blog
# Clase para manejar el recurso Blog
# sobre un blog podemos hacer
#
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
    
  # Metodo _privado_ que se encarga de hacer las llamadas al server y devolver la respues en forma de callback
  # Tanto `path`como `method` son *obligatorios*. En mientras que `body` es opcional y solo sera requeriodo si la llamada
  # es de tipo _post_ o _put_
  __request__: (path, method, body, cb) ->

    # Tenemos body?
    if typeof body is 'function'
      cb = body
      body = null

    options =
      uri: "http://#{@shop}.myshopify.com/admin#{path}"
      method: method
    options.body = body if body?

    request options, ( err, response ,body) ->
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

  # Para una llamada de tipo de _GET_ solo necesitamos el PATH de llamada y la funcion de _callback_
  __get__: (path, cb) ->
    @__request__(path, 'GET', cb)

  # Si la llamada es de tipo _POST_ ademas del PATH tambien vamos a necesitar el cuerpo de la llamada
  # Este debe ser de tipo *Object*
  __post__: (path, body, cb) ->
    @__request__(path, 'POST', JSON.stringify(body), cb)

  # Hace llamadas de tipo _PUT_ para poder actualizar cualquier recurso, tanto `path` como `body` son
  # obligatorios en este metodo
  __update__: (path, body, cb) ->
    @__request__(path, 'PUT', JSON.stringify(body), cb)

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
      path += "?since_id=#{since}"

    @__get__ path, cb

  # Obtendra la cantidad total de blogs asignadas a esa tienda
  #
  #     cb = (err, count) ->
  #       throw err unless err?
  #       console.log count.count //-> Numero de blogs que contiene esa tienda
  count: (cb, path = '/blogs/count.json')->
    @__get__ path, cb

  # Dado un `id` de un blog este metodo devuelve toda la informacion asociada al blog.
  # Lanza un exception `missing id` si no se le pasa el _id_ del blog.
  #
  #     cb = (err, blog) ->
  #       throw err unless err?
  #       console.log blog.blog.id //-> Id del blog que se acaba de obtener
  get: (id, cb) ->
    throw new Error 'missing id' unless id?
    @__get__ "/blogs/#{id}.json", cb

  # Este metodo sera el encargado de crear un nuevo blog para ello necesita que se le pase el titulo
  # Si no se le pasa el titulo lanzara una exception `missing title`
  # El parametro `metas` es completamente opcional y en caso de existir consistara en un array de metafields que se agregaran al blog
  # La funcion de callback contien la respuesta del server que debe ser la informacion del nuevo blog creado
  #     
  #     cb = (err, response) ->
  #       throw err unless err?
  #       console.dir response // -> Objecto con todos los datos del nuevo blog creado
  #
  create: (title, metas, cb, path = '/blogs.json') ->
    throw new Error 'missing title' unless title?

    if typeof metas is 'function'
      cb = metas
      metas = null

    body =
      blog:
        title: title
    body.blog.metafields = metas if metas?

    @__post__ path, body, cb

  # Metodo generico para actualizar o el titulo o los metadatos de un blog.
  # Por lo que id del blog sera obligatorio asi como un campo a actualizar (titulo o metadatos). En caso de faltar alguno de 
  # estos dos sera lanzada una exception
  update: (id, field, cb) ->
    throw new Error 'missing params' if !id? or !field?
    
    body =
      blog:
        id: id
    if typeof field is 'string' then body.blog.title = field else body.blog.metafields = field

    @__update__ "/blogs/#{id}.json", body, cb


module.exports = Blog
