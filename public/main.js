const pad = document.getElementById("pad");
const sizeSelect = document.getElementById("paperSize");
const customWidthInput = document.getElementById("customWidth");
const customHeightInput = document.getElementById("customHeight");
const applyBtn = document.getElementById("apply");

const INCH_TO_PX = 96;
const MIN_SIZE_INCH = 1;

function setSize(value) {
    if (value === "custom") {
        let width = parseFloat(customWidthInput.value);
        let height = parseFloat(customHeightInput.value);

        let valid = true;

        // validate inputs
        if (!width || width < MIN_SIZE_INCH) {
            customWidthInput.style.borderColor = "red";
            valid = false;
        } else {
            customWidthInput.style.borderColor = "#ccc";
        }

        if (!height || height < MIN_SIZE_INCH) {
            customHeightInput.style.borderColor = "red";
            valid = false;
        } else {
            customHeightInput.style.borderColor = "#ccc";
        }

        if (valid) {
            pad.style.width = width * INCH_TO_PX + "px";
            pad.style.height = height * INCH_TO_PX + "px";
        }
    } else if (value.includes(",")) {
        let [w, h] = value.split(",");
        pad.style.width = parseFloat(w) * INCH_TO_PX + "px";
        pad.style.height = parseFloat(h) * INCH_TO_PX + "px";
    }
}

sizeSelect.addEventListener("change", () => {
    const isCustom = sizeSelect.value === "custom";
    customWidthInput.style.display = isCustom ? "inline-block" : "none";
    customHeightInput.style.display = isCustom ? "inline-block" : "none";
    applyBtn.style.display = isCustom ? "inline-block" : "none";

    if (!isCustom) setSize(sizeSelect.value);
});

applyBtn.addEventListener("click", () => {
    if (sizeSelect.value === "custom") setSize("custom");
});

document.addEventListener("DOMContentLoaded", () => {
    sizeSelect.selectedIndex = 0;
    customWidthInput.value = "";
    customHeightInput.value = "";
    setSize(sizeSelect.value);
});

// keep cursor at end if content overflows
let lastContent = "";
pad.addEventListener("input", () => {
    if (pad.scrollHeight > pad.clientHeight) {
        pad.innerText = lastContent;
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(pad);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
    } else {
        lastContent = pad.innerText;
    }
});