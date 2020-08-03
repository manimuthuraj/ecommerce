define({ "api": [
  {
    "type": "get",
    "url": "/",
    "title": "list all categorie and products",
    "name": "Allcategorie",
    "group": "Categorie",
    "version": "0.0.0",
    "filename": "routes/categorie.js",
    "groupTitle": "Categorie"
  },
  {
    "type": "post",
    "url": "/add",
    "title": "add categorie",
    "name": "Allcategorie",
    "group": "Categorie",
    "version": "0.0.0",
    "filename": "routes/categorie.js",
    "groupTitle": "Categorie"
  },
  {
    "type": "put",
    "url": "/categorie/:id",
    "title": "update categorie",
    "name": "Allcategorie",
    "group": "Categorie",
    "version": "0.0.0",
    "filename": "routes/categorie.js",
    "groupTitle": "Categorie"
  },
  {
    "type": "delete",
    "url": "/categorie/:id",
    "title": "delete categorie",
    "name": "Allcategorie",
    "group": "Categorie",
    "version": "0.0.0",
    "filename": "routes/categorie.js",
    "groupTitle": "Categorie"
  },
  {
    "type": "get",
    "url": "/search",
    "title": "products",
    "name": "Allcategorie",
    "group": "Categorie",
    "version": "0.0.0",
    "filename": "routes/categorie.js",
    "groupTitle": "Categorie"
  },
  {
    "type": "get",
    "url": "/products/:id",
    "title": "list products based on categorie id",
    "name": "products",
    "group": "products",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "categorie",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "req",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "res",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/product.js",
    "groupTitle": "products"
  },
  {
    "type": "put",
    "url": "/products/:id",
    "title": "update products based on id",
    "name": "products",
    "group": "products",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "product",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "req",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "res",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/product.js",
    "groupTitle": "products"
  },
  {
    "type": "delete",
    "url": "/products/:id",
    "title": "list products based on categorie id",
    "name": "products",
    "group": "products",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "id",
            "optional": false,
            "field": "categorie",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "req",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "res",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/product.js",
    "groupTitle": "products"
  }
] });
