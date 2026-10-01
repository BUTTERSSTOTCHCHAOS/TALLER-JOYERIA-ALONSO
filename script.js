// Lista de piezas a cotizar (no es un carrito de compra con precios fijos,
// ya que las piezas del taller se cotizan por WhatsApp según diseño y material)
let quoteList = [];
const WHATSAPP_NUMBER = '528124082017';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Crear el HTML del panel lateral de cotización
    const cartHTML = `
        <div id="cart-overlay" class="cart-overlay"></div>
        <div id="cart-drawer" class="cart-drawer">
            <div class="cart-header">
                <h3>MI LISTA DE COTIZACIÓN</h3>
                <button id="close-cart" class="close-cart">&times;</button>
            </div>
            <div id="cart-items" class="cart-items">
                <p class="empty-msg">Aún no has agregado piezas. Toca "COTIZAR" en cualquier pieza del catálogo.</p>
            </div>
            <div class="cart-footer">
                <div class="cart-total-row">
                    <span>PIEZAS SELECCIONADAS:</span>
                    <span id="cart-total-val" class="gold-text">0</span>
                </div>
                <button class="btn-checkout" id="send-quote-btn">ENVIAR COTIZACIÓN POR WHATSAPP</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', cartHTML);

    // 2. Estilos inyectados para el panel de cotización
    const style = document.createElement('style');
    style.innerHTML = `
        .cart-overlay {
            position: fixed; inset: 0; background: rgba(0,0,0,0.8);
            backdrop-filter: blur(4px); opacity: 0; visibility: hidden;
            transition: all 0.3s ease; z-index: 998;
        }
        .cart-overlay.active { opacity: 1; visibility: visible; }

        .cart-drawer {
            position: fixed; top: 0; right: -420px; width: 400px; max-width: 90vw; height: 100vh;
            background: #111; border-left: 1px solid #262626; z-index: 999;
            display: flex; flex-direction: column; transition: right 0.35s cubic-bezier(0.16, 1, 0.3, 1);
            padding: 30px; box-shadow: -10px 0 30px rgba(0,0,0,0.8);
        }
        .cart-drawer.active { right: 0; }

        .cart-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #262626; padding-bottom: 15px; }
        .cart-header h3 { font-family: 'Oswald', sans-serif; font-size: 18px; letter-spacing: 1.5px; }
        .close-cart { background: none; border: none; color: #FFF; font-size: 28px; cursor: pointer; }

        .cart-items { flex: 1; overflow-y: auto; padding: 20px 0; }
        .empty-msg { color: #8E8E93; font-size: 13px; text-align: center; margin-top: 40px; }

        .cart-item { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #1F1F1F; padding-bottom: 15px; gap: 10px; }
        .item-info h4 { font-family: 'Oswald', sans-serif; font-size: 15px; margin-bottom: 4px; }
        .item-info p { color: #C99A3B; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
        .item-remove { background: none; border: none; color: #8E8E93; font-size: 20px; cursor: pointer; line-height: 1; }
        .item-remove:hover { color: #E5504A; }

        .cart-footer { border-top: 1px solid #262626; padding-top: 20px; }
        .cart-total-row { display: flex; justify-content: space-between; font-family: 'Oswald', sans-serif; font-size: 16px; margin-bottom: 15px; }
        .gold-text { color: #C99A3B; }

        .btn-checkout { width: 100%; padding: 15px; background: #C99A3B; border: none; color: #000; font-weight: 700; letter-spacing: 1.5px; cursor: pointer; text-transform: uppercase; font-size: 12px; }
        .btn-checkout:hover { background: #E5B249; }
        .btn-checkout:disabled { background: #333; color: #777; cursor: not-allowed; }
    `;
    document.head.appendChild(style);

    // 3. Referencias a la interfaz
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    const closeBtn = document.getElementById('close-cart');
    const cartTrigger = document.querySelector('.cart-trigger');
    const sendQuoteBtn = document.getElementById('send-quote-btn');

    const toggleCart = (open) => {
        if (open) {
            drawer.classList.add('active');
            overlay.classList.add('active');
        } else {
            drawer.classList.remove('active');
            overlay.classList.remove('active');
        }
    };

    if (cartTrigger) cartTrigger.addEventListener('click', () => toggleCart(true));
    closeBtn.addEventListener('click', () => toggleCart(false));
    overlay.addEventListener('click', () => toggleCart(false));

    // 4. Lógica para agregar piezas a la lista de cotización
    const addButtons = document.querySelectorAll('.btn-add');
    addButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const title = card.querySelector('.product-title').innerText;
            const material = card.querySelector('.product-material').innerText;

            if (quoteList.some(item => item.title === title)) {
                toggleCart(true);
                return;
            }

            quoteList.push({ title, material });
            updateCartUI();
            toggleCart(true);
        });
    });

    function updateCartUI() {
        const container = document.getElementById('cart-items');
        const totalVal = document.getElementById('cart-total-val');

        if (quoteList.length === 0) {
            container.innerHTML = '<p class="empty-msg">Aún no has agregado piezas. Toca "COTIZAR" en cualquier pieza del catálogo.</p>';
            totalVal.innerText = '0';
            if (cartTrigger) cartTrigger.innerText = 'BOLSA (0)';
            sendQuoteBtn.disabled = true;
            return;
        }

        container.innerHTML = '';
        quoteList.forEach((item, index) => {
            container.innerHTML += `
                <div class="cart-item">
                    <div class="item-info">
                        <h4>${item.title}</h4>
                        <p>${item.material}</p>
                    </div>
                    <button class="item-remove" data-index="${index}" aria-label="Quitar">&times;</button>
                </div>
            `;
        });

        container.querySelectorAll('.item-remove').forEach(removeBtn => {
            removeBtn.addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.dataset.index, 10);
                quoteList.splice(idx, 1);
                updateCartUI();
            });
        });

        totalVal.innerText = quoteList.length;
        if (cartTrigger) cartTrigger.innerText = `BOLSA (${quoteList.length})`;
        sendQuoteBtn.disabled = false;
    }

    // 5. Enviar la lista completa como mensaje de WhatsApp
    sendQuoteBtn.addEventListener('click', () => {
        if (quoteList.length === 0) return;
        const lines = quoteList.map(item => `- ${item.title} (${item.material})`).join('\n');
        const message = `Hola, me gustaría cotizar las siguientes piezas:\n${lines}`;
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank', 'noopener');
    });

    updateCartUI();

    // 6. Menú móvil: abrir/cerrar navegación en pantallas pequeñas
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.style.display = mainNav.style.display === 'block' ? 'none' : 'block';
        });
    }

    // 7. Registro de newsletter (sin backend todavía): confirmación simple
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            newsletterForm.innerHTML = '<p style="color:#C99A3B; font-size:13px;">¡Gracias por registrarte! Te avisaremos de nuevas piezas.</p>';
        });
    }

    // 8. Filtro de catálogo en dos niveles: categoría principal (Oro / Plata / Reparaciones / Todas)
    // y, dentro de Oro o Plata, un segundo filtro por tipo de pieza (esclavas, anillos, etc.)
    // Los enlaces del menú, las fotos grandes de categorías y los pills llevan aquí
    // en vez de ir a una página vacía.
    const subcatLabels = {
        esclavas: 'Esclavas',
        anillos: 'Anillos',
        collares: 'Collares',
        pulseras: 'Pulseras',
        aretes: 'Aretes',
        cadenas: 'Cadenas',
        dijes: 'Dijes'
    };

    function subcatLabel(key) {
        return subcatLabels[key] || (key.charAt(0).toUpperCase() + key.slice(1));
    }

    function renderSubcatPills(category) {
        const row = document.getElementById('subcat-pills');
        if (!row) return;

        if (category === 'all' || category === 'reparaciones') {
            row.innerHTML = '';
            row.style.display = 'none';
            return;
        }

        const cards = document.querySelectorAll(`.product-card[data-cat="${category}"]`);
        const subcats = [...new Set(Array.from(cards).map(card => card.dataset.subcat).filter(Boolean))];

        if (subcats.length === 0) {
            row.innerHTML = '';
            row.style.display = 'none';
            return;
        }

        row.style.display = 'flex';
        row.innerHTML = '<button type="button" class="filter-pill sub active" data-subcat="all">TODAS</button>' +
            subcats.map(sub => `<button type="button" class="filter-pill sub" data-subcat="${sub}">${subcatLabel(sub).toUpperCase()}</button>`).join('');

        row.querySelectorAll('[data-subcat]').forEach(btn => {
            btn.addEventListener('click', () => {
                applySubcatFilter(category, btn.dataset.subcat);
                row.querySelectorAll('[data-subcat]').forEach(b => b.classList.toggle('active', b === btn));
            });
        });
    }

    function applySubcatFilter(category, subcat) {
        document.querySelectorAll('.product-card').forEach(card => {
            const catMatches = card.dataset.cat === category;
            const subMatches = subcat === 'all' || card.dataset.subcat === subcat;
            card.style.display = (catMatches && subMatches) ? '' : 'none';
        });
    }

    function applyFilter(filter) {
        const grid = document.querySelector('.products-grid');
        const repairsPanel = document.getElementById('repairs-panel');

        if (filter === 'reparaciones') {
            if (grid) grid.style.display = 'none';
            if (repairsPanel) repairsPanel.style.display = '';
        } else {
            if (grid) grid.style.display = '';
            if (repairsPanel) repairsPanel.style.display = 'none';
            document.querySelectorAll('.product-card').forEach(card => {
                const matches = filter === 'all' || card.dataset.cat === filter;
                card.style.display = matches ? '' : 'none';
            });
        }

        document.querySelectorAll('.filter-pill:not(.sub)').forEach(pill => {
            pill.classList.toggle('active', pill.dataset.filter === filter);
        });

        renderSubcatPills(filter);
    }

    document.querySelectorAll('[data-filter]').forEach(el => {
        el.addEventListener('click', () => {
            applyFilter(el.dataset.filter);

            // Si el enlace también trae un subtipo (por ejemplo, desde el menú
            // desplegable "Esclavas" dentro de Oro), lo aplicamos tras renderizar los pills.
            if (el.dataset.subcat) {
                requestAnimationFrame(() => {
                    const subRow = document.getElementById('subcat-pills');
                    const target = subRow && subRow.querySelector(`[data-subcat="${el.dataset.subcat}"]`);
                    if (target) target.click();
                });
            }
        });
    });
});
