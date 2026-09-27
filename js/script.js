document.addEventListener('DOMContentLoaded', () => {

    const loader = document.querySelector('.loader');
    if (loader) {
        const ocultarLoader = () => loader.classList.add('hidden');
        window.addEventListener('load', () => setTimeout(ocultarLoader, 1200));
        setTimeout(ocultarLoader, 3000);
    }


    const barraProgreso = document.querySelector('.scroll-progress');


    const navbar = document.querySelector('.navbar');
    const btnVolverArriba = document.getElementById('backToTop');

    function actualizarScroll() {
        const desplazado = window.scrollY;

        if (barraProgreso) {
            const altoTotal = document.documentElement.scrollHeight - window.innerHeight;
            const progreso = altoTotal > 0 ? (desplazado / altoTotal) * 100 : 0;
            barraProgreso.style.width = progreso + '%';
        }
        if (navbar) {
            navbar.classList.toggle('scrolled', desplazado > 80);
        }
        if (btnVolverArriba) {
            btnVolverArriba.classList.toggle('visible', desplazado > 500);
        }
    }

    window.addEventListener('scroll', () => window.requestAnimationFrame(actualizarScroll));
    actualizarScroll();


    if (btnVolverArriba) {
        btnVolverArriba.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    const heroBg = document.getElementById('heroBg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            if (window.scrollY < window.innerHeight) {
                heroBg.style.transform = `translateY(${window.scrollY * 0.35}px)`;
            }
        });
    }


    const menu = document.getElementById('navMenu');
    if (menu) {
        menu.querySelectorAll('a').forEach((enlace) => {
            enlace.addEventListener('click', () => {
                if (window.innerWidth < 992 && menu.classList.contains('show')) {
                    const colapsable = bootstrap.Collapse.getOrCreateInstance(menu, { toggle: false });
                    colapsable.hide();
                }
            });
        });
    }


    const elementosReveal = document.querySelectorAll('.reveal');
    if (elementosReveal.length) {
        const observadorReveal = new IntersectionObserver((entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add('visible');
                    observadorReveal.unobserve(entrada.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        elementosReveal.forEach((el) => observadorReveal.observe(el));
    }


    const contadores = document.querySelectorAll('.counter');
    if (contadores.length) {
        const observadorContador = new IntersectionObserver((entradas) => {
            entradas.forEach((entrada) => {
                if (!entrada.isIntersecting) return;
                const contador = entrada.target;
                const objetivo = parseInt(contador.dataset.target, 10);
                const duracion = 1800;
                const inicio = performance.now();

                function animar(ahora) {
                    const avance = Math.min((ahora - inicio) / duracion, 1);
                    const suavizado = 1 - Math.pow(1 - avance, 3);
                    contador.textContent = Math.floor(suavizado * objetivo).toLocaleString('es-BO');
                    if (avance < 1) {
                        requestAnimationFrame(animar);
                    } else {
                        contador.textContent = objetivo.toLocaleString('es-BO');
                    }
                }
                requestAnimationFrame(animar);
                observadorContador.unobserve(contador);
            });
        }, { threshold: 0.5 });

        contadores.forEach((c) => observadorContador.observe(c));
    }


    const botonesFiltro = document.querySelectorAll('.filter-btn');
    const itemsGaleria = document.querySelectorAll('.gallery-item');

    if (botonesFiltro.length && itemsGaleria.length) {
        botonesFiltro.forEach((boton) => {
            boton.addEventListener('click', () => {
                botonesFiltro.forEach((b) => b.classList.remove('active'));
                boton.classList.add('active');
                const filtro = boton.dataset.filter;

                itemsGaleria.forEach((item) => {
                    if (filtro === 'all' || item.dataset.category === filtro) {
                        item.style.display = '';
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.85)';
                        setTimeout(() => {
                            item.style.transition = 'all .5s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 40);
                    } else {
                        item.style.transition = 'all .3s ease';
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.85)';
                        setTimeout(() => { item.style.display = 'none'; }, 280);
                    }
                });
            });
        });
    }


    const visor = document.getElementById('lightbox');

    if (visor && itemsGaleria.length) {
        const visorImg = document.getElementById('lightboxImg');
        const visorContador = document.getElementById('lightboxCounter');
        let indiceActual = 0;
        let imagenesVisibles = [];

        const obtenerVisibles = () =>
            Array.from(itemsGaleria).filter((item) => item.style.display !== 'none');

        function abrirVisor(indice) {
            imagenesVisibles = obtenerVisibles();
            indiceActual = indice < 0 ? 0 : indice;
            const item = imagenesVisibles[indiceActual];
            if (!item) return;
            const img = item.querySelector('img');
            visorImg.src = img.src;
            visorImg.alt = img.alt;
            visorContador.textContent = `${indiceActual + 1} / ${imagenesVisibles.length}`;
            visor.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function cerrarVisor() {
            visor.classList.remove('active');
            document.body.style.overflow = '';
        }

        function navegarVisor(paso) {
            if (!imagenesVisibles.length) return;
            indiceActual = (indiceActual + paso + imagenesVisibles.length) % imagenesVisibles.length;
            const img = imagenesVisibles[indiceActual].querySelector('img');
            visorImg.style.opacity = '0';
            setTimeout(() => {
                visorImg.src = img.src;
                visorImg.alt = img.alt;
                visorContador.textContent = `${indiceActual + 1} / ${imagenesVisibles.length}`;
                visorImg.style.opacity = '1';
            }, 180);
        }

        itemsGaleria.forEach((item) => {
            item.addEventListener('click', () => {
                const visibles = obtenerVisibles();
                const posicion = visibles.indexOf(item);
                abrirVisor(posicion >= 0 ? posicion : 0);
            });
        });

        document.querySelector('.lightbox-close').addEventListener('click', cerrarVisor);
        document.querySelector('.lightbox-prev').addEventListener('click', () => navegarVisor(-1));
        document.querySelector('.lightbox-next').addEventListener('click', () => navegarVisor(1));

        visor.addEventListener('click', (e) => {
            if (e.target === visor) cerrarVisor();
        });


        document.addEventListener('keydown', (e) => {
            if (!visor.classList.contains('active')) return;
            if (e.key === 'Escape') cerrarVisor();
            if (e.key === 'ArrowLeft') navegarVisor(-1);
            if (e.key === 'ArrowRight') navegarVisor(1);
        });


        let toqueVisor = 0;
        visor.addEventListener('touchstart', (e) => { toqueVisor = e.changedTouches[0].screenX; }, { passive: true });
        visor.addEventListener('touchend', (e) => {
            const diferencia = e.changedTouches[0].screenX - toqueVisor;
            if (Math.abs(diferencia) > 50) navegarVisor(diferencia > 0 ? -1 : 1);
        }, { passive: true });
    }


    const pista = document.getElementById('testimoniosTrack');

    if (pista) {
        const puntos = document.querySelectorAll('.carousel-dot');
        const botonAnterior = document.getElementById('prevBtn');
        const botonSiguiente = document.getElementById('nextBtn');
        const total = puntos.length;
        let indice = 0;
        let intervalo;

        function irATestimonio(nuevo) {
            if (!total) return;
            indice = ((nuevo % total) + total) % total;
            pista.style.transform = `translateX(-${indice * 100}%)`;
            puntos.forEach((p, i) => p.classList.toggle('active', i === indice));
        }

        function reiniciarAutoplay() {
            clearInterval(intervalo);
            intervalo = setInterval(() => irATestimonio(indice + 1), 6000);
        }

        if (botonAnterior) {
            botonAnterior.addEventListener('click', () => { irATestimonio(indice - 1); reiniciarAutoplay(); });
        }
        if (botonSiguiente) {
            botonSiguiente.addEventListener('click', () => { irATestimonio(indice + 1); reiniciarAutoplay(); });
        }
        puntos.forEach((p) => p.addEventListener('click', () => {
            irATestimonio(parseInt(p.dataset.slide, 10));
            reiniciarAutoplay();
        }));
        reiniciarAutoplay();

        let toqueCarrusel = 0;
        pista.addEventListener('touchstart', (e) => { toqueCarrusel = e.changedTouches[0].screenX; }, { passive: true });
        pista.addEventListener('touchend', (e) => {
            const diferencia = e.changedTouches[0].screenX - toqueCarrusel;
            if (Math.abs(diferencia) > 50) {
                irATestimonio(indice + (diferencia > 0 ? -1 : 1));
                reiniciarAutoplay();
            }
        }, { passive: true });
    }


    const marcadores = document.querySelectorAll('.map-marker');
    if (marcadores.length) {
        let popupAbierto = null;

        marcadores.forEach((marcador) => {
            marcador.addEventListener('click', (e) => {
                e.stopPropagation();
                const popup = marcador.querySelector('.map-popup');
                if (popupAbierto && popupAbierto !== popup) popupAbierto.classList.remove('active');
                popup.classList.toggle('active');
                popupAbierto = popup.classList.contains('active') ? popup : null;
            });
        });

        document.addEventListener('click', () => {
            if (popupAbierto) {
                popupAbierto.classList.remove('active');
                popupAbierto = null;
            }
        });
    }


    document.querySelectorAll('a[href^="#"]').forEach((ancla) => {
        ancla.addEventListener('click', function (e) {
            const destinoSelector = this.getAttribute('href');
            if (!destinoSelector || destinoSelector === '#') return;
            const destino = document.querySelector(destinoSelector);
            if (!destino) return;
            e.preventDefault();
            const altura = destino.getBoundingClientRect().top + window.scrollY - 90;
            window.scrollTo({ top: altura, behavior: 'smooth' });
        });
    });


    const hero = document.querySelector('.hero');
    const heroEspejo = document.querySelector('.hero-mirror');
    if (hero && heroEspejo) {
        hero.addEventListener('mousemove', (e) => {
            const caja = hero.getBoundingClientRect();
            const x = ((e.clientX - caja.left) / caja.width - 0.5) * 2;
            const y = ((e.clientY - caja.top) / caja.height - 0.5) * 2;
            heroEspejo.style.background = `radial-gradient(ellipse at ${50 + x * 20}% ${70 + y * 10}%,
                rgba(135,206,235,0.25), transparent 70%)`;
        });
    }


    const aviso = document.getElementById('toastBienvenida');
    if (aviso && window.bootstrap) {
        setTimeout(() => bootstrap.Toast.getOrCreateInstance(aviso, { delay: 6000 }).show(), 2200);
    }


    const formulario = document.getElementById('formContacto');

    if (formulario) {
        const mensajeExito = document.getElementById('mensajeExito');


        formulario.addEventListener('reset', () => {
            formulario.classList.remove('was-validated');
            if (mensajeExito) mensajeExito.classList.add('d-none');
        });

        formulario.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();


            if (!formulario.checkValidity()) {
                formulario.classList.add('was-validated');
                const primerError = formulario.querySelector(':invalid');
                if (primerError) primerError.focus();
                return;
            }


            formulario.reset();
            formulario.classList.remove('was-validated');

            if (mensajeExito) {
                mensajeExito.classList.remove('d-none');
                mensajeExito.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => mensajeExito.classList.add('d-none'), 9000);
            }
        });
    }

});
