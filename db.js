require("dotenv").config();
const { MongoClient, ObjectId } = require("mongodb");



function conectar(){

   return MongoClient.connect(process.env.URL_MONGO);
    
}


function leerColores(){
    return new Promise(async (ok,ko) =>{
        const conexion = await conectar();

        try{
            let colores = await conexion.db("colores").collection("colores").find({}).toArray();
            //cuando devuelve los colores cierra la conexion de la base de datos
            conexion.close();
            //retorna colores si salio todo OK
            ok(colores.map( ({_id, r,g,b}) => {
                return {id : _id, r,g,b}
            }));

        }catch(error){
            ko({ error : "error en BBDD"});
        }

    });
}


/*
leerColores()
.then( x => console.log(x))
.catch( x => console.log(x))*/


function crearColor({r,g,b}){
 
    return new Promise(async (ok,ko) =>{
        
            try{

                const conexion = await conectar();

                let {insertedId} = await conexion.db("colores").collection("colores").insertOne({r,g,b});

                conexion.close();

                ok(insertedId);
                
                
    
            }catch(error){
                ko({ error : "error en BBDD"});
            }
    
    });

   
}

/*
crearColor({r : 23, g : 44 , b :43})
.then( x => console.log(x))
.catch( x => console.log(x)) */

function borrarColor({id}){

    return new Promise(async (ok,ko) =>{
    
        try{
            const conexion = await conectar();

            let {deletedCount} = await conexion.db("colores").collection("colores").deleteOne({ _id : new ObjectId(id)});

            conexion.close();

            ok(deletedCount);
          

        }catch(error){
            ko({ error : "error en BBDD"});
        }

    });
   
  
}

/*
borrarColor({ id :'664de6f63d3546720dc6809f'})
.then( x => console.log(x))
.catch( x => console.log(x))*/





module.exports = {leerColores, crearColor, borrarColor};