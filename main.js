const PDF_DOWNLOAD_URL_ATTRIBUTE = "data-pdf-url";
const MUTATION_OBSERVER_CONFIG = {
    attributes: true, 
    attributeFilter: [PDF_DOWNLOAD_URL_ATTRIBUTE],
    subtree: true
}

const NOT_READY_COLOR = "#c95145"
const READY_COLOR = "#4caf50"


const downloadButton = document.getElementById("dwn_btn")
const pageContent = document.getElementById("content");

function handleAttributeChange(mutationsList, observer) {
    for(const mutation of mutationsList) {
        console.log(mutation);
        if (mutation.type === 'attributes' && mutation.attributeName === PDF_DOWNLOAD_URL_ATTRIBUTE) {
           const downloadUrl = mutation.target.getAttribute(PDF_DOWNLOAD_URL_ATTRIBUTE);
           downloadButton.onclick = () => {
                window.open(downloadUrl, '_blank').focus();
           };
           downloadButton.style.borderColor = READY_COLOR;
           observer.disconnect();
        }
    }
}


function main() {
    downloadButton.style.borderColor = NOT_READY_COLOR;
    const observer = new MutationObserver(handleAttributeChange);
    observer.observe(pageContent, MUTATION_OBSERVER_CONFIG)
}

main();