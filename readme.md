# Nodepop App - Francisco Jose Molina
### KeepCoding 2017

# API v1 (/api/v1/)
## Auth
### Endpoints:

- /register/ (POST) - Permite al usuario registrarse recibiendo un objeto JSON con las propiedades "username","password" y "email". La contraseña será encriptada y no será devuelta junto con la respuesta.
- /authenticate/ (POST) - Permite al usuario autenticarse pasando un objeto JSON con las propiedades "username" y "password". En caso de éxito devolverá un objeto JSON con la propiedad "token" que contiene un JWT.

## Items
### Endpoints (Requieren autenticación):
- /items/ (GET) - Devuelve un listado paginado de objetos Item. Esta lista puede filtrarse por "name", "price" y "for_sale". Esto funcionará para concidencias exactas pero podemos utilizar los modificadores '__startswith', '__max' y '__min':
  - __startswith: Devolverá los objetos que empiecen por el valor dado.
  - __max: Devolverá los objetos que tengan valores inferiores al dado.
  - __min: Devolverá los objetos que tengan valores superiores al dado.
- /items (POST) - Permite crear un item nuevo. Admite un objeto JSON con las propiedades:
  - name (String) - Nombre del item
  - for_sale (Boolean) - Si el item está a la venta o no.
  - price (Number) - Precio.
  - image_path (String) - Ruta a la imagen del objeto.
  - tags (Lista de String) - Lista de tags asociados. Solo admite los tags 'work','lifestyle','motor' y 'mobile'
- /items/:id (GET) - Devuelve un Item que coincida con el _id dado.
- /tags/ (GET) - Devuelve un listado con los tags válidos.

# Settings
La aplicación se suministra con un módulo Node con settings configurables:
- ITEMS_PER_PAGE : Permite definir la paginación por defecto en la aplicación.
- JWT_SECRET : Permite definir la cadena secreto para generar el token JWT y validar su autenticidad.
- MONGO_URL : Permite definir la url del servidor MONGO DB