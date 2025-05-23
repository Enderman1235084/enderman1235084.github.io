const jsjs = {
    dynamicElement : undefined,
    linkElements : [],
    scriptElements : [],
    
    loadHTML: async function (filePath) {
        if (this.dynamicElement === undefined || this.dynamicElement === null || !(this.dynamicElement instanceof HTMLElement)) {
            console.warn("dynamicElement may not be set, please set an element that is an HTML Element for dynamic site display");
        }
        else {
            this.linkElements = [];
            this.scriptElements = [];
            const response = await fetch(filePath);
            if (!response.ok) {
                console.error("Error with response, status: " + response.status);
            }
            else {
                this.dynamicElement.innerHTML = await response.text();
            }
        }
    },
    
    loadCSS: function(filePath) {
        let linkElement = document.createElement("link");
        linkElement.rel = "stylesheet";
        linkElement.href = filePath;
        document.querySelector("head").appendChild(linkElement);
        this.linkElements.push(linkElement);
    },
    
    loadJS: function(filePath) {
        let scriptElement = document.createElement("script");
        scriptElement.src = filePath;
        document.querySelector("head").appendChild(scriptElement);
        this.scriptElements.push(scriptElement);
    },
    
    load: async function ({html, css, js}) {
        if (css) this.loadCSS(css);
        if (html) {
            await this.loadHTML(html)
            this.linkElements = [];
            this.scriptElements = [];
        }
        if (js) this.loadJS(js)
    }
};