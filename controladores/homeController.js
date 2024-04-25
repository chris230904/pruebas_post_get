module.exports.home = (request, response)=>{

    let nombre = "Chris";
    const paises = [
        {
        nombre:"Chile",
        nic: "cl"
        },
        {
        nombre:"Peru",
        nic: "pe"
        },
        {
        nombre:"Bolivia",
        nic: "bo"
        },
        {
        nombre:"Argentina",
        nic: "ar"
        }
];
    return response.render("home/home", {tituloPagina:"Inicio",nombre: nombre, paises: paises});
}