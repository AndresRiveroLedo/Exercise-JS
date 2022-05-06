/*Callback: fue una de las primeras maneras que exitió para manejar los códigos asincronos.
1- requestHandler: es un manejador de peticion
    1- request alias req: es la información del usuario
    2- response alias res: es la información del servidor que envía al navegador.
*/
//En las siguientes funciones suponemos que nos conectamos a una base de datos.
//Veremos un ejemplo del callback hell o la piramide de la muerte.
function requestHandler(req, res){
    //cada vez que nos encontramos con una operacion asicrona añadimos una funcion en el segundo parametro
    User.findById(req.userId, function(err, user){
        if(err){
            res.send(err);
        }else{
            Task.findById(user.taskId, function(err, tasks){
                if(err){
                    return res.send(err);
                } else{
                    tasks.completed = true;
                    tasks.save(function(err){
                        if(err){
                            return res.send(err);
                        }else{
                            res.send('Task Completed')
                        }
                    })
                }
            });
        }
    });
}

//PROMESAS: Mejorando el ejemplo anterior pero también con operaciones asincronas.
/**Callback y promesas hacen lo mismo pero las promesas nos permite leer el codigo de mejor manera. */
function requestHandler(req, res){
    User.findById(req.userId)
        .then(function(user){//then: ponemos el proceso bueno. El dato que esperamos
            return Tasks.findById(user.TasksId) //operacion asincrona
        })
        .then(function (tasks){
            tasks.completed = true;
            return tasks.save(); //operacion asincrona
        })
        .then(function(){
            res.send('Tasks Completed');
        })
        .catch(function(err){//catch: capturar posible error
            res.send(err);
        });
}

//Async Await: Mejorando el ejemplo anterior con operaciones asincronas.
async function requestHandler(req, res){
    //los errores en async await los manejamos con el bloque try-catch
    try{
        const user = await User.findById(req.userId);
        const tasks = await Tasks.findById(user.tasksId);
        tasks.completed = true;
        await tasks.save(); //operacion asincrona
        res.send('tasks save'); 
    }
    catch(e){
        res.send(e);
    }

}