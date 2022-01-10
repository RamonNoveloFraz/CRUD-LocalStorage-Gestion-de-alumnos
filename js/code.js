var num_dato = document.getElementById("cambio_estado")

var editar = document.getElementById("cambio")
editar.value = "false"

var texto_boton = document.getElementById("boton_formulario")
texto_boton.textContent = 'Guardar'

var contador_data = 1

    if (localStorage.getItem("contador") == null) {
        localStorage.setItem('contador', contador_data)
    } else {
        contador_data = localStorage.getItem("contador")
    }
    
function enlistar_data(contador_actual = 1, actualiza_tabla = false){

    let info_tabla = document.getElementById("alum-list")

    let titulo_formulario = document.querySelector("#titulo_estado_formulario")
    titulo_formulario.innerHTML = `Instituto tecnológico de campeche. Gestión de alumnos`

    if (actualiza_tabla) {
        let contador_futuro = localStorage.getItem('contador')
        for (let x = 1; x < contador_futuro; x++) {
            if(localStorage.getItem('Nombre_' + x) != null && localStorage.getItem('Correo_' + x) != null && 
                localStorage.getItem('Edad_' + x) != null){
                
                    info_tabla.innerHTML += `
                <tr id="filas-datos">
                    <td>${localStorage.getItem('Nombre_' + x)}</td>
                    <td>${localStorage.getItem('Correo_' + x)}</td>
                    <td>${localStorage.getItem('Edad_' + x)}</td>
                    <td>
                        <i class="fas fa-pen-fancy mx-2" onclick="editar_elemento(${x})"></i>
                        <i class="fas fa-trash-alt mx-2" onclick="borrar_elemento(${x})"></i>
                    </td>
                </tr> `
            }
        }
    } else {
        info_tabla.innerHTML += `
        <tr id="filas-datos">
            <td>${localStorage.getItem('Nombre_' + contador_actual)}</td>
            <td>${localStorage.getItem('Correo_' + contador_actual)}</td>
            <td>${localStorage.getItem('Edad_' + contador_actual)}</td>
            <td>
                <i class="fas fa-pen-fancy mx-2" onclick="editar_elemento(${contador_actual})"></i>
                <i class="fas fa-trash-alt mx-2" onclick="borrar_elemento(${contador_actual})"></i>
            </td>
        </tr> `
    }
}

enlistar_data(1, true)

function almacenar_datos(){
    
    if(editar.value == "false"){
        
        var nombre = document.getElementById("nom").value
        var correo = document.getElementById("corr").value
        var edad = document.getElementById("edad").value
    
        localStorage.setItem("Nombre_"+contador_data, nombre)
        localStorage.setItem("Correo_"+contador_data, correo)
        localStorage.setItem("Edad_"+contador_data, edad)
    
        contador_data = parseInt(contador_data) + 1
        localStorage.setItem("contador", contador_data)
        let contador_actual = parseInt(contador_data) - 1
        
        enlistar_data(contador_actual)
        
        document.getElementById("limpiar_formulario").reset()

    }else if(editar.value == "true"){
        var indice_dato = parseInt(num_dato.value)
        
        let new_nombre = document.getElementById("nom").value
        let new_correo = document.getElementById("corr").value
        let new_edad = document.getElementById("edad").value

        localStorage.setItem("Nombre_"+indice_dato, new_nombre)
        localStorage.setItem("Correo_"+indice_dato, new_correo)
        localStorage.setItem("Edad_"+indice_dato, new_edad)

        let info_tabla = document.getElementById("alum-list")
        info_tabla.innerHTML = ''

        let titulo_formulario = document.querySelector("#titulo_estado_formulario")
        titulo_formulario.innerHTML = `Insertar nuevo dato`

        let subtitulo = document.getElementById("subtitulo_dato_editando")
        subtitulo.innerHTML = ``

        enlistar_data(1, true)
        
        editar.value = "false"
        
        document.getElementById("limpiar_formulario").reset()

        var filas = document.getElementById("filas-datos")
        filas.className = ''

        texto_boton.textContent = '- Guardar datos -'
    }
}

function editar_elemento(indice_dato) {

    num_dato.value = indice_dato
    
    editar.value = "true"
    if  (confirm('¿Seguro de editar estos datos?')){
        let titulo_formulario = document.getElementById("titulo_estado_formulario")
        titulo_formulario.innerHTML = `Actualizar dato`
    
        let subtitulo = document.getElementById("subtitulo_dato_editando")
        subtitulo.innerHTML = `Estas editanto el dato # ${indice_dato}`
    
        texto_boton.textContent = '- Editar cambios -'
    
        var filas = document.getElementById("filas-datos")
        filas.className = "filas-en-edicion"
    
        var input_nombre = document.getElementById("nom")
        var input_correo = document.getElementById("corr")
        var input_edad = document.getElementById("edad")
    
        input_nombre.value = localStorage.getItem("Nombre_" + indice_dato)
        input_correo.value = localStorage.getItem("Correo_" + indice_dato)
        input_edad.value = localStorage.getItem("Edad_" + indice_dato)
    }
}

function borrar_elemento(ubi_dato) {
   
    if (confirm('¿Seguro de borrar estos datos?')) {
        let info_tabla = document.getElementById("alum-list")
        info_tabla.innerHTML = ''
    
        localStorage.removeItem("Nombre_" + ubi_dato)
        localStorage.removeItem("Correo_" + ubi_dato)
        localStorage.removeItem("Edad_" + ubi_dato)
        enlistar_data(1, true)
    }
}