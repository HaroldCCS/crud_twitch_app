# crud_twitch_app


-------------------------------------------------------------
sql script:

create database if not exists crud_twitch;

create table if not exists crud_twitch.User (
	id int primary key auto_increment,
    nick_name varchar(50) null,
    name varchar(255) not null unique,
    last_game varchar(255) null,
    id_twitch varchar(50) null unique,
    url_image varchar(255) null,
    title varchar(255) null,
    is_live boolean null,
    description varchar(255) null
);
-----------------------------------------------------------------
La conexion a Mysql se hizo local, por lo que los endpoints de la carpeta, /crud_mysql se inhabilitan auntomaticamente
La conexion a Mongo es online, por lo que dichos endpoints funcionarian en cualquier lugar de despliegue.
Datos de conexion a Twitch en el .env
No se agrego authentication a ningun endpoint.

POSTMAN: https://drive.google.com/drive/folders/1s3AWx9H0jwiEnuD09vIUpGuFz9ye6GFs?usp=sharing
Adjunto esta pequeña documentación de los endpoint, (sera reemplazada por un swagger)

-----------------------------------------------------------------

endpoints crud_mysql


  GET: api/users/
  		
	sin agregar parametros.
			
	traera todos los Users o tambien demoninados Streamers



  GET: api/users/:id
	
   	Agregar id.
			 
   	Buscara el User y retornara su información



  POST: api/users/
	
       body:
			 
            name_twitch: string, obligatorio   //se debe poner el mismo nombre del usuario de Twitch.tv
						
            nickname:    string, opcional      //si le deseas poner un apodo al streamer, si no, se dejara el "name_twitch"
						
            description: string: opcional
						
       Buscara el User en la API Twitch guardara dicha información que coincida con el name_twitch.



  PUT: api/users/:id
	
       Agregar id.
			 
       body:
			 
            update_twitch_data: boolean, obligatorio   //si es true, reemplazara la información actual de mysql con la mas actual del API Twitch.
            
            nickname:     string, opcional

            last_game:    string, opcional

            url_image:    string, opcional

            title:        string, opcional

            is_live:      string, opcional

            description:  string: opcional
						
       Buscara el User y modificara la información del mismo.



  DELETE: api/users/:id
	
   	Agregar id.
       
   	Buscara el User y sera eliminado (no se agrego la inhabilitacion).
    
-----------------------------------------------------------------

endpoints crud_mongo


  GET: api/games/
       
   	sin agregar parametros.
       
   	traera todos los Games agregados.



  GET: api/games/:id
       
   	Agregar id.
       
   	Buscara el Game y retornara su información



  GET: api/games/top
       
   	sin agregar parametros.
       
   	Traera y mostrada los Games mas usados en Twitch



  POST: api/games/
       
   	body:
            
            id:          string, obligatorio  
            
            name:        string, obligatorio  
            
            description: string: opcional
            
            category:    string: opcional
            
            users:       number: opcional     //si no se envia, es buscara automaticamente la cantidad de personas que juegan este Game (busqueda por name)
       
   	Buscara el User en la API Twitch guardara dicha información que coincida con el name_twitch.
      
       
			 
   PUT: api/games/:id
       
   	Agregar id
       
   	body:
            
            name:        string, opcional  
            
            description: string: opcional
            
            category:    string: opcional
            
            users:       number: opcional
       
   	Buscara el User en la API Twitch guardara dicha información que coincida con el name_twitch.
             
       
			 
  DELETE: api/games/:id
       
   	Agregar id.
       
   	Buscara el Game y sera eliminado (no se agrego la inhabilitacion).

-----------------------------------------------------------------

endpoints queries

GET: api/queries/validatetoken
     
   	sin agregar parametros.
     
   	Nos retornara si la conexion con el API Twitch es activa o no.
     
