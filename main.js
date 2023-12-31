// 1.Obtener y mostrar usuarios utilizando la API de JSONPlaceholder

// En este ejercicio utilizaremos la API de https://jsonplaceholder.typicode.com/users. Leyendo su documentación, deberás hacer lo siguiente:

//Imprimir por consola la lista (array) de usuarios.

axios.get("https://jsonplaceholder.typicode.com/users")

.then((res) => console.log(res.data))

.catch((err) => console.error(err));

//Imprimir por consola solo el nombre de los usuarios.

// Crear una variable global llamada "users" y, al hacer la solicitud utilizando Axios, rellenarla con la respuesta de la API(el array). Este proceso debe realizarse fuera de cualquier función.

// Nota: Después de realizar el console.log de la variable "users", es normal que aparezca vacía debido a que JavaScript no es bloqueante y el console.log se ejecuta antes de que la variable sea llenada con la información de la solicitud.
// archivo JS
// variable global
// petición axios (aquí hago la petición y dentro relleno la variable creada anteriormente)

// Crear una función llamada "showUsers" que muestre por consola la variable global "users" que has creado.
// Crea un botón que cuando lo cliques ejecute la función que habías creado
// Ahora en vez de mostrar los usuarios por consola muestra el nombre de cada uno en el DOM (en el HTML).
// Recuerda que para estos ejercicios deberás utilizar Axios.

let users = [];
let listaOn = false;

function showUsers() {
  const list = document.getElementById("list");
  const miBoton = document.getElementById("miBoton");

  if (listaOn) {
    list.innerHTML = ""
    miBoton.textContent = "Mostrar Usuarios";
    listaOn = false;
  } else {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        users = res.data;
        console.log(users);
        list.innerHTML = ""
        users.forEach((element) => {
          console.log(element.name);
          list.innerHTML += `<li>${element.name}</li>`;
        });
        miBoton.textContent = "Ocultar Usuarios";
        listaOn = true;
      })
      .catch((err) => console.error(err));
  }
}

const miBoton = document.getElementById("miBoton");
miBoton.addEventListener("click", showUsers);

// Extras

// 1. Quiero un perrito, pero no se que raza escoger, ¿me ayudas?
// En este ejercicio utilizaremos la API de https://dog.ceo/dog-api/. Leyendo su documentación, deberás hacer lo siguiente:
// Extra ¿Y si ahora te pidiéramos que podamos poner otra raza en la url para que nos busque otras imágenes? Adapta las urls que ya tenías para que puedas pasarle argumentos.
// Imprimir por consola la lista de razas de todos los perros.
// Imprimir por consola una imagen random de una raza.
// Imprimir por consola todas las imágenes de una raza concreta.
// Recuerda que para estos ejercicios deberás utilizar Axios. Al haber conseguido que se imprima por consola, el siguiente paso será que se muestren en pantalla con las herramientas que nos ofrece el árbol DOM.
// Obtener la lista de razas de perros

axios.get('https://dog.ceo/api/breeds/list/all')
  .then(res => {
    const breeds = res.data.message;
    console.log('Lista de razas de perros:');
    console.log(Object.keys(breeds));
  })
  .catch(error => {
    console.error('Error al obtener la lista de razas:', error);
  });

const randomBreed = 'bulldog';
const perretes = document.getElementById('perretes');

axios.get(`https://dog.ceo/api/breed/${randomBreed}/images/random`)
  .then(res => {
    const randomImage = res.data.message;
    const imgElement = document.createElement('img');
    imgElement.src = randomImage;
    imgElement.alt = `Imagen de la raza ${randomBreed}`;
    perretes.appendChild(imgElement);
  })
  .catch(error => {
    console.error('Error al obtener la imagen aleatoria:', error);
  });


function mostrarImagenAleatoriaDeRaza() {
  const specificBreed = 'rottweiler'; //Cambiar de raza de perrete aquí!!
  const perretes = document.getElementById('perretes');

  axios.get(`https://dog.ceo/api/breed/${specificBreed}/images`)
    .then(res => {
      const breedImages = res.data.message;


      const imagenAleatoriaIndex = Math.floor(Math.random() * breedImages.length);

      const imgElement = document.createElement('img');
      imgElement.src = breedImages[imagenAleatoriaIndex];
      imgElement.alt = `Imagen de la raza ${specificBreed}`;
      perretes.innerHTML = '';
      perretes.appendChild(imgElement);
    })
    .catch(error => {
      console.error('Error al obtener las imágenes de la raza:', error);
    });
}

const actualizar = document.getElementById("actualizar");
actualizar.addEventListener("click", mostrarImagenAleatoriaDeRaza);

