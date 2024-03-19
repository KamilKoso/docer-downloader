const NOT_READY_COLOR = "#c95145";
const READY_COLOR = "#4caf50";

const captchaDiv = document.getElementById("recap-show");
const downloadButton = document.getElementById("dwn_btn");
const pageContent = document.getElementById("content");

function handleMutations(mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === "attributes" && mutation.attributeName === "data-pdf-url") {
      try {
        const downloadUrl = mutation.target.getAttribute("data-pdf-url");
        adjustDownloadButton(downloadUrl);
      } catch (err) {
        downloadButton.style.borderColor = NOT_READY_COLOR;
        throw err;
      } finally {
        observer.disconnect();
      }
    }
  }
}

function adjustDownloadButton(downloadUrl) {
  downloadButton.onclick = () => {
    window.open(downloadUrl, "_blank").focus();
  };
  downloadButton.style.borderColor = READY_COLOR;
}

function main() {
  console.log(captchaDiv);
  captchaDiv.innerHTML += "<br>Uzupełnij captche aby pobrać plik bez opłat"
  const observer = new MutationObserver(handleMutations);
  observer.observe(document.documentElement, {
    attributes: true,
    subtree: true,
  });
}

main();
