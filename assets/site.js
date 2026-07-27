(function(){
  const toggle=document.querySelector(".nav-toggle");
  const nav=document.querySelector(".site-nav");
  if(toggle&&nav){
    const desktopQuery=window.matchMedia("(min-width:900px)");

    function setMenuOpen(isOpen,returnFocus){
      toggle.setAttribute("aria-expanded",String(isOpen));
      toggle.setAttribute("aria-label",isOpen?"Fermer le menu de navigation":"Ouvrir le menu de navigation");
      nav.classList.toggle("is-open",isOpen);
      if(!isOpen){
        nav.querySelectorAll("details[open]").forEach(function(details){
          details.removeAttribute("open");
        });
        if(returnFocus){
          toggle.focus();
        }
      }
    }

    setMenuOpen(false,false);

    toggle.addEventListener("click",function(){
      const isOpen=toggle.getAttribute("aria-expanded")==="true";
      setMenuOpen(!isOpen,false);
    });

    toggle.addEventListener("keydown",function(event){
      if(event.key==="Enter"||event.key===" "||event.key==="Spacebar"){
        event.preventDefault();
        const isOpen=toggle.getAttribute("aria-expanded")==="true";
        setMenuOpen(!isOpen,false);
      }
    });

    nav.addEventListener("click",function(event){
      if(event.target.closest("a")){
        setMenuOpen(false,false);
      }
    });

    document.addEventListener("keydown",function(event){
      if(event.key==="Escape"&&toggle.getAttribute("aria-expanded")==="true"){
        setMenuOpen(false,true);
      }
    });

    desktopQuery.addEventListener("change",function(event){
      if(event.matches){
        setMenuOpen(false,false);
      }
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
      return ['<article class="offer-card">','<div class="offer-card-top">','<div class="badge-row"><span class="pill">'+escapeHtml(offer.category)+"</span>",offer.badge?'<span class="pill accent">'+escapeHtml(offer.badge)+"</span>":"","</div>",titleRow(offer.name,offer.primaryBenefit),"<p>"+escapeHtml(offer.summary)+"</p>","</div>",'<ul class="mini-list">',offer.benefits.map(function(item){return"<li>"+escapeHtml(item)+"</li>";}).join(""),"</ul>",'<p class="disclosure">'+escapeHtml(offer.disclosure)+"</p>",'<a class="button primary wide" href="'+escapeHtml(offer.url)+'">'+escapeHtml(offer.cta)+"</a>","</article>"].join("");
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
  const submit=form.querySelector('button[type="submit"]');
  const defaultSubmitLabel=submit?submit.textContent:"";
  const config=window.ECOMILIE_CONTACT_CONFIG||{};
  const endpoint=String(config.FORM_ENDPOINT||form.getAttribute("action")||"").trim();
  const fields=Array.from(form.querySelectorAll("input, textarea, button"));
  function setStatus(message,type){
    if(!status)return;
    status.textContent=message;
    status.dataset.type=type||"";
  }
  function setFormDisabled(disabled){
    fields.forEach(function(field){
      field.disabled=disabled;
    });
  }
  function submitWithIframe(payload){
    return new Promise(function(resolve,reject){
      let submitted=false;
      const iframe=document.createElement("iframe");
      iframe.name="contact-form-frame-"+Date.now();
      iframe.className="sr-only";
      iframe.addEventListener("load",function(){
        if(!submitted){return;}
        iframe.remove();
        resolve();
      });
      iframe.addEventListener("error",function(){
        iframe.remove();
        reject(new Error("iframe failed"));
      },{once:true});
      const fallback=document.createElement("form");
      fallback.method="POST";
      fallback.action=endpoint;
      fallback.target=iframe.name;
      fallback.className="sr-only";
      payload.forEach(function(value,key){
        const input=document.createElement("input");
        input.type="hidden";
        input.name=key;
        input.value=value;
        fallback.appendChild(input);
      });
      document.body.appendChild(iframe);
      document.body.appendChild(fallback);
      setTimeout(function(){
        submitted=true;
        fallback.submit();
        fallback.remove();
      },0);
      setTimeout(function(){
        if(document.body.contains(iframe)){
          iframe.remove();
          resolve();
        }
      },5000);
    });
  }
  if(!endpoint){
    if(submit){submit.disabled=true;}
    setStatus("Le formulaire de contact sera disponible tr\u00e8s prochainement.","");
    return;
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
    if(email&&!email.validity.valid){
      setStatus("Merci d'indiquer une adresse e-mail valide.","error");
      return;
    }
    const payload=new FormData(form);
    setFormDisabled(true);
    if(submit){
      submit.textContent="Envoi en cours\u2026";
    }
    try{
      const response=await fetch(endpoint,{method:"POST",body:payload,headers:{Accept:"application/json"}});
      if(!response.ok){throw new Error("send failed");}
      form.reset();
      setStatus("Merci ! Votre message a bien \u00e9t\u00e9 envoy\u00e9.","success");
    }catch(error){
      try{
        await submitWithIframe(payload);
        form.reset();
        setStatus("Merci ! Votre message a bien \u00e9t\u00e9 envoy\u00e9.","success");
      }catch(fallbackError){
        setStatus("Une erreur est survenue. Vous pouvez r\u00e9essayer dans quelques instants.","error");
      }
    }finally{
      setFormDisabled(false);
      if(submit){
        submit.textContent=defaultSubmitLabel;
      }
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

(function(){
  const shareButtons=document.querySelectorAll('[data-copy-link]');
  if(!shareButtons.length)return;
  shareButtons.forEach(function(button){
    button.addEventListener('click',async function(){
      const url=button.getAttribute('data-copy-url')||window.location.href;
      const share=button.closest('.article-share');
      const status=share?share.querySelector('[data-copy-status]'):null;
      const initial=button.innerHTML;
      try{
        if(navigator.clipboard&&window.isSecureContext){
          await navigator.clipboard.writeText(url);
        }else{
          const input=document.createElement('textarea');
          input.value=url;
          input.setAttribute('readonly','');
          input.style.position='absolute';
          input.style.left='-9999px';
          document.body.appendChild(input);
          input.select();
          document.execCommand('copy');
          input.remove();
        }
        if(status){status.textContent='Lien copi\u00e9.';}
        button.innerHTML='<span class="share-icon" aria-hidden="true">OK</span><span>Lien copi\u00e9</span>';
        setTimeout(function(){button.innerHTML=initial;if(status){status.textContent='';}},2200);
      }catch(error){
        if(status){status.textContent='Impossible de copier le lien pour le moment.';}
      }
    });
  });
})();


(function(){
  const forms=document.querySelectorAll('[data-newsletter-form]');
  if(!forms.length)return;
  const config=window.ECOMILIE_NEWSLETTER_CONFIG||{};
  const endpoint=String(config.SUBSCRIBE_ENDPOINT||'').trim();

  function setStatus(form,message,type){
    const status=form.querySelector('[data-newsletter-status]');
    if(!status)return;
    status.textContent=message;
    status.dataset.type=type||'';
  }

  function setDisabled(form,disabled){
    Array.from(form.querySelectorAll('input,button')).forEach(function(field){
      field.disabled=disabled;
    });
  }

  forms.forEach(function(form){
    const submit=form.querySelector('button[type="submit"]');
    const defaultLabel=submit?submit.textContent:'';
    if(!endpoint){
      setStatus(form,'Le Rendez-vous EcoMilie sera disponible tr\u00e8s prochainement.','');
    }
    form.addEventListener('submit',async function(event){
      event.preventDefault();
      const email=form.querySelector('input[type="email"]');
      const honeypot=form.querySelector('.newsletter-honeypot');
      if(honeypot&&honeypot.value){return;}
      if(!endpoint){
        setStatus(form,'Le Rendez-vous EcoMilie sera disponible tr\u00e8s prochainement.','error');
        return;
      }
      if(!email||!email.checkValidity()){
        if(email){email.focus();}
        setStatus(form,'Entre une adresse e-mail valide pour rejoindre Le Rendez-vous EcoMilie.','error');
        return;
      }
      const payload=new FormData(form);
      payload.append('source',String(config.SOURCE||'Le Rendez-vous EcoMilie'));
      try{
        if(submit){submit.textContent='Inscription en cours...';}
        setDisabled(form,true);
        const response=await fetch(endpoint,{method:'POST',body:payload,headers:{'Accept':'application/json'}});
        if(!response.ok){throw new Error('newsletter failed');}
        form.reset();
        setStatus(form,'Merci ! Bienvenue dans Le Rendez-vous EcoMilie \uD83C\uDF33 Tu recevras bient\u00f4t nos meilleurs conseils, d\u00e9fis et bons plans.','success');
      }catch(error){
        setStatus(form,"L'inscription n'a pas pu \u00eatre envoy\u00e9e pour le moment. R\u00e9essaie dans quelques instants.",'error');
      }finally{
        setDisabled(form,false);
        if(submit){submit.textContent=defaultLabel;}
      }
    });
  });
})();
