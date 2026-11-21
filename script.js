
function generateReceipt() {

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();

    const item = document.getElementById("itemName").value.trim();
    const weight = document.getElementById("weight").value.trim();
    const price = document.getElementById("price").value;

    // Validation

    if (!name || !phone || !address || !item || !weight || price === "") {
        alert("Please fill all fields.");
        return;
    }

    const amount = Number(price);

    if (!Number.isFinite(amount) || amount <= 0) {
        alert("Please enter a valid price.");
        return;
    }

    // Receipt Number

    const receiptNo = "NDF-" + Date.now().toString().slice(-6);

    // Date

    const today = new Date();

    // Fill Receipt

    document.getElementById("rNumber").textContent = receiptNo;

    document.getElementById("rDate").textContent =
        today.toLocaleDateString("en-GB");

    document.getElementById("rName").textContent = name;

    document.getElementById("rPhone").textContent = phone;

    document.getElementById("rAddress").textContent = address;

    document.getElementById("rItem").textContent = item;

    document.getElementById("rWeight").textContent = weight;

    document.getElementById("rPrice").textContent =
        amount.toLocaleString("en-PK");

    document.getElementById("rTotal").textContent =
        amount.toLocaleString("en-PK");

    // Show Receipt

    document.getElementById("receiptSection").style.display = "block";

    // Scroll to Receipt

    document.getElementById("receiptSection").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// PDF Download Function

async function downloadPDF() {

    const receipt = document.getElementById("receipt");

    const button = document.querySelector(".download-btn");

    if (!document.getElementById("rNumber").textContent.trim()) {
        alert("Please generate receipt first.");
        return;
    }

    if (!window.html2canvas || !window.jspdf) {
        alert("PDF Library not loaded. Please check internet connection.");
        return;
    }

    try {

        button.disabled = true;
        button.textContent = "Generating PDF...";

        // Capture Receipt

        const canvas = await html2canvas(receipt, {

            scale: 2,

            backgroundColor: "#ffffff",

            useCORS: true,

            logging: false,

            windowWidth: 850

        });

        const image = canvas.toDataURL("image/jpeg", 0.98);

        // Create PDF

        const { jsPDF } = window.jspdf;

        // Full A4 page, receipt in upper half

        const pdf = new jsPDF({

            orientation: "portrait",

            unit: "mm",

            format: "a4"

        });

        const pageWidth = 210;

        const margin = 5;

        const maxWidth = pageWidth - (margin * 2);

        // Upper half of A4 page

        const maxHeight = 138;

        const ratio = Math.min(

            maxWidth / canvas.width,

            maxHeight / canvas.height

        );

        const imageWidth = canvas.width * ratio;

        const imageHeight = canvas.height * ratio;

        const x = (pageWidth - imageWidth) / 2;

        const y = 5;

        // Add receipt only once

        pdf.addImage(

            image,

            "JPEG",

            x,

            y,

            imageWidth,

            imageHeight

        );

        // Download PDF

        pdf.save("Nayaab_Dry_Fruits_Receipt.pdf");

    }

    catch (error) {

        console.error("PDF ERROR:", error);

        alert("PDF Error: " + error.message);

    }

    finally {

        button.disabled = false;

        button.textContent = "Download PDF Receipt";

    }

}
