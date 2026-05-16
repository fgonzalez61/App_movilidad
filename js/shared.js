/* ====== Storage compartido ====== */
const DB = {
  KEY_PROD: 'stock_productos',
  KEY_MOV:  'stock_movimientos',
  KEY_SEL:  'stock_seleccionado',

  productos(){ return JSON.parse(localStorage.getItem(this.KEY_PROD) || '[]'); },
  guardarProductos(arr){ localStorage.setItem(this.KEY_PROD, JSON.stringify(arr)); },

  movimientos(){ return JSON.parse(localStorage.getItem(this.KEY_MOV) || '[]'); },
  guardarMovimientos(arr){ localStorage.setItem(this.KEY_MOV, JSON.stringify(arr)); },

  seleccionado(){ return localStorage.getItem(this.KEY_SEL); },
  setSeleccionado(id){ localStorage.setItem(this.KEY_SEL, id); },

  agregarMovimiento(mov){
    const movs = this.movimientos();
    movs.unshift({ id: Date.now()+Math.random(), fecha: new Date().toISOString(), ...mov });
    this.guardarMovimientos(movs);
  },

  // Datos demo (solo si no hay nada cargado)
  seedSiVacio(){
    if (this.productos().length === 0){
      const demo = [
        { id:1, codigo:'PRD-001', nombre:'Auriculares Inalámbricos', categoria:'Electrónica', stock:24, minimo:10, precio:18500, descripcion:'Auriculares Bluetooth con cancelación de ruido.', img:'🎧' },
        { id:2, codigo:'PRD-002', nombre:'Teclado Mecánico RGB',     categoria:'Electrónica', stock:8,  minimo:10, precio:32000, descripcion:'Teclado mecánico switches azules, retroiluminado.', img:'⌨️' },
        { id:3, codigo:'PRD-003', nombre:'Mouse Gamer',              categoria:'Electrónica', stock:0,  minimo:5,  precio:14200, descripcion:'Mouse 16000 DPI, 7 botones programables.', img:'🖱️' },
        { id:4, codigo:'PRD-004', nombre:'Silla Ergonómica',         categoria:'Hogar',       stock:3,  minimo:2,  precio:89000, descripcion:'Silla con soporte lumbar regulable.', img:'🪑' },
        { id:5, codigo:'PRD-005', nombre:'Lámpara LED de Escritorio',categoria:'Hogar',       stock:42, minimo:8,  precio:9800,  descripcion:'Lámpara con 3 modos de luz y USB.', img:'💡' },
        { id:6, codigo:'PRD-006', nombre:'Mochila Urbana',           categoria:'Indumentaria',stock:15, minimo:5,  precio:25500, descripcion:'Mochila resistente al agua con puerto USB.', img:'🎒' },
      ];
      this.guardarProductos(demo);
    }
  }
};
DB.seedSiVacio();

/* ====== Toast ====== */
function toast(msg, type='ok'){
  let t = document.createElement('div');
  t.className = 'toast' + (type==='error'?' error':'');
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(()=>t.classList.add('show'));
  setTimeout(()=>{ t.classList.remove('show'); setTimeout(()=>t.remove(), 400); }, 2200);
}

/* ====== Helpers ====== */
function fmt$(n){ return '$' + Number(n).toLocaleString('es-AR'); }
function fmtFecha(iso){
  const d = new Date(iso);
  return d.toLocaleString('es-AR', { day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit' });
}
function estadoStock(p){
  if (p.stock === 0) return { label:'Sin stock', color:'var(--red)' };
  if (p.stock <= p.minimo) return { label:'Stock bajo', color:'var(--yellow)' };
  return { label:'Disponible', color:'var(--green)' };
}
