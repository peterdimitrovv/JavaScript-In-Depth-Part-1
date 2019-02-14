var PeteJsLibrary = {
    getElement: function(id){
        return document.getElementById(id);
    },
    createElement: function(tag){
        var element = document.createElement(tag);
        return element;
    },
    appendElement: function (parent, child) {
        parent.appendChild(child);
        return this;
    },
    addElement: function(existingElement, newElement){
        var element = document.createElement(newElement);
        existingElement.appendChild(element);
        return this;
    },
    deleteElement: function(element){
        element.parentNode.removeChild(element);
        return this;
    },
    changeAttributes: function(attribute, attributeName, newAttributeName){
        if(attribute === "id"){
            var element = document.getElementById(attributeName);
            element.setAttribute(attribute, newAttributeName);
        }
        return this;
    },
    addAttributes: function(element, attribute, attributeName){
        if(attribute === "id" || attribute === "name" || attribute === "class"){
            element.setAttribute(attribute, attributeName);
        }
        return this;
    },
    addAttributeData: function (element, property, value) {
        element.setAttribute(`data-${property}`, value);
        return this;
    },
    changeTextContent: function(element, text){
        element.textContent = null;
        var textContent = document.createTextNode(text);
        element.appendChild(textContent);
        return text;
    },
    changeHtmlContent: function(element, content){
        return element.innerHTML = content;
    }, 
    cssStyle: function(element, styleProperty, styleValue){
        element.style[styleProperty] = styleValue;
        return styleProperty + ": " + styleValue;
    }, 
    accessParent: function(element){
        return element.parentElement.nodeName;
    },
    accessChild: function(element){
        return element.childNodes;
    },
    accessPreviousSibling: function(element){
        return element.previousSibling.innerHTML;
    },
    accessNextSibling: function(element){
        return element.nextSibling.innerHTML;
    },
    accessAllChildren: function(){
        return document.body.children;
    }, 
    eventListener: function(element, event, callBack){
        element.addEventListener(event, callBack);
    }
}
