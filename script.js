// Datos de los videos (puedes agregar más videos aquí)
const videos = [
    {
        id: 'T8trLxET1oc', // Reemplaza con IDs reales de YouTube
        title: 'Año 13',
        description: '',
        thumbnail: 'https://img.youtube.com/vi/T8trLxET1oc/maxresdefault.jpg'
    },
    {
        id: 'bnzdSKwx2nY', // Reemplaza con IDs reales de YouTube
        title: 'Chau Sofía',
        description: '',
        thumbnail: 'https://img.youtube.com/vi/bnzdSKwx2nY/maxresdefault.jpg'
    },
    {
        id: 'XDzGqMJdvh8', // Reemplaza con IDs reales de YouTube
        title: 'El Espíritu Capicúa',
        description: '',
        thumbnail: 'https://img.youtube.com/vi/XDzGqMJdvh8/maxresdefault.jpg'
    },
    {
        id: '8kD3mwJkiKg', // Reemplaza con IDs reales de YouTube
        title: 'Alunizando',
        description: '',
        thumbnail: 'https://img.youtube.com/vi/8kD3mwJkiKg/maxresdefault.jpg'
    },
    {
        id: 'eA92H01F1QU', // Reemplaza con IDs reales de YouTube
        title: 'Nigromante',
        description: '',
        thumbnail: 'https://img.youtube.com/vi/eA92H01F1QU/maxresdefault.jpg'
    }
];

// Función para mostrar una vista específica
function showView(viewName) {
    console.log('Mostrando vista:', viewName);
    
    // Ocultar todas las vistas
    document.querySelectorAll('.view').forEach(view => {
        view.classList.add('d-none');
    });
    
    // Mostrar la vista seleccionada
    const selectedView = document.getElementById(`${viewName}-view`);
    console.log('Vista encontrada:', selectedView);
    if (selectedView) {
        selectedView.classList.remove('d-none');
        console.log('Clases después de remover d-none:', selectedView.className);
        console.log('Display computed:', window.getComputedStyle(selectedView).display);
    } else {
        console.error('No se encontró la vista:', `${viewName}-view`);
    }
    
    // Actualizar navegación activa
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        // Agregar clase active al link correspondiente
        const linkView = link.getAttribute('onclick');
        if (linkView && linkView.includes(`showView('${viewName}')`)) {
            link.classList.add('active');
        }
    });
    
    // Si se muestra la vista "about", cargar el tema guardado
    if (viewName === 'about') {
        setTimeout(loadAboutCardTheme, 100);
    }
    
    // Cerrar el menú hamburguesa en móvil
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        // Intentar usar la API de Bootstrap Collapse si está disponible
        if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        } else {
            // Fallback: simplemente remover la clase show
            navbarCollapse.classList.remove('show');
        }
    }
    
    // Scroll al inicio
    window.scrollTo(0, 0);
}

// Función para abrir video de YouTube
function openVideo(videoId) {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
}

// Función para renderizar los videos
function renderVideos() {
    const container = document.getElementById('videos-container');
    
    if (!container) return;
    
    container.innerHTML = videos.map(video => `
        <div class="col-md-6 col-lg-4">
            <div class="card video-card">
                <div class="video-thumbnail" onclick="openVideo('${video.id}')">
                    <img src="${video.thumbnail}" alt="${video.title}" onerror="this.src='https://via.placeholder.com/640x360?text=Video+Preview'">
                    <div class="video-play-button">
                        <i class="bi bi-play-fill"></i>
                    </div>
                </div>
                <div class="video-card-body">
                    <h3 class="video-title">${video.title}</h3>
                    <p class="video-description">${video.description}</p>
                    <a href="https://www.youtube.com/watch?v=${video.id}" target="_blank" class="btn btn-sm btn-outline-secondary mt-1">
                        <i class="bi bi-youtube"></i> Ver en YouTube
                    </a>
                </div>
            </div>
        </div>
    `).join('');
}

// Función para copiar al portapapeles
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(function() {
        // Cambiar el icono temporalmente para indicar que se copió
        const icon = button.querySelector('i');
        const originalClass = icon.className;
        icon.className = 'bi bi-check';
        button.classList.add('btn-success');
        button.classList.remove('btn-outline-light');
        
        setTimeout(function() {
            icon.className = originalClass;
            button.classList.remove('btn-success');
            button.classList.add('btn-outline-light');
        }, 2000);
    }).catch(function(err) {
        console.error('Error al copiar:', err);
        alert('Error al copiar al portapapeles');
    });
}

// Función para cambiar entre modo día y modo noche en la carta Quién soy?
function toggleAboutCardTheme() {
    const card = document.getElementById('about-card');
    const toggle = document.getElementById('theme-toggle');
    const label = document.getElementById('theme-label');
    
    if (!card || !toggle) return;
    
    if (toggle.checked) {
        // Modo día
        card.classList.remove('night-mode');
        card.classList.add('day-mode');
        label.textContent = '☀️';
        localStorage.setItem('aboutCardTheme', 'day');
    } else {
        // Modo noche
        card.classList.remove('day-mode');
        card.classList.add('night-mode');
        label.textContent = '🌙';
        localStorage.setItem('aboutCardTheme', 'night');
    }
}

// Cargar tema guardado al iniciar
function loadAboutCardTheme() {
    const card = document.getElementById('about-card');
    const toggle = document.getElementById('theme-toggle');
    const label = document.getElementById('theme-label');
    
    if (!card || !toggle || !label) return;
    
    const savedTheme = localStorage.getItem('aboutCardTheme') || 'night';
    
    if (savedTheme === 'day') {
        toggle.checked = true;
        card.classList.remove('night-mode');
        card.classList.add('day-mode');
        label.textContent = '☀️';
    } else {
        toggle.checked = false;
        card.classList.remove('day-mode');
        card.classList.add('night-mode');
        label.textContent = '🌙';
    }
}

// Manejo del formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    // Renderizar videos al cargar la página
    renderVideos();
    
    // Mostrar vista home por defecto
    showView('home');
    
    // Cargar tema guardado de la carta Quién soy?
    setTimeout(loadAboutCardTheme, 100);
});
