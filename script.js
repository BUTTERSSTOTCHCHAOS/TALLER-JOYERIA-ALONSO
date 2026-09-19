// Lista de piezas a cotizar (no es un carrito de compra con precios fijos,
// ya que las piezas del taller se cotizan por WhatsApp según diseño y material)
let quoteList = [];
const WHATSAPP_NUMBER = '528124082017';

document.addEventListener('DOMContentLoaded', () => {
    // 0. Archivo visual completo: se conserva cada fotografía original del taller.
    const imageManifest = `1.png|486253302_1178451177409509_7711692284863488766_n.png|486264893_1178451290742831_94683399618335372_n.png|486275079_1178451400742820_6649392154361952553_n.png|486351194_1178451280742832_286153282572229154_n.png|486353780_1178451467409480_8343791024134363013_n.png|486359372_1178451394076154_6820458252893051513_n (1).png|486359372_1178451394076154_6820458252893051513_n.png|486369203_1178451374076156_7784466000238821211_n.png|486412344_1178451267409500_350498950699586655_n.png|486426449_1178451520742808_1243827022123189189_n.png|486533018_1178451244076169_4235355058449439142_n.png|486575634_1177081440879816_6452889186977197835_n.png|486580825_1177081647546462_2345650363507493976_n.png|486676119_1178451254076168_8459372493896154885_n.png|486684726_1177081487546478_7567079180244954403_n.png|486695311_1177081504213143_8330948344020180826_n.png|486701949_1177081754213118_411892017661169286_n.png|486705886_1178451404076153_6410992681415624362_n.png|486707152_1177081727546454_4072806623067816477_n.png|486712569_1177081704213123_438297876717101404_n.png|486736516_1178451507409476_4287732075411546592_n.png|486751153_1177081517546475_2603937883344516676_n.png|486787949_1177081664213127_2153656843443815063_n.png|486811931_1177081610879799_7767549832208151447_n.png|486840658_1178451237409503_809699808170240142_n.png|486841241_1178451247409502_9137036700650890092_n.png|486842492_1178451287409498_2292476334224944438_n.png|486865366_1178451310742829_7168288658424418031_n.png|486945672_1177081600879800_8097102265791899622_n.png|486978635_1178451500742810_6961716451490696862_n.png|486990945_1178451517409475_5947217364523573356_n.png|486992386_1178451264076167_4399154206934222901_n.png|487095899_1178451514076142_2046651257512032055_n.png|487099650_1178451444076149_3232414146808681554_n.png|487122761_1178451390742821_3140948048939150441_n.png|487123328_1177081577546469_2482733302358054033_n.png|487132893_1177081490879811_4711089311300514563_n.png|487141735_1177081744213119_9223214165525279778_n.png|487213048_1177081624213131_5757648920829186014_n.png|487313584_1177081587546468_7167785672633250917_n.png|487318136_1178451354076158_506442512121477363_n.png|487326364_1178451324076161_2486861177455626392_n.png|487387189_1178451274076166_1206057808369561617_n.png|487406095_1178451384076155_207503154153413787_n.png|487428372_1178451414076152_8265634961849636552_n.png|487433609_1178451294076164_4193229292961932400_n.png|487453873_1178451424076151_1015399529105265363_n.png|487505828_1178451387409488_788190546946100906_n.png|487507885_1178451190742841_6145282430468520872_n.png|494736973_1214107280510565_7082781087603835803_n.png|496069332_1214110887176871_4656412818026937420_n.png|496125600_1214108507177109_1928194718026937420_n.png|496218455_1214110510510242_6004476304394544939_n.png|499407468_1218997540021539_7401435536522162467_n.png|499419985_1218995633355063_5649981092470549707_n.png|499893217_1218997870021506_6778246911804639893_n.png|499906523_1224323216155638_5082077550129721490_n.png|499961314_1223361349585158_1967186776409487779_n.png|500073427_1223361972918429_8674642540704024681_n.png|500127455_1224322116155748_1046719557440204925_n.png|500930250_1224322309489062_4736168735855393023_n.png|540428925_1305287161392576_614002085643027576_n.png|540477860_1305287411392551_6702270893517214087_n.png|540573782_1305287201392572_2704499640757521532_n.png|540595677_1305287198059239_6705116547858884629_n.png|540703456_1305287118059247_200094166256590717_n.png|540791134_1305287434725882_7828004331571544908_n.png|541437593_1305287398059219_1978350785730500421_n.png|541472167_1305287481392544_4975499587232102474_n.png|541541931_1305287331392559_8927017958786910985_n.png|541636034_1305287474725878_4408960195637657845_n.png|541678975_1305287338059225_6991236561788105265363_n.png|541743334_1305287471392545_8838382647335967306_n.png|542475366_1305287098059249_5010303809360280331_n.png|542498624_1305287261392566_6639221323974843327_n.png|542601926_1305287271392565_8662591013015922710_n.png|542619771_1305287258059233_4891067815601900276_n.png|542683822_1305287361392556_4304907918573501006_n.png|542752762_1305287378059221_2421831323974843327_n.png|543177271_1305287268059232_8410524777359358336_n.png|578264672_1365287722059186_7919392924022022716_n.png|578267103_1365287748725850_174658609127524850_n.png|578271609_1365287832059175_1516518103961724780_n.png|578275712_1365287878725837_1396408782576454079_n.png|578277654_1365287812059177_6613316815319857055_n.png|578961283_1365287728725852_6238597927932515595_n.png|580398344_1365287868725838_3052763179456974273_n.png|581027984_1365287818725843_5235441323594782754_n.png|581028950_1365287828725842_855614893763851331_n.png|581330451_1365287792059179_4828639059079603201_n.png|615209009_1414239713830653_4021221595984983374_n.png|615240347_1414239470497344_8722445078566530182_n.png|615308025_1414239830497308_7246743186969638604_n.png|615334222_1414239543830670_9185531004364007140_n.png|615334539_1414239297164028_8221902150942390572_n.png|615347777_1414239727163985_5076504441884800095_n.png|615353351_1414239410497350_7506519717233615568_n.png|615359112_1414239497164008_3000593876309121929_n.png|615392514_1414239690497322_4102090180898913836_n.png|615393701_1414239367164021_2284044757785611902_n.png|615409270_1414239757163982_7745960590456013448_n.png|615416715_1414239317164026_5640887276749562313_n.png|615430936_1414239800497311_2258828308569997283_n.png|615442877_1414239693830655_1192872711665892686_n.png|615484333_1414239580497333_7491506242692997265_n.png|615515878_1414239753830649_4787861817192238809_n.png|615532987_1414239600497331_652940669388721706_n.png|615555683_1414239837163974_5559027384476404908_n.png|615709763_1414239257164032_2367081024031630872_n.png|615784400_1414239337164024_3601528442309661065_n.png|615815521_1414239397164018_9186444919854507670_n.png|615823468_1414239453830679_6122861873676265281_n.png|615841519_1414239563830668_3491547027572840415_n.png|615866789_1414239827163975_8184051009251371467_n.png|615875986_1414239500497341_8360573093112221256_n.png|615974926_1414239613830663_315461621285692923_n.png|616038354_1414239803830644_6925608746230373768_n.png|616108147_1414239650497326_2050874757949535025_n.png|616128128_1414239427164015_3920128317849217364_n.png|616172126_1414239237164034_5457938383317337570_n.png|616218709_1414239283830696_2384462357668663368_n.png`.split('|');
    const filenameCorrections = {
        '486701949_1177081754213118_411892017661169286_n.png': '486701949_1177081754213118_411892017661169119_n.png',
        '496069332_1214110887176871_4656412818026937420_n.png': '496069332_1214110887176871_4656412814321275182_n.png',
        '541472167_1305287481392544_4975499587232102474_n.png': '541472167_1305287481392544_4975499587232107474_n.png',
        '541678975_1305287338059225_6991236561788105265363_n.png': '541678975_1305287338059225_6991236561788105879_n.png',
        '542752762_1305287378059221_2421831323974843327_n.png': '542752762_1305287378059221_2421831324563097981_n.png',
        '578267103_1365287748725850_174658609127524850_n.png': '578267103_1365287748725850_1746586091691637613_n.png'
    };
    const archiveImages = imageManifest.map(file => filenameCorrections[file] || file);
    const archive = document.getElementById('photo-archive');
    if (archive) {
        archive.innerHTML = archiveImages.map((file, index) => `<button class="archive-item" type="button" data-image="IMAGENES/${encodeURIComponent(file)}" aria-label="Abrir pieza ${index + 1}"><img loading="lazy" src="IMAGENES/${encodeURIComponent(file)}" alt="Pieza de joyería elaborada por Taller de Joyería Alonso"><span>VER DETALLE</span></button>`).join('');
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = '<button type="button" aria-label="Cerrar">×</button><img alt="Detalle de joyería">';
        document.body.appendChild(lightbox);
        const closeLightbox = () => lightbox.classList.remove('open');
        archive.addEventListener('click', event => { const item = event.target.closest('.archive-item'); if (!item) return; lightbox.querySelector('img').src = item.dataset.image; lightbox.classList.add('open'); });
        lightbox.addEventListener('click', event => { if (event.target === lightbox || event.target.tagName === 'BUTTON') closeLightbox(); });
        document.addEventListener('keydown', event => { if (event.key === 'Escape') closeLightbox(); });
    }

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

    // 8. Filtro de catálogo por material (Oro / Plata / Todas)
    // Los enlaces de "Oro" y "Plata" del menú, y las fotos grandes de categorías,
    // llevan aquí y filtran el catálogo en vez de ir a una página vacía.
    function applyFilter(filter) {
        document.querySelectorAll('.product-card').forEach(card => {
            const matches = filter === 'all' || card.dataset.cat === filter;
            card.style.display = matches ? '' : 'none';
        });
        document.querySelectorAll('.filter-pill').forEach(pill => {
            pill.classList.toggle('active', pill.dataset.filter === filter);
        });
    }

    document.querySelectorAll('[data-filter]').forEach(el => {
        el.addEventListener('click', () => {
            applyFilter(el.dataset.filter);
        });
    });
});
