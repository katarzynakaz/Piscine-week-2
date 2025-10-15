export async function activateModalPopup(cell, event_name, description_url) {
    const modal = document.getElementById("special-day-modal");
    const modal_header = document.getElementById("modal-header");
    const modal_text = document.getElementById("modal-text");
    const span = document.getElementsByClassName("close")[0];
    const description_text = await fetchText(description_url);

    cell.addEventListener("click", () => {
        modal.style.display = "block";
        modal_header.innerText = event_name;
        modal_text.innerText = description_text;
    });
    span.addEventListener("click", () => {
        modal.style.display = "none";
    });
    window.addEventListener("click", (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}

async function fetchText(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const text = await response.text();
        return text;
    } catch (error) {
        console.error('Error fetching text:', error);
    }
}