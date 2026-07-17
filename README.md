# EcoMilie

EcoMilie est un site statique, simple et rapide, cree pour partager des bons plans, offres de parrainage, cashback, applications utiles et astuces pour economiser au quotidien.

Slogan : **Les bons plans qui font du bien au portefeuille.**

Le projet est concu pour rester gratuit au lancement : aucun abonnement, aucun outil payant obligatoire et une publication possible sur une URL gratuite Vercel ou Netlify.

## Pages incluses

- Accueil
- Offres
- Pages detaillees des offres
- Blog
- Article : Pourquoi j'ai cree EcoMilie 
- A propos
- Contact

## Offres disponibles

- BoursoBank
- Joko
- ENGIE
- Passtime
- Showroomprive
- Too Good To Go
- HelloFresh
- PayPal

## Structure du projet

```text
.
├── index.html
├── offres.html
├── blog.html
├── a-propos.html
├── contact.html
├── offre-*.html
├── article-pourquoi-j-ai-cree-ecomilie.html
├── assets/
│   ├── images/
│   ├── offers.js
│   ├── site.js
│   └── styles.css
├── netlify.toml
└── README.md
```

## Ouvrir le site en local

Le site est 100 % statique.

Option simple :

1. Ouvrir le dossier du projet.
2. Double-cliquer sur `index.html`.
3. Naviguer avec le menu du site.

Option avec serveur local :

```bash
npx serve .
```

Cette option est pratique, mais pas obligatoire.

## Publier gratuitement sur Vercel

1. Creer un compte gratuit sur Vercel.
2. Cliquer sur `Add New Project`.
3. Importer le depot GitHub `EcoMilie/EcoMilie`.
4. Laisser le projet en mode statique.
5. Verifier que le dossier racine contient bien `index.html`.
6. Cliquer sur `Deploy`.

Vercel generera une URL gratuite en `.vercel.app`.

## Publier gratuitement sur Netlify

1. Creer un compte gratuit sur Netlify.
2. Importer le depot GitHub ou glisser-deposer le dossier du site.
3. Garder la configuration statique.
4. Publier le site.

Le fichier `netlify.toml` indique deja que le dossier de publication est la racine du projet.

## Ajouter une nouvelle offre

Les cartes d'offres affichees sur l'accueil et la page Offres sont gerees dans :

```text
assets/offers.js
```

Pour ajouter une offre :

1. Dupliquer un bloc dans `window.ECOMILIE_OFFERS`.
2. Modifier le nom, la categorie, le badge, le resume, les avantages, le lien et le bouton.
3. Creer une page dediee si besoin, sur le modele des fichiers `offre-*.html`.
4. Renseigner cette page dans le champ `url`.

## Modifier un lien de parrainage

Les liens principaux se trouvent dans les pages detaillees des offres :

- `offre-boursobank.html`
- `offre-joko.html`
- `offre-engie.html`
- `offre-passtime.html`
- `offre-showroomprive.html`
- `offre-too-good-to-go.html`
- `offre-hellofresh.html`
- `offre-paypal.html`

Chercher le bouton principal de la page, puis modifier la valeur `href`.

Pour les offres avec un code plutot qu'un lien, modifier le bloc `code-box`.

## Transparence

Certaines offres peuvent contenir des liens de parrainage. EcoMilie presente les offres de facon claire, avec une mention de transparence dans les cartes, les pages d'offres et le footer.

## Contact

Pour toute question :

```text
ecomilie@proton.me
```

## Activer le formulaire de contact

Le formulaire est préparé pour Formspree, sans endpoint public par défaut.

1. Créer un formulaire dans Formspree.
2. Copier l'endpoint fourni, au format `https://formspree.io/f/...`.
3. Ouvrir `assets/contact-config.js`.
4. Coller l'endpoint entre les guillemets de `FORM_ENDPOINT`.
5. Redéployer le site.

Tant que `FORM_ENDPOINT` est vide, le bouton du formulaire reste désactivé et aucun message n'est envoyé.


## Le Rendez-vous EcoMilie

Le site contient un encart d'inscription e-mail réutilisable pour construire la base d'abonnés EcoMilie.

Configuration :

1. Créer un formulaire public dans Brevo, MailerLite, Formspree ou une fonction Vercel.
2. Copier l'endpoint public du formulaire.
3. Coller cet endpoint dans `assets/newsletter-config.js`, dans la valeur `SUBSCRIBE_ENDPOINT`.
4. Ne jamais ajouter de clé API privée dans le site. Si le service demande une clé secrète, passer par une fonction serverless Vercel.

Tant que `SUBSCRIBE_ENDPOINT` est vide, le formulaire affiche un message indiquant que Le Rendez-vous EcoMilie sera disponible très prochainement.
