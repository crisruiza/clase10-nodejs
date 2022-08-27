// Variables

const txtPelicula = document.getElementById("txtPelicula");
const tblPeliculas = document.getElementById("tblPeliculas");

// si hay algo en el local storage, el prse convierte el JSON de string a array de JS, sino empieza con el array vacío
let peliculas = localStorage.getItem("peliculas")
  ? JSON.parse(localStorage.getItem("peliculas"))
  : [];

// Después de checar si hay películas o no llamamos a esta función para que ponga si hay películas o no
mostrarPeliculas();

function guardar() {
  // Guardo en una constante el valor del input pelicula
  const pelicula = txtPelicula.value;
  // Agregamos la pelicula al array
  peliculas.push(pelicula);
  actualizarStorage();
  mostrarPeliculas();
}

function actualizarStorage() {
  // Pone en el local storage el array de peliculas, convertido a un string.
  localStorage.setItem("peliculas", JSON.stringify(peliculas));
  mostrarPeliculas();
}

function mostrarPeliculas() {
  if (peliculas.length === 0) {
    // .innerHTML agrega cosas al HTML a partir de un elemento
    tblPeliculas.innerHTML = `<tr class="text-center font-weight-bold">
    <td colspan="2">NO HAY REGISTROS</td>`;
  } else {
    // Esto es para que no se repitan cada vez, sino que muestre 1 vez todo el array.
    tblPeliculas.innerHTML = "";
    // Iteramos cada elemento del array
    for (const pelicula of peliculas) {
      // creamos una const que cree un tr tag, y otra que cree un td tag
      const tr = document.createElement("tr");
      const tdPelicula = document.createElement("td");
      // Asignarle texto a el td que creamos
      tdPelicula.innerText = pelicula;
      // Al tr que cree creale un "hijo" que va  a ser el tdPelicula y luego eso se lo agrego a la tabla
      tr.appendChild(tdPelicula);
      tblPeliculas.appendChild(tr);
      // Cree las constantes para la siguiente columna, y los botones de editar y eliminar
      const tdAcciones = document.createElement("td");
      const btnEliminar = document.createElement("button");
      const btnEditar = document.createElement("button");
      // Ponemos el texto adentro de los botones
      btnEliminar.innerText = "Eliminar";
      btnEditar.innerText = "Editar";
      //Agregamos clases CSS
      btnEliminar.classList.add("btn", "btn-danger", "mr-2");
      btnEditar.classList.add("btn", "btn-warning");
      // Le asignamos la función eliminar y editar a los botones.
      btnEliminar.onclick = () => eliminar(pelicula);
      btnEditar.onclick = () => editar(pelicula);
      // A tdAcciones le creamos un hijo (botón eliminar y editar), y después a tr le agregamos tdAcciones
      tdAcciones.appendChild(btnEliminar);
      tdAcciones.appendChild(btnEditar);
      tr.appendChild(tdAcciones);
    }
  }
}

function eliminar(pelicula) {
  console.log("entrar a eliminar");
  // Le doy una película, y me busca el index de la pelicula en el arreglo
  const index = peliculas.indexOf(pelicula);
  //Splice te borra algo del arreglo a partir dfel index que le digas. El segundo número es cuantos quieres borrar a partir de la posición que le indicaste
  peliculas.splice(index, 1);
  console.log(peliculas);
  actualizarStorage();
}

function editar(pelicula) {
  const index = pelicula.indexOf(pelicula);
  const nuevo_nombre_pelicula = prompt(
    `Ingrese el nuevo nombre de la película actual: ${pelicula}`
  );
  peliculas[index] = nuevo_nombre_pelicula;
  actualizarStorage();
}
