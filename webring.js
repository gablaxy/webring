const JSON_WEBRING = "https://raw.githubusercontent.com/gablaxy/webring/main/webring.json";

const template = document.createElement("template");
template.innerHTML = `
<style>
#webring-container{
    margin-top: 10px;
    border: 1px solid #9162c7;
    border-radius: 5px;
    padding: 5px;
    display: inline-flex;
    background-color: #222326;
}

#webring-title{
    font-family: Title;
    color: #c296f5;
    margin-top: 0;
    margin-bottom: 3px;
    padding: 0 5px;
    font-size: 0.8em;
}

#webring-inner a{
    color: #9162c7;
    text-decoration: none;
    padding: 0 5px;
}

#webring-inner a:hover{
    color: #c296f5;
}

#webring-inner{
    font-family: FreePixel;
    color: #c296f5;
    padding: 0 5px;
}
</style>

<div id="webring-container">
    <b class="black" id="webring-inner">
        <!-- Webring content -->
    </b>
</div>
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
                <h3 id="webring-title">grossomodo</h3>
                <a href="${sites[previousSiteIndex].url}" rel="prev noreferrer external">&lt; avant</a>
                /   
               <a rel="external noreferrer" href="${sites[matchedSiteIndex].url}">${sites[matchedSiteIndex].name}</a>
                 / 
               <a href="${sites[nextSiteIndex].url}" rel="next noreferrer external">après &gt;</a>
                `;

                this.shadowRoot
                    .querySelector("#webring-inner")
                    .insertAdjacentHTML("afterbegin", content);
            })
            .catch((error) => {
                console.error(error);
                const content = `
                <h3 id="webring-title">grossomodo</h3>
                <p>T'es pas dans le gang bozo</p>
                `;
                
                this.shadowRoot
                    .querySelector("#webring-inner")
                    .insertAdjacentHTML("afterbegin", content);
            });
    }
}

window.customElements.define("webring-iutechno", Webring);
