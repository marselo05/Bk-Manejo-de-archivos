const fs = require('fs')

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo
    }
    save( obj ) { // Recibe un Objeto, lo guarda en el archivo, devuelve el id asignado.
        // consulto si el registro que paso existe
        if(obj!='')
        {
            if(fs.existsSync(this.archivo)) 
            {
                let productsFile = fs.readFileSync( this.archivo, 'utf-8');
                //
                if(productsFile!='')
                {
                    // LLamo los datos del archivo
                        let productos = JSON.parse(productsFile)
                    // Inicializo el id para cargar en el registro
                        let ultimoId = 1
                    // Si tengo mas de un registro Ordeno el arreglo y busco el último id: para luego sumarle +1
                        if( productos.length > 0) {
                            productos.sort( (a,b) => {
                                ultimoId = (a.id > b.id) ? a.id : b.id
                                return ultimoId; 
                            })
                        }
                    // Sumo 1 al id 
                            obj.id = (ultimoId + 1)
                    // Cargo el objeto con el nuevo registro
                            productos.push(obj)
                    // Reescribo con el nuevo registro
                        fs.writeFileSync( this.archivo, JSON.stringify( productos, null, 2), (err) => {
                            if (err) throw err;
                            else // No muestra la respuesta esperada 
                                console.log('Objeto guardado correctamente'+resp)
                        } );
                }
                else {
                    // Inicio el arreglo con id: 1
                        obj.id = 1
                    // Cargo el objeto con el nuevo registro
                        let newObj       = []
                        newObj.push(obj)
                    // escribo el primer registro 
                        fs.writeFileSync( this.archivo, JSON.stringify(newObj, null, 2), (err, resp) => {
                            if (err) throw err;
                            else // No muestra la respuesta esperada 
                                console.log('Objeto guardado correctamente'+resp)
                        })
                    console.log('Objeto guardado correctamente')
                }
            }    
        }
        else
            console.log("El registro a guardar no contiene valor")
        
    }
    getById( id ) { // Recibe un id y devuelve el objeto con ese id, o null si no está.
        
        if (id!='') {
            // LLamo a todo la lista de productos
                const productos = fs.readFileSync( this.archivo, 'utf-8');
            // Valido 
                if (productos!='' && productos.length>0){
                    // Parse
                        let producto    = JSON.parse(productos);
                    // Consulta si existe registro con el valor de id pasado
                        if ( producto.some( item => item.id == id) ) {
                            if ( producto.filter( item => item.id == id) )
                                console.log( producto.filter( item => item.id == id) )
                        }
                        else
                            console.log( `No se encontro registro con el número de ID: ${id}, intente con otro.` )
                }
                else
                    console.log( "No posee productos" )
        }
        else
            console.log( "Para consultar algún registro, necesita pasar un número de registro" )

    }
    getAll() { // Objet[] - Devuelve un array con los objetos presentes en el archivo 
        
        let mensaje = ''
        try {
            mensaje = fs.readFileSync(this.archivo, 'utf-8');
            console.log( mensaje )
            // return mensaje
        }
        catch (err) {
            mensaje =`Error: ${err}`
            // return mensaje
        }
        return mensaje
    }
    deleteById(id) { // Elimina del archivo el objeto con el id buscado

        if(id != "") {
            // LLamo a todo la lista de productos
                const productos = fs.readFileSync( this.archivo, 'utf-8');
            // valido    
            if (productos!='' && productos.length>0) {
                // Parse
                    let producto    = JSON.parse(productos);
                // Consulta si existe registro con el valor de id pasado
                if ( producto.some( item => item.id == id) ) {    
                    // let productos = JSON.parse(JSON.stringify(data))
                    // 
                    // console.log( producto.filter( item => item.id == id) )
                    if( producto.filter( producto => producto.id == id) )
                    {
                        // Eliminio el registro del arreglo que estoy utilizando
                            producto.splice((id-1), 1);
                        // Reescribo el archivo con los nuevos datos
                        fs.writeFileSync( this.archivo, JSON.stringify(producto, null, 2), (err, resp) => {
                            if (err) throw err;
                            else // No muestra la respuesta esperada 
                                console.log('Registro eliminado correctamente'+resp)
                        } );
                        console.log('Registro eliminado correctamente')
                    }
                }
                else
                    console.log( `No se encontro registro con el número de ID: ${id} para eliminar, intente con otro.` )
            }
            else
                console.log( "No posee productos" )
        }
        else
            console.log( "Para consultar algún registro, necesita pasar un número de registro" ) 
        // return respuesta;

    }
    async deleteAll() { // Elimina todos los objetes presentes en el archivo

        // LLamo a todo la lista de productos
        const productos = fs.readFileSync( this.archivo, 'utf-8');
        // valido    
        if (productos!='' && productos.length>0) {
            // Elimino todos los registros
            await fs.promises.writeFile( this.archivo, '', (err, res) => {
                if (err) {
                    console.error(`Error ${err}`)
                }
                else  {
                    console.error(`Eliminado total de registros`)
                }
            });
            console.log(`Eliminado total de registros`)

        }
        else
            console.log( `No se encontro registro con el número de ID: ${id} para eliminar, intente con otro.` )

    }
}

let controlador = new Contenedor('./productos.txt')
    // SAVE
        const info1 = {
            title: 'Escuadra',
            price: 123.5,
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
        }
        const info2 = {
            title: 'Calculadora',
            price: 234.56,
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
        }
        const info3 = {
            title: 'Globo Terráqueo',
            price: 345.67,
            thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
        }
    // SAVE PRODUCTOS
        controlador.save(info1);
        controlador.save(info2);
        controlador.save(info3);
    // SAVE   
/**
 * 
 * **/
    // controlador.getById(2);
    // controlador.deleteById(2);
    // controlador.deleteAll();
    controlador.getAll();