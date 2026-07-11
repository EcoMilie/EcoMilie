(function(){
  const toggle=document.querySelector(".nav-toggle");
  const nav=document.querySelector(".site-nav");
  if(toggle&&nav){
    toggle.addEventListener("click",function(){
      const isOpen=toggle.getAttribute("aria-expanded")==="true";
      toggle.setAttribute("aria-expanded",String(!isOpen));
      nav.classList.toggle("is-open",!isOpen);
    });
  }

  function escapeHtml(value){
    return String(value||"").replace(/[&<>"]/g,function(char){
      return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[char];
    });
  }

  const brandData=[
    {match:"BoursoBank",label:"BoursoBank",src:"assets/logos/boursobank.jpg"},
    {match:"Too Good To Go",label:"Too Good To Go",src:"assets/logos/too-good-to-go.png"},
    {match:"Showroompriv\u00e9",label:"Showroompriv\u00e9",src:"assets/logos/showroomprive.png"},
    {match:"Showroompriv",label:"Showroompriv\u00e9",src:"assets/logos/showroomprive.png"},
    {match:"B\u00e9b\u00e9 Boutik",label:"B\u00e9b\u00e9 Boutik",src:"assets/logos/bebeboutik.jpg"},
    {match:"Basic-Fit",label:"Basic-Fit",src:"assets/logos/basicfit.png"},
    {match:"HelloFresh",label:"HelloFresh",src:"assets/logos/hellofresh.png"},
    {match:"Foodvisor",label:"Foodvisor",src:"assets/logos/foodvisor.jpg"},
    {match:"Shopmium",label:"Shopmium",src:"assets/logos/shopmium.png"},
    {match:"eBuyClub",label:"eBuyClub",src:"assets/logos/ebuyclub.png"},
    {match:"Passtime",label:"PassTime",src:"assets/logos/passtime.png"},
    {match:"PassTime",label:"PassTime",src:"assets/logos/passtime.png"},
    {match:"PayPal",label:"PayPal",src:"assets/logos/paypal.png"},
    {match:"iGraal",label:"iGraal",src:"assets/logos/igraal.png"},
    {match:"Whatnot",label:"Whatnot",src:"assets/logos/whatnot.png"},
    {match:"Choose",label:"Choose",src:"assets/logos/choose.png"},
    {match:"ENGIE",label:"Engie",src:"assets/logos/engie.png"},
    {match:"Engie",label:"Engie",src:"assets/logos/engie.png"},
    {match:"Joko",label:"Joko",src:"assets/logos/joko.png"}
  ];

  function brandFromText(text){
    const value=String(text||"").toLowerCase();
    return brandData.find(function(brand){return value.indexOf(brand.match.toLowerCase())!==-1;})||null;
  }

  function logoImg(brand){
    return '<img class="offer-logo-img" src="'+escapeHtml(brand.src)+'" alt="Logo '+escapeHtml(brand.label)+'" width="180" height="64" loading="lazy" decoding="async" />';
  }

  function titleRow(name,subtitle){
    const brand=brandFromText(name);
    const logo=brand?logoImg(brand):"";
    return '<div class="offer-title-row">'+logo+'<div class="offer-title-copy"><h3>'+escapeHtml(name)+'</h3>'+(subtitle?'<p class="offer-benefit">'+escapeHtml(subtitle)+'</p>':"")+'</div></div>';
  }

  function renderOffers(container,offers,limit){
    if(!container||!offers)return;
    const names=(container.dataset.offers||"").split(",").map(function(name){return name.trim().toLowerCase();}).filter(Boolean);
    const selected=names.length?names.map(function(name){return offers.find(function(offer){return String(offer.name||"").toLowerCase()===name;});}).filter(Boolean):(limit?offers.slice(0,limit):offers);
    container.innerHTML=selected.map(function(offer){
      return ['<article class="offer-card">','<div class="offer-card-top">','<div class="badge-row"><span class="pill">'+escapeHtml(offer.category)+"</span>",offer.badge?'<span class="pill accent">'+escapeHtml(offer.badge)+"</span>":"",offer.usedBadge?'<span class="pill used">'+escapeHtml(offer.usedBadge)+"</span>":"","</div>",titleRow(offer.name,offer.primaryBenefit),"<p>"+escapeHtml(offer.summary)+"</p>","</div>",'<ul class="mini-list">',offer.benefits.map(function(item){return"<li>"+escapeHtml(item)+"</li>";}).join(""),"</ul>",'<p class="disclosure">'+escapeHtml(offer.disclosure)+"</p>",'<a class="button primary wide" href="'+escapeHtml(offer.url)+'">'+escapeHtml(offer.cta)+"</a>","</article>"].join("");
    }).join("");
  }

  function hydrateStaticOfferLogos(){
    document.querySelectorAll(".offer-card").forEach(function(card){
      if(card.querySelector(".offer-title-row"))return;
      const heading=card.querySelector("h3");
      if(!heading)return;
      const brand=brandFromText(heading.textContent);
      if(!brand)return;
      const row=document.createElement("div");
      row.className="offer-title-row";
      const img=document.createElement("img");
      img.className="offer-logo-img";
      img.src=brand.src;
      img.alt="Logo "+brand.label;
      img.width=180;
      img.height=64;
      img.loading="lazy";
      img.decoding="async";
      const copy=document.createElement("div");
      copy.className="offer-title-copy";
      heading.parentNode.insertBefore(row,heading);
      row.appendChild(img);
      row.appendChild(copy);
      copy.appendChild(heading);
    });
  }

  const offers=window.ECOMILIE_OFFERS||[];
  const featured=document.querySelector("#featured-offers");
  const allOffers=document.querySelector("#all-offers");
  const offerCount=document.querySelector("#offer-count");
  if(featured){renderOffers(featured,offers,Number(featured.dataset.limit||0));}
  if(allOffers){renderOffers(allOffers,offers);}
  if(offerCount){offerCount.textContent=String(offers.length);}
  hydrateStaticOfferLogos();
})();

(function(){
  const form=document.querySelector("[data-contact-form]");
  if(!form)return;
  const status=form.querySelector("[data-contact-status]");
  const endpoint=form.getAttribute("action")||"";
  function setStatus(message,type){
    if(!status)return;
    status.textContent=message;
    status.dataset.type=type||"";
  }
  form.addEventListener("submit",async function(event){
    event.preventDefault();
    setStatus("","");
    const email=form.querySelector('input[type="email"]');
    const honeypot=form.querySelector(".contact-honeypot");
    if(honeypot&&honeypot.value){return;}
    if(!form.checkValidity()){
      form.reportValidity();
      setStatus("Merci de compl\u00e9ter les champs obligatoires avec une adresse e-mail valide.","error");
      return;
    }
    if(endpoint.indexOf("VOTRE_ID_FORMULAIRE")!==-1){
      setStatus("Le formulaire est pr\u00eat. Il reste \u00e0 renseigner l'identifiant Formspree avant la mise en ligne.","error");
      return;
    }
    if(email&&!email.validity.valid){
      setStatus("Merci d'indiquer une adresse e-mail valide.","error");
      return;
    }
    try{
      const response=await fetch(endpoint,{method:"POST",body:new FormData(form),headers:{Accept:"application/json"}});
      if(!response.ok){throw new Error("send failed");}
      form.reset();
      setStatus("Merci ! Votre message a bien \u00e9t\u00e9 envoy\u00e9.","success");
    }catch(error){
      setStatus("Une erreur est survenue. Vous pouvez r\u00e9essayer dans quelques instants.","error");
    }
  });
})();

(function(){
  const counter=document.querySelector('[data-blog-count]');
  if(!counter)return;
  const links=new Set(Array.from(document.querySelectorAll('.blog-placeholder a[href^="article-"]')).map((link)=>link.getAttribute('href')));
  const count=links.size;
  counter.innerHTML='&#128218; '+count+' article'+(count>1?'s':'')+' disponible'+(count>1?'s':'');
})();
