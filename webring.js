const JSON_WEBRING = "https://gablaxy.github.io/webring.json";

const template = document.createElement("template");
template.innerHTML = `
<style>
#webring-inner a{
    color: var(--titres);
    text-decoration: none;
}

#webring-inner a:hover{
    color: var(--hover);
}

#webring-inner{
    color: var(--texte);
}

</style>

<br>
<b class="black" id="webring-inner">
    <!-- Webring content -->
</b>
<br>
`;

class Webring extends HTMLElement {
    connectedCallback() {

        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const currentSite = this.getAttribute("site");
        // ou sinon on peut aller chercher le paramètre site dans la déclaration du widget

        fetch(JSON_WEBRING)
            .then((response) => response.json())
            .then((sites) => {
                // Va chercher les infos du site actuel dans le json
                const matchedSiteIndex = sites.findIndex(
                    (site) => site.url === currentSite
                )

                // stocke les index des sites avant et après dans le json
                let previousSiteIndex = matchedSiteIndex - 1;
                if(previousSiteIndex < 0)previousSiteIndex = sites.length - 1;
                
                let nextSiteIndex = matchedSiteIndex + 1;
                if(nextSiteIndex >= sites.length)nextSiteIndex = 0;

                
                const content = `
                <a href="${sites[previousSiteIndex].url}" rel="prev noreferrer external">&lt; avant</a>
                /   
               <a rel="external noreferrer" href="${sites[matchedSiteIndex].url}">${sites[matchedSiteIndex].name}</a>
                 / 
               <a href="${sites[nextSiteIndex].url}" rel="next noreferrer external">après &gt;</a>
                `;

                this.shadowRoot
                    .querySelector("#webring-inner")
                    .insertAdjacentHTML("afterbegin", content);
            });
    }
}

window.customElements.define("webring-iutechno", Webring);