const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
//para poder usar variables globales
require('dotenv').config();

//para csfr
const csrf = require('csurf');
//Configuracion de sesiones
app.use(
    session(
        {
            secret:process.env.SECRETO,
            resave: false,
            saveUninitialized:false,
            name:"secret-name",
            cookie:
            {expires:600000}
        }
    )
);

//habilitamos para formularios
app.use(express.urlencoded({ extended: true }));

//inicializar CSRF
app.use(csrf());

//configuración de handlebars
const {create} = require('express-handlebars');
const hbs = create({
        extname:".hbs",
        defaultLayout:"frontend",
        helpers:require('./vistas/helpers/handlebars'),
        partialsDir: ['vistas/componentes']
});

//se informar que el motor de plantillas es handlebars
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", "./vistas");

//se configuran las rutas estáticas
app.use( express.static(__dirname + "/assets") );

//inicializar flash
app.use(flash());
//variable locales
app.use( (request, response, next)=>{
    response.locals.ejemplo_local ="mi muñeca me habló";
    response.locals.csrfToken = request.csrfToken();
    response.locals.css = request.flash("css");
    response.locals.mensajes = request.flash("mensajes");

    next();
} );
  
  //Asignar el token CSRF a response.locals después de configurar Handlebars
  app.use((request, response, next) => {
    response.locals.csrfToken = request.csrfToken();
    next();
  });


//se registran las rutas
app.use("/", require('./rutas/rutas'));
//personalizar página de 404
app.use(function(request, response){
    response.status(404).render("error/404", {tituloPagina: "Página no encontrada"});
});


app.listen(process.env.PORT, ()=>{
    console.log('trabajando desde express');
});