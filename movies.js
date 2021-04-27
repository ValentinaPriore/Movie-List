
var MOVIES_JSONURL = "https://api.jsonbin.io/b/6085ed09f6655022c46bb5ea"
var MOVIES_JSON;
var rfunc

const UPDATEMOVIES_JSON = function(){
  let req = new XMLHttpRequest();

  req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
      console.log(req.responseText);
      location.reload();
    }
  };

  req.open("PUT", "https://api.jsonbin.io/v3/b/6085ed09f6655022c46bb5ea", true);
  req.setRequestHeader("Content-Type", "application/json");
  req.setRequestHeader("X-Master-Key", "$2b$10$tWlSlSHyA4pNs4yQFmxvm.OiriLtS7OXf06nZ40U66L4i5fceO2wC");
  req.send(JSON.stringify(MOVIES_JSON));
  
}

//

//GET JSON DATA

var getJSONData = function(url){
    var result = {};
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        return result;
    });
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(MOVIES_JSONURL).then(function(resultObj){
        if (resultObj.status === "ok"){
            MOVIES_JSON = resultObj.data;
            movie = resultObj.data 
            
            
            rfunc= function Random(){
              random = Math.floor(Math.random() * movie.length)
           
     
            
               document.getElementById("random").innerHTML = `<div class="card-body">
               <div class="card-header">       

               <h5  class="card-title"> <i class="em em-popcorn" aria-role="presentation" aria-label="POPCORN"></i> `+ movie[random].name +`</h5>
               <div class="tags"></div>
            
               <div class="form-check">
                 <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                 <label class="form-check-label" for="defaultCheck1">
                   Marcar como vista
                 </label>
               </div>
            </div>`
            
             }
            
             
            
            
            
            
            
            // PELICULAS NO VISTAS
            
            let movieBox = document.getElementById("movies")
            let contenido = " "
            let moviesUnseen = document.getElementById("seen")
            let contenido2 = " "
             
              for (let i = 0; i < movie.length; i++) {
                if(movie[i] != null){

                
                  if(movie[i].vista == false){
                  let boton =" "
    
                  for (let a = 0; a < movie[i].categorie.length; a++) {
                    boton += `<span class="btn btn-primary btn-sm">`+ movie[i].categorie[a] +`</span>`
                  }
    
                        
                    contenido += `<div class="card col-3">
                    <div class="card-body">
                    <div> <button class="btn btn-primary" onclick="removeMovie(`+i+`)"> X</button></div> 
                        <h5  class="card-title"> <i class="em em-popcorn" aria-role="presentation" aria-label="POPCORN"></i> `+ movie[i].name +`</h5>
                        <div class="tags">
                        `+ boton +`
                          
                        </div>
            
                        <div class="form-check">
                          <input onclick="movieVista(`+i+`)" class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                          <label class="form-check-label" for="defaultCheck1">
                            Marcar como vista
                          </label>
                        </div>
            
            
                    </div>
                  </div>`
    
    
                }

                else{
                  let boton =" "
    
                  for (let a = 0; a < movie[i].categorie.length; a++) {
                    boton += `<span class="btn btn-primary btn-sm">`+ movie[i].categorie[a] +`</span>`
                  }
    
                        
                    contenido2 += `<div class="card col-3">
                    <div class="card-body">
                        
            
                        <h5  class="card-title"> <i class="em em-popcorn" aria-role="presentation" aria-label="POPCORN"></i> `+ movie[i].name +`</h5>
                        <div class="tags">
                        `+ boton +`
                          
                        </div>
            
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                          <label class="form-check-label" for="defaultCheck1">
                            Marcar no como vista
                          </label>
                        </div>
            
            
                    </div>
                  </div>`
                
                }
  

             }
            }
           

            movieBox.innerHTML = contenido 
            moviesUnseen.innerHTML = contenido2
            

        }     
        
        

    });
});

function newMovie(){

  let newMovie = {}
  let newname = document.getElementById("movie_name").value
  let newcategorie = []

  if (document.getElementById("serie").checked == true) {
    newcategorie.push("Serie");
    
  }

  if (document.getElementById("pelicula").checked == true) {
    newcategorie.push("Película");
    
  }

  if (document.getElementById("comedia").checked == true) {
    newcategorie.push("Comedia");
    
  }

  if (document.getElementById("drama").checked == true) {
    newcategorie.push("Drama");
    
  }

  if (document.getElementById("musical").checked == true) {
    newcategorie.push("Musical");
    
  }

  if (document.getElementById("documental").checked == true) {
    newcategorie.push("Documental");
    
  }

  if (document.getElementById("romanticas").checked == true) {
    newcategorie.push("Romántica");
    
  }

  if (document.getElementById("superheroes").checked == true) {
    newcategorie.push("Superheroes");
    
  }

  if (document.getElementById("dibujitos").checked == true) {
    newcategorie.push("Dibujitos");
    
  }

  if (document.getElementById("anime").checked == true) {
    newcategorie.push("Animé");
    
  }



  if (document.getElementById("ciencia_ficcion").checked == true) {
    newcategorie.push("Ciencia Ficción");
    
  }

  newMovie = {
    "name": newname,
    "categorie": newcategorie,
    "vista":false
  }

  MOVIES_JSON.push(newMovie);
  // MOVIES_JSON[0].vista=true;
  UPDATEMOVIES_JSON();


}

function removeMovie(a){
  delete MOVIES_JSON[a];
  
  UPDATEMOVIES_JSON();
}

function movieVista(a){
  MOVIES_JSON[a].vista = true;
  UPDATEMOVIES_JSON();

}


