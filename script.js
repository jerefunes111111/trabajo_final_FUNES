// BUSQUEDA
const searchButton = document.getElementById('buscar');
if (searchButton) {
    searchButton.addEventListener('click', () => {
      const titulo = document.getElementById('titulo').value.trim().toLowerCase();
      const autor = document.getElementById('autor').value.trim().toLowerCase();
      const genero = document.getElementById('genero').value.trim().toLowerCase();
      const anio = document.getElementById('anio').value.trim();

      if (titulo === 'los tres chanchitos' && autor === 'desconocido' && genero === 'narrativo') {
        const libro = {
          titulo: 'Los tres chanchitos',
          autor: 'Desconocido',
          genero: 'Narrativo',
          anio: anio || ''
        };
        localStorage.setItem('resultado_libro', JSON.stringify(libro));
        window.location.href = 'los-tres-chanchitos.html';
        return;
      }

      
      alert('No se encontraron libros que coincidan con los datos ingresados.');
    });
}

const backButton = document.getElementById('volver');
if (backButton) {
    backButton.addEventListener('click', () => {
      window.location.href = 'catalogo.html';
    });
}

// LOGIN
const formLogin = document.getElementById('form-login');
if (formLogin) {
    const msj = document.getElementById('msj-login');

    formLogin.addEventListener('submit', function(e) {
      e.preventDefault();
      msj.style.display = 'none';
      msj.textContent = '';

      const email = document.getElementById('login-email').value.trim().toLowerCase();
      const password = document.getElementById('login-password').value;

      const usuarioJSON = localStorage.getItem('bde_usuario');
      if (!usuarioJSON) {
        msj.textContent = 'No existe ningún usuario registrado. Registrate primero.';
        msj.style.display = 'block';
        return;
      }

      const usuario = JSON.parse(usuarioJSON);

      if (email === usuario.email && password === usuario.password) {
       
        alert('Inicio de sesión correcto');
        window.location.href = 'biblioteca.html';
;
      } else {
        msj.textContent = 'Email o contraseña incorrectos. Verificá e intentá de nuevo.';
        msj.style.display = 'block';
      }
    });
}

// RECUPERAR CONTRASEÑA
const formRecuperar = document.getElementById('form-recuperar');
if (formRecuperar) {
    formRecuperar.addEventListener('submit', function(e) {
      e.preventDefault();

      const email = document.getElementById('email').value.trim().toLowerCase();
      const nuevaPassword = document.getElementById('nueva-password').value;

      
      const usuarioJSON = localStorage.getItem('bde_usuario');
      if (usuarioJSON) {
        const usuario = JSON.parse(usuarioJSON);

        
        if (usuario.email === email) {
          usuario.password = nuevaPassword;
          localStorage.setItem('bde_usuario', JSON.stringify(usuario));
        } else {
          
          const nuevoUsuario = { nombre: '', apellido: '', email, password: nuevaPassword };
          localStorage.setItem('bde_usuario', JSON.stringify(nuevoUsuario));
        }
      } else {
        
        const nuevoUsuario = { nombre: '', apellido: '', email, password: nuevaPassword };
        localStorage.setItem('bde_usuario', JSON.stringify(nuevoUsuario));
      }

      alert('Contraseña actualizada correctamente. Ahora podés iniciar sesión.');
      window.location.href = 'login.html';
    });
}

// REGISTRO
const formRegistro = document.getElementById('form-registro');
if (formRegistro) {
    formRegistro.addEventListener('submit', function(e) {
      e.preventDefault();

      const nombre = document.getElementById('nombre').value.trim();
      const apellido = document.getElementById('apellido').value.trim();
      const email = document.getElementById('email').value.trim().toLowerCase();
      const password = document.getElementById('password').value;

      
      const usuario = { nombre, apellido, email, password };
      localStorage.setItem('bde_usuario', JSON.stringify(usuario));

      
      window.location.href = 'login.html';
    });
}

// CATALOGO
const botonesTematicas = document.querySelectorAll('.btn-tematica');
if (botonesTematicas.length > 0) {
    botonesTematicas.forEach(boton => {
      boton.addEventListener('click', () => {;
        window.location.href = 'busqueda.html';
      });
    });
}

// LOS TRES CHANCHITOS
if (document.getElementById('tituloLibro')) {
    const libroGuardado = localStorage.getItem('resultado_libro');
    const libro = libroGuardado ? JSON.parse(libroGuardado) : {
      titulo: 'Los tres chanchitos',
      autor: 'Desconocido',
      genero: 'Narrativo',
      tematica: 'Cuento Infantil'
    };

    
    document.getElementById('tituloLibro').textContent = '📘 ' + libro.titulo;
    document.getElementById('tituloText').textContent = libro.titulo;
    document.getElementById('autorText').textContent = libro.autor;
    document.getElementById('generoText').textContent = libro.genero;
    document.getElementById('tematica').textContent = libro.tematica;

    
    document.getElementById('leer').addEventListener('click', () => {
      let historial = JSON.parse(localStorage.getItem('historial_lectura')) || [];
      if (!historial.some(l => l.titulo === libro.titulo)) {
        historial.push(libro);
        localStorage.setItem('historial_lectura', JSON.stringify(historial));
      }

      
      localStorage.setItem('libroActual', JSON.stringify(libro));
      alert(`Libro "${libro.titulo}" agregado al historial de lectura ✅`);
      window.location.href = 'leer-chanchitos.html';
    });

    
    document.getElementById('fav').addEventListener('click', () => {
      let favoritos = JSON.parse(localStorage.getItem('favoritos_libros')) || [];
      if (!favoritos.some(l => l.titulo === libro.titulo)) {
        favoritos.push(libro);
        localStorage.setItem('favoritos_libros', JSON.stringify(favoritos));
        alert(`Libro "${libro.titulo}" agregado a tus favoritos ⭐`);
      } else {
        alert('Este libro ya está en tus favoritos.');
      }
    });

    
    document.getElementById('volver').addEventListener('click', () => {
      window.location.href = 'catalogo.html';
    });
}

// CONOCENOS
if(document.querySelector('.conocenos-body')) {
  document.getElementById('btn-biblioteca').addEventListener('click', () => mostrarInfo('infoBiblioteca'));
  document.getElementById('btn-quienes').addEventListener('click', () => mostrarInfo('infoQuienes'));
  document.getElementById('btn-proposito').addEventListener('click', () => mostrarInfo('infoProposito'));

  function mostrarInfo(id) {
    document.querySelectorAll('.info').forEach(div => div.style.display = 'none');
    const elementToShow = document.getElementById(id);
    if(elementToShow) {
        elementToShow.style.display = 'block';
    }
  }
}

// FAVORITOS
if(document.getElementById('listaFavoritos')) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos_libros')) || [];
    const contenedorFav = document.getElementById('listaFavoritos');

    if (favoritos.length === 0) {
      contenedorFav.innerHTML = '<p>No tenés libros en tus favoritos todavía.</p>';
    } else {
      favoritos.forEach((libro, index) => {
        const div = document.createElement('div');
        div.classList.add('libro-item');
        const estrellas = '⭐'.repeat(libro.calificacion || 5);

        div.innerHTML = `
          <strong>${libro.titulo}</strong><br>
          Autor: ${libro.autor}<br>
          Género: ${libro.genero}<br>
          Temática: ${libro.tematica}<br>
          <div class="estrellas">${estrellas}</div>
          <button class="btn btn-eliminar" onclick="eliminarFavorito(${index})">🗑️ Eliminar de favoritos</button>
        `;

        contenedorFav.appendChild(div);
      });
    }

    window.eliminarFavorito = function(index) {
      if (confirm('¿Seguro que querés eliminar este libro de tus favoritos?')) {
        favoritos.splice(index, 1);
        localStorage.setItem('favoritos_libros', JSON.stringify(favoritos));
        location.reload();
      }
    }
}

// HISTORIAL
if(document.getElementById('listaHistorial')) {
    const contenedor = document.getElementById('listaHistorial');
    const historial = JSON.parse(localStorage.getItem('historial_lectura')) || [];

    if (historial.length === 0) {
      contenedor.innerHTML = '<p>No has leído ningún libro todavía.</p>';
    } else {
      historial.forEach(libro => {
        const div = document.createElement('div');
        div.classList.add('libro-item');
        div.innerHTML = `
          <strong>${libro.titulo}</strong><br>
          Autor: ${libro.autor}<br>
          Género: ${libro.genero}<br>
          Temática: ${libro.tematica}
        `;
        contenedor.appendChild(div);
      });
    }
}

// PERFIL
if(document.getElementById('perfil-form')) {
    const usuarioJSON = localStorage.getItem('bde_usuario');
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const btnEditar = document.getElementById('editar');

    if (usuarioJSON) {
      const usuario = JSON.parse(usuarioJSON);
      nombreInput.value = usuario.nombre || '';
      apellidoInput.value = usuario.apellido || '';
      emailInput.value = usuario.email || '';
      passwordInput.value = usuario.password || '';
    }

   
    let modoEdicion = false;
    btnEditar.addEventListener('click', () => {
      modoEdicion = !modoEdicion;
      nombreInput.readOnly = !modoEdicion;
      apellidoInput.readOnly = !modoEdicion;
      emailInput.readOnly = !modoEdicion;
      passwordInput.readOnly = !modoEdicion;

      if (modoEdicion) {
        btnEditar.textContent = 'Guardar cambios';
        alert('Podés editar tus datos ahora.');
      } else {
        btnEditar.textContent = 'Editar perfil';
        const usuarioActualizado = {
          nombre: nombreInput.value,
          apellido: apellidoInput.value,
          email: emailInput.value,
          password: passwordInput.value
        };
        localStorage.setItem('bde_usuario', JSON.stringify(usuarioActualizado));
        alert('Cambios guardados correctamente.');
      }
    });

  
    document.getElementById('configuracion').addEventListener('click', () => {
        window.location.href = 'configuracion.html';
    });
}
