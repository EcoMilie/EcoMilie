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

  function brandFromText(text){
    const value=String(text||"");
    const brands=["Too Good To Go","Showroompriv\u00e9","B\u00e9b\u00e9 Boutik","Basic-Fit","BoursoBank","HelloFresh","Foodvisor","Shopmium","eBuyClub","Passtime","PayPal","iGraal","Choose","ENGIE","Joko"];
    return brands.find(function(brand){return value.toLowerCase().indexOf(brand.toLowerCase())!==-1;})||value.split(":")[0].trim();
  }

  function brandLogo(name){
    const brand=brandFromText(name);
    return brand?'<div class="offer-brand-logo" aria-label="Logo '+escapeHtml(brand)+'">'+escapeHtml(brand)+'</div>':"";
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
      const logo=document.createElement("div");
      logo.className="offer-brand-logo";
      logo.setAttribute("aria-label","Logo "+brand);
      logo.textContent=brand;
      card.prepend(logo);
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
