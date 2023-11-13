# Webring

### Rejoindre le webring :
- faire une demande pour modifier le json de ce repository avec les deux lignes suivantes :
```json
{
        "name": "nom_de_votre_site",
        "url": "url_de_votre_site"
				}
```
 - rajouter ces deux lignes au bas de son footer (ou quelque-part d'autre)
```html
<webring-iutechno site="url_de_votre_site_dans_le_json"></webring-iutechno>
<script src="./webring.js"></script>
```
- télécharger le fichier webring.js sur votre site et éditez le chemin du script ci dessus en conséquence, pour l'instant ça marche comme ça mais quand j'aurais un serveur perso vous pourrez passer un lien vers ce serveur pour avoir la dernière version du script.
