
(() => {
  const $ = (q, root=document) => root.querySelector(q);
  const $$ = (q, root=document) => [...root.querySelectorAll(q)];
  const WHATSAPP = "3814099809";
  const assetMap = {papa:"assets/papa.jpg", harina:"assets/harina.jpg", ruta:"assets/ruta.jpg", premium:"assets/premium.jpg"};
  const imageCache = {};
  let customBgUrl = "";

  const storage = {
    get(k, fallback){ try{return JSON.parse(localStorage.getItem(k)) ?? fallback}catch{return fallback} },
    set(k,v){ localStorage.setItem(k, JSON.stringify(v)); }
  };

  let loads = storage.get("cargasHoy.loads", []);
  let carriers = storage.get("cargasHoy.carriers", []);

  function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]))}
  function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,7)}
  function cargo(){return $('input[name="cargo"]:checked').value}
  function template(){return $('input[name="template"]:checked').value}
  function data(){
    return {
      cargo:cargo(),
      origin:$("#origin").value.trim() || "Origen",
      destination:$("#destination").value.trim() || "Destino",
      when:$("#when").value,
      price:Math.max(0, Number($("#price").value)||0),
      trucks:Math.max(0, Math.min(99, Number($("#trucks").value)||0)),
      template:template()
    };
  }

  function formatMoney(n){return new Intl.NumberFormat("es-AR").format(n)}

  function setTab(id){
    $$(".tab").forEach(b=>b.classList.toggle("active", b.dataset.tab===id));
    $$(".panel").forEach(p=>p.classList.toggle("active", p.id===id));
    if(id==="cargas") renderLoads();
    if(id==="transportistas") renderCarriers();
    if(id==="guia") refreshGuideSelects();
  }
  $$(".tab").forEach(b=>b.addEventListener("click",()=>setTab(b.dataset.tab)));

  function getImg(src){
    if(imageCache[src]) return Promise.resolve(imageCache[src]);
    return new Promise((resolve,reject)=>{
      const img=new Image();
      img.onload=()=>{imageCache[src]=img;resolve(img)};
      img.onerror=reject;
      img.src=src;
    });
  }

  function roundRect(ctx,x,y,w,h,r,fill,stroke){
    ctx.beginPath(); ctx.roundRect(x,y,w,h,r);
    if(fill){ctx.fillStyle=fill;ctx.fill()}
    if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=4;ctx.stroke()}
  }

  function fitText(ctx,text,maxWidth,startSize,minSize=34){
    let size=startSize;
    do{ctx.font=`900 ${size}px Arial, sans-serif`; if(ctx.measureText(text).width<=maxWidth) return size; size-=2}while(size>minSize);
    return minSize;
  }

  function drawWhatsappIcon(ctx,x,y,r){
    ctx.save();
    ctx.fillStyle="#25D366"; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle="white"; ctx.lineWidth=Math.max(8,r*.16); ctx.lineCap="round";
    ctx.beginPath(); ctx.arc(x,y,r*.52,Math.PI*.15,Math.PI*1.55); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x-r*.36,y+r*.33); ctx.lineTo(x-r*.48,y+r*.55); ctx.lineTo(x-r*.18,y+r*.47); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x-r*.24,y-r*.15); ctx.quadraticCurveTo(x,y+r*.14,x+r*.28,y+r*.22); ctx.stroke();
    ctx.restore();
  }

  async function drawStory(){
    const d=data(), c=$("#storyCanvas"), ctx=c.getContext("2d");
    const src=customBgUrl || assetMap[d.template];
    const img=await getImg(src);
    ctx.clearRect(0,0,c.width,c.height);

    // cover
    const ir=img.width/img.height, cr=c.width/c.height;
    let sw=img.width, sh=img.height, sx=0, sy=0;
    if(ir>cr){sw=img.height*cr; sx=(img.width-sw)/2}else{sh=img.width/cr; sy=(img.height-sh)/2}
    ctx.drawImage(img,sx,sy,sw,sh,0,0,c.width,c.height);

    // readability gradients
    const g=ctx.createLinearGradient(0,0,0,1000);
    g.addColorStop(0,"rgba(0,0,0,.72)"); g.addColorStop(.55,"rgba(0,0,0,.22)"); g.addColorStop(1,"rgba(0,0,0,0)");
    ctx.fillStyle=g; ctx.fillRect(0,0,1080,1050);

    // top availability badge
    roundRect(ctx,84,80,912,108,34,"rgba(5,91,39,.94)","#f0c844");
    ctx.fillStyle="white"; ctx.textAlign="center"; ctx.textBaseline="middle";
    ctx.font="900 50px Arial";
    ctx.fillText(`CARGA DISPONIBLE ${d.when.toUpperCase()}`,540,134);

    // headline
    const word=d.cargo==="papa"?"PAPA":"HARINA";
    ctx.textAlign="center";
    ctx.fillStyle="white"; ctx.font="900 76px Arial"; ctx.fillText("CARGA DE",540,310);
    const fs=fitText(ctx,word,840,150,90);
    ctx.font=`900 ${fs}px Arial`; ctx.fillStyle="#f3c640"; ctx.strokeStyle="rgba(0,0,0,.65)"; ctx.lineWidth=10;
    ctx.strokeText(word,540,445); ctx.fillText(word,540,445);

    // route box
    roundRect(ctx,75,530,930,220,34,"rgba(0,0,0,.70)","#f3c640");
    ctx.textAlign="left"; ctx.fillStyle="#e8e8e8"; ctx.font="700 34px Arial"; ctx.fillText("ORIGEN",125,598);
    ctx.fillStyle="white"; ctx.font="900 52px Arial"; ctx.fillText(d.origin,125,660);
    ctx.textAlign="right"; ctx.fillStyle="#e8e8e8"; ctx.font="700 34px Arial"; ctx.fillText("DESTINO",955,598);
    ctx.fillStyle="white"; ctx.font="900 52px Arial"; ctx.fillText(d.destination,955,660);
    ctx.textAlign="center"; ctx.fillStyle="#f3c640"; ctx.font="900 64px Arial"; ctx.fillText("→",540,652);

    // price or flour timing
    if(d.cargo==="papa"){
      roundRect(ctx,155,790,770,180,28,"rgba(73,36,0,.87)",null);
      ctx.fillStyle="#f3c640"; ctx.font="900 92px Arial"; ctx.textAlign="center";
      ctx.fillText(d.price ? `$${formatMoney(d.price)}` : "PRECIO A CONFIRMAR",540,875);
      ctx.fillStyle="white"; ctx.font="900 48px Arial"; ctx.fillText(d.price ? "LA BOLSA" : "",540,935);
    } else {
      roundRect(ctx,155,790,770,160,28,"rgba(73,36,0,.87)",null);
      ctx.fillStyle="#f3c640"; ctx.font="900 62px Arial"; ctx.textAlign="center";
      ctx.fillText(`SE CARGA ${d.when.toUpperCase()}`,540,885);
    }

    if(d.trucks){
      roundRect(ctx,235,1010,610,92,24,"rgba(0,0,0,.76)",null);
      ctx.fillStyle="white"; ctx.font="900 38px Arial"; ctx.textAlign="center";
      ctx.fillText(`SE NECESITAN ${d.trucks} ${d.trucks===1?"CAMIÓN":"CAMIONES"}`,540,1060);
    }

    // CTA to reply
    roundRect(ctx,110,1320,860,150,34,"rgba(0,0,0,.78)","#f3c640");
    ctx.fillStyle="white"; ctx.font="900 42px Arial"; ctx.textAlign="center";
    ctx.fillText("RESPONDÉ ESTA HISTORIA",540,1380);
    ctx.fillStyle="#f3c640"; ctx.font="900 40px Arial"; ctx.fillText("PARA RESERVAR TU VIAJE",540,1432);

    // fixed CTA bottom
    roundRect(ctx,45,1650,990,205,54,"rgba(0,83,39,.96)","#f3c640");
    drawWhatsappIcon(ctx,175,1752,76);
    ctx.textAlign="left"; ctx.fillStyle="white"; ctx.font="800 42px Arial"; ctx.fillText("Comunicarse al",295,1715);
    ctx.fillStyle="#ffe46d"; ctx.font="900 72px Arial"; ctx.fillText(WHATSAPP,295,1795);
  }

  async function canvasBlob(){
    await drawStory();
    return new Promise(resolve=>$("#storyCanvas").toBlob(resolve,"image/png"));
  }

  $("#storyForm").addEventListener("submit",async e=>{e.preventDefault();await drawStory();$("#formStatus").textContent="Historia actualizada."});
  ["#origin","#destination","#when","#price","#trucks"].forEach(q=>$(q).addEventListener("input",drawStory));

  $$('input[name="cargo"]').forEach(r=>r.addEventListener("change",()=>{
    const isPapa=cargo()==="papa";
    $("#priceWrap").classList.toggle("hidden",!isPapa);
    if(isPapa){$('input[name="template"][value="papa"]').checked=true}
    else{$('input[name="template"][value="harina"]').checked=true}
    updateTemplateSelection(); drawStory();
  }));

  function updateTemplateSelection(){
    $$(".template").forEach(l=>l.classList.toggle("selected",$('input',l).checked));
  }
  $$('input[name="template"]').forEach(r=>r.addEventListener("change",()=>{customBgUrl="";$("#customBg").value="";updateTemplateSelection();drawStory()}));

  $("#customBg").addEventListener("change",e=>{
    const f=e.target.files?.[0]; if(!f)return;
    const rd=new FileReader();
    rd.onload=()=>{customBgUrl=rd.result;drawStory()};
    rd.readAsDataURL(f);
  });

  $("#downloadStory").addEventListener("click",async()=>{
    const blob=await canvasBlob();
    const a=document.createElement("a");
    a.href=URL.createObjectURL(blob);
    const d=data();
    a.download=`carga-${d.cargo}-${d.origin}-${d.destination}`.replace(/[^\w-]+/g,"-").toLowerCase()+".png";
    a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),1000);
    $("#storyStatus").textContent="Historia descargada.";
  });

  $("#shareStory").addEventListener("click",async()=>{
    const blob=await canvasBlob();
    const file=new File([blob],"carga-whatsapp.png",{type:"image/png"});
    try{
      if(navigator.canShare?.({files:[file]})){await navigator.share({files:[file],title:"Carga disponible"});$("#storyStatus").textContent="Lista para compartir."}
      else{$("#storyStatus").textContent="En este dispositivo usá Descargar PNG y subila a WhatsApp."}
    }catch(e){if(e.name!=="AbortError")$("#storyStatus").textContent="No se pudo compartir; podés descargarla."}
  });

  $("#saveLoad").addEventListener("click",()=>{
    const d=data();
    loads.unshift({id:uid(),...d,status:"disponible",createdAt:new Date().toISOString()});
    storage.set("cargasHoy.loads",loads);
    $("#formStatus").textContent="Carga guardada.";
    refreshGuideSelects();
  });

  function renderLoads(){
    const box=$("#loadsList");
    if(!loads.length){box.innerHTML='<div class="empty">Todavía no guardaste cargas.</div>';return}
    box.innerHTML=loads.map(l=>`
      <div class="list-item" data-id="${l.id}">
        <div class="list-item-head">
          <div><strong>${esc(l.cargo==="papa"?"Papa":"Harina")} · ${esc(l.origin)} → ${esc(l.destination)}</strong>
          <div class="meta">${esc(l.when)}${l.cargo==="papa"&&l.price?` · $${formatMoney(l.price)} la bolsa`:""}${l.trucks?` · ${l.trucks} ${l.trucks===1?"camión":"camiones"}`:""}</div></div>
          <span class="pill ${esc(l.status)}">${esc(l.status.toUpperCase())}</span>
        </div>
        <div class="item-actions">
          <button data-action="status" data-status="disponible">Disponible</button>
          <button data-action="status" data-status="asignada">Asignada</button>
          <button data-action="status" data-status="cerrada">Cerrada</button>
          <button data-action="delete">Eliminar</button>
        </div>
      </div>`).join("");
  }

  $("#loadsList").addEventListener("click",e=>{
    const b=e.target.closest("button"); if(!b)return;
    const item=e.target.closest(".list-item"); const i=loads.findIndex(x=>x.id===item.dataset.id); if(i<0)return;
    if(b.dataset.action==="delete") loads.splice(i,1);
    if(b.dataset.action==="status") loads[i].status=b.dataset.status;
    storage.set("cargasHoy.loads",loads);renderLoads();refreshGuideSelects();
  });

  $("#clearClosed").addEventListener("click",()=>{loads=loads.filter(l=>l.status!=="cerrada");storage.set("cargasHoy.loads",loads);renderLoads();refreshGuideSelects()});

  $("#carrierForm").addEventListener("submit",e=>{
    e.preventDefault();
    const c={
      id:uid(), name:$("#carrierName").value.trim(), cuit:$("#carrierCuit").value.trim(),
      driver:$("#driverName").value.trim(), cuil:$("#driverCuil").value.trim(),
      phone:$("#driverPhone").value.trim(), chassis:$("#chassisPlate").value.trim().toUpperCase(),
      trailer:$("#trailerPlate").value.trim().toUpperCase()
    };
    carriers.unshift(c); storage.set("cargasHoy.carriers",carriers);
    e.target.reset(); $("#carrierStatus").textContent="Transportista guardado."; renderCarriers(); refreshGuideSelects();
  });

  function renderCarriers(){
    const box=$("#carriersList");
    if(!carriers.length){box.innerHTML='<div class="empty">Todavía no guardaste transportistas.</div>';return}
    box.innerHTML=carriers.map(c=>`
      <div class="list-item" data-id="${c.id}">
        <div class="list-item-head"><div><strong>${esc(c.name)}</strong><div class="meta">CUIT ${esc(c.cuit)}<br>${esc(c.driver)} · CUIL ${esc(c.cuil)}<br>Chasis ${esc(c.chassis)} · Acoplado ${esc(c.trailer)}<br>${esc(c.phone)}</div></div></div>
        <div class="item-actions"><button data-action="delete-carrier">Eliminar</button></div>
      </div>`).join("");
  }
  $("#carriersList").addEventListener("click",e=>{
    const b=e.target.closest("button[data-action='delete-carrier']"); if(!b)return;
    const id=e.target.closest(".list-item").dataset.id;
    carriers=carriers.filter(c=>c.id!==id);storage.set("cargasHoy.carriers",carriers);renderCarriers();refreshGuideSelects();
  });

  function refreshGuideSelects(){
    $("#guideLoad").innerHTML=loads.length?loads.map(l=>`<option value="${l.id}">${esc(l.origin)} → ${esc(l.destination)} · ${esc(l.cargo)}</option>`).join(""):'<option value="">Sin cargas guardadas</option>';
    $("#guideCarrier").innerHTML=carriers.length?carriers.map(c=>`<option value="${c.id}">${esc(c.name)} · ${esc(c.driver)} · ${esc(c.chassis)}</option>`).join(""):'<option value="">Sin transportistas guardados</option>';
  }

  function guideMessage(){
    const l=loads.find(x=>x.id===$("#guideLoad").value), c=carriers.find(x=>x.id===$("#guideCarrier").value);
    if(!l||!c)return "";
    return `DATOS PARA GUÍA DE TRASLADO

Carga: ${l.cargo==="papa"?"Papa":"Harina"}
Origen: ${l.origin}
Destino: ${l.destination}
Carga: ${l.when}

Transporte: ${c.name}
CUIT: ${c.cuit}

Chofer: ${c.driver}
CUIL: ${c.cuil}
Celular: ${c.phone}

Dominio chasis: ${c.chassis}
Dominio acoplado: ${c.trailer}`;
  }

  $("#buildGuide").addEventListener("click",()=>{$("#guideText").value=guideMessage();$("#guideStatus").textContent=$("#guideText").value?"Mensaje armado.":"Primero guardá una carga y un transportista."});
  $("#copyGuide").addEventListener("click",async()=>{
    const t=$("#guideText").value;if(!t)return;
    try{await navigator.clipboard.writeText(t);$("#guideStatus").textContent="Mensaje copiado."}
    catch{$("#guideText").select();document.execCommand("copy");$("#guideStatus").textContent="Mensaje copiado."}
  });
  $("#shareGuide").addEventListener("click",async()=>{
    const t=$("#guideText").value;if(!t)return;
    try{if(navigator.share)await navigator.share({text:t});else throw new Error()}catch(e){if(e.name!=="AbortError")$("#guideStatus").textContent="Copiá el mensaje y pegalo en WhatsApp."}
  });

  // Initial state
  renderLoads(); renderCarriers(); refreshGuideSelects(); updateTemplateSelection(); drawStory();

  if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}))}
})();
