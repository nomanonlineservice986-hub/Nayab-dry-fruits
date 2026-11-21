
function generateReceipt() {

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();
    const item = document.getElementById("itemName").value.trim();
    const weight = document.getElementById("weight").value.trim();
    const price = document.getElementById("price").value;

    if (!name || !phone || !item || !weight || price === "") {
        alert("Please fill all required fields.");
        return;
    }

    if (Number(price) < 0 || !Number.isFinite(Number(price))) {
        alert("Please enter a valid price.");
        return;
    }

    const receiptNo = "NDF-" + Date.now().toString().slice(-6);

    document.getElementById("rNumber").textContent = receiptNo;
    document.getElementById("rDate").textContent =
        new Date().toLocaleDateString();

    document.getElementById("rName").textContent = name;
    document.getElementById("rPhone").textContent = phone;
    document.getElementById("rAddress").textContent = address;
    document.getElementById("rItem").textContent = item;
    document.getElementById("rWeight").textContent = weight;

    document.getElementById("rPrice").textContent =
        Number(price).toLocaleString("en-PK");

    document.getElementById("rTotal").textContent =
        Number(price).toLocaleString("en-PK");

    document.getElementById("receiptSection").style.display = "block";

    document.getElementById("receiptSection").scrollIntoView({
        behavior: "smooth"
    });
}


async function downloadPDF() {

    const receipt = document.getElementById("receipt");

    if (!document.getElementById("rNumber").textContent.trim()) {
        alert("Please generate receipt first.");
        return;
    }

    if (typeof html2pdf === "undefined") {
        alert("PDF Library not loaded. Check your internet connection.");
        return;
    }

    const button = document.querySelector(".download-btn");

    try {

        button.disabled = true;
        button.textContent = "Generating PDF...";

        const options = {
            margin: 0,
            filename: "Nayaab_Dry_Fruits_Receipt.pdf",

            image: {
                type: "jpeg",
                quality: 0.98
            },

            html2canvas: {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff"
            },

            jsPDF: {
                unit: "mm",
                format: [210, 148],
                orientation: "landscape"
            },

            pagebreak: {
                mode: ["avoid-all"]
            }
        };

        await html2pdf()
            .set(options)
            .from(receipt)
            .save();

    } catch (error) {

        console.error(error);
        alert("PDF Error: " + error.message);

    } finally {

        button.disabled = false;
        button.textContent = "Download PDF Receipt";
    }
}
