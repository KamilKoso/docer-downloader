const NOT_READY_COLOR = "#c95145";
const READY_COLOR = "#4caf50";

const downloadButton = document.getElementById("dwn_btn");
const pageContent = document.getElementById("content");

async function getDownloadInfo() {
  const item_id = downloadButton.getAttribute("data-id");
  const formData = new FormData();
  formData.append("item_id", item_id);
  formData.append("rc", Math.floor(Math.random() * 9 + 1));

  const result = await fetch("/start/download", {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (result.status !== 200) {
    throw new Error(`[Docer Downloader] Couldn't fetch download URL`, result);
  }

  return (await result.json()).response;
}

async function main() {
  try {
    const downloadInfo = await getDownloadInfo();
    if(downloadInfo.payment_info === 0) {
      downloadButton.style.borderColor = READY_COLOR;
      return; //* no payment required to download this document;
    }

    downloadButton.onclick = () => {
      window.open(downloadInfo.url, "_blank").focus();
    };
    downloadButton.style.borderColor = READY_COLOR;
  } catch (err) {
    downloadButton.style.borderColor = NOT_READY_COLOR;
    throw err;
  }
}

main();
