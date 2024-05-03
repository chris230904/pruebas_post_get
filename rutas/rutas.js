const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const homeController = require('../controladores/homeController');
const formulariosController = require('../controladores/formulariosController');

router.get("/", homeController.home);
router.get("/formularios", formulariosController.home); 
router.get("/formularios/normal", formulariosController.normal);
router.post("/formularios/normal", [
    body("nombre", "Ingrese un nombre válido")
    .trim()
    .notEmpty()
    .escape(),
    body("correo", "Ingrese un E-Mail válido")
    .trim()
    .isEmail()
    .normalizeEmail(),
    body("telefono", "Ingrese un teléfono válido")
    .trim()
    .notEmpty()
    .escape()], formulariosController.normal_post);

router.get("/formularios/upload", formulariosController.upload);
router.post("/formularios/upload", formulariosController.upload_post);
/*router.get("/nosotros", homeController.nosotros);
router.get("/parametros/:id/:slug", homeController.parametros);
router.get("/query-string", homeController.query_string);
*/
module.exports = router;