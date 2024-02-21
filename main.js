const NOT_READY_COLOR = "#c95145";
const READY_COLOR = "#4caf50";

const downloadButton = document.getElementById("dwn_btn");
const pageContent = document.getElementById("content");


async function getDownloadUrl() {
    const item_id = downloadButton.getAttribute("data-id");
    const formData = new FormData();
    formData.append('item_id', item_id);
    formData.append('rc', Math.floor((Math.random() * 9) + 1));

    const result = await fetch("/start/download", {
        method: "POST",
        credentials: "include",
        body: formData
      });
      
      if(result.status !== 200) {
        throw new Error(`Couldn't fetch download URL`, result);
      }

      return (await result.json()).response.url
}


async function main() {
  downloadButton.style.borderColor = NOT_READY_COLOR;
  const downloadUrl = await getDownloadUrl();

  downloadButton.onclick= () => {
    window.open(downloadUrl, '_blank').focus();
  };
  downloadButton.style.borderColor = READY_COLOR;
}

main();
