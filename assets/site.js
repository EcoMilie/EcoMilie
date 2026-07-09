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
    {match:"BoursoBank",label:"BoursoBank",mark:"BB"},
    {match:"Too Good To Go",label:"Too Good To Go",mark:"TG"},
    {match:"Showroompriv\u00e9",label:"Showroompriv\u00e9",mark:"SP"},
    {match:"B\u00e9b\u00e9 Boutik",label:"B\u00e9b\u00e9 Boutik",mark:"BB"},
    {match:"Basic-Fit",label:"Basic-Fit",mark:"BF"},
    {match:"HelloFresh",label:"HelloFresh",mark:"HF"},
    {match:"Foodvisor",label:"Foodvisor",mark:"FV"},
    {match:"Shopmium",label:"Shopmium",mark:"SH"},
    {match:"eBuyClub",label:"eBuyClub",mark:"EC"},
    {match:"Passtime",label:"PassTime",mark:"PT"},
    {match:"PassTime",label:"PassTime",mark:"PT"},
    {match:"PayPal",label:"PayPal",mark:"PP"},
    {match:"iGraal",label:"iGraal",mark:"IG"},
    {match:"Choose",label:"Choose",mark:"CH"},
    {match:"ENGIE",label:"Engie",mark:"EN"},
    {match:"Engie",label:"Engie",mark:"EN"},
    {match:"Joko",label:"Joko",mark:"JO"}
  ];

  function brandFromText(text){
    const value=String(text||"").toLowerCase();
    return brandData.find(function(brand){return value.indexOf(brand.match.toLowerCase())!==-1;})||null;
  }

  function brandLogo(name){
    const brand=brandFromText(name)||{label:String(name||"").split(":")[0].trim(),mark:String(name||"").trim().slice(0,2).toUpperCase()};
    if(!brand.label)return "";
    return '<div class="offer-brand-logo" aria-label="Logo '+escapeHtml(brand.label)+'"><span class="offer-logo-mark">'+escapeHtml(brand.mark)+'</span><span class="offer-logo-name">'+escapeHtml(brand.label)+'</span></div>';
  }

  function renderOffers(container,offers,limit){
    if(!container||!offers)return;
    const selected=limit?offers.slice(0,limit):offers;
    container.innerHTML=selected.map(function(offer){
      return ['<article class="offer-card">',brandLogo(offer.name),'<div class="offer-card-top">','<div class="badge-row"><span class="pill">'+escapeHtml(offer.category)+"</span>",offer.badge?'<span class="pill accent">'+escapeHtml(offer.badge)+"</span>":"",offer.usedBadge?'<span class="pill used">'+escapeHtml(offer.usedBadge)+"</span>":"","</div>","<h3>"+escapeHtml(offer.name)+"</h3>",offer.primaryBenefit?'<p class="offer-benefit">'+escapeHtml(offer.primaryBenefit)+"</p>":"","<p>"+escapeHtml(offer.summary)+"</p>","</div>",'<ul class="mini-list">',offer.benefits.map(function(item){return"<li>"+escapeHtml(item)+"</li>";}).join(""),"</ul>",'<p class="disclosure">'+escapeHtml(offer.disclosure)+"</p>",'<a class="button primary wide" href="'+escapeHtml(offer.url)+'">'+escapeHtml(offer.cta)+"</a>","</article>"].join("");
    }).join("");
  }

  function hydrateStaticOfferLogos(){
    document.querySelectorAll(".offer-card").forEach(function(card){
      if(card.querySelector(".offer-brand-logo"))return;
      const heading=card.querySelector("h3,h1,h2");
      const brand=brandFromText(heading?heading.textContent:"");
      if(!brand)return;
      const wrapper=document.createElement("div");
      wrapper.className="offer-brand-logo";
      wrapper.setAttribute("aria-label","Logo "+brand.label);
      const mark=document.createElement("span");
      mark.className="offer-logo-mark";
      mark.textContent=brand.mark;
      const label=document.createElement("span");
      label.className="offer-logo-name";
      label.textContent=brand.label;
      wrapper.append(mark,label);
      card.prepend(wrapper);
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
