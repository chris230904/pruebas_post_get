module.exports.home = (request, response)=>{
    response.send("Hola desde el controlador");
};

module.exports.nosotros = (request, response)=>{
    response.json({mensaje: "Holaaaaa"});
};

module.exports.parametros = (request, response)=>{
    //desestructuracion 
    const {id,slug} = request.params;
    response.send("id="+id+" | slugs="+slug);
};

module.exports.query_string = (request, response)=>{
    const {id,slug} = request.query;
    response.send("id="+id+" | slugs="+slug);
};