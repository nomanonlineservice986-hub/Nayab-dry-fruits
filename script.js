
function generateReceipt() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const item = document.getElementById("item").value.trim();
    const weight = document.getElementById("weight").value.trim();
    const priceValue = document.getElementById("price").value;

    if (!name || !phone || !address || !item || !weight || priceValue === "") {
        alert("Please fill all customer and item details.");
        return;
    }

    const price = Number(priceValue);

    if (!Number.isFinite(price) || price < 0) {
        alert("Please enter a valid price.");
        return;
    }

    document.getElementById("rNumber").textContent =
        "NDF-" + Date.now().toString().slice(-8);

    document.getElementById("rDate").textContent =
        new Date().toLocaleDateString("en-GB");

    document.getElementById("rName").textContent = name;
    document.getElementById("rPhone").textContent = phone;
    document.getElementById("rAddress").textContent = address;
    document.getElementById("rItem").textContent = item;
    document.getElementById("rWeight").textContent = weight;

    const formattedPrice = "Rs. " + price.toLocaleString("en-PK");

    document.getElementById("rPrice").textContent = formattedPrice;
    document.getElementById("rTotal").textContent = formattedPrice;

    const section = document.getElementById("receiptSection");

    section.style.display = "block";

    document.getElementById("receipt").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


async function downloadPDF() {

    const receipt = document.getElementById("receipt");
    const section = document.getElementById("receiptSection");
    const button = document.querySelector(".download-btn");

    if (!receipt || !document.getElementById("rNumber").textContent) {
        alert("Please generate a receipt first.");
        return;
    }

    if (typeof html2pdf === "undefined") {
        alert("PDF library not loaded. Please refresh the website.");
        return;
    }

    try {

        if (button) {
            button.disabled = true;
            button.textContent = "Generating PDF...";
        }

        // Make sure receipt is visible
        section.style.display = "block";
        receipt.style.display = "block";
        receipt.style.visibility = "visible";

        // Wait for browser rendering
        await new Promise(resolve => setTimeout(resolve, 500));

        // Wait for fonts
        if (document.fonts && document.fonts.ready) {
            await document.fonts.ready;
        }

        const options = {
            margin: [10, 10, 10, 10],

            filename: "Nayaab_Dry_Fruits_Receipt.pdf",

            image: {
                type: "jpeg",
                quality: 1
            },

            html2canvas: {
                scale: 2,
                useCORS: true,
                backgroundColor: "#ffffff",
                logging: true,
                scrollX: 0,
                scrollY: 0,
                windowWidth: Math.max(
                    document.documentElement.clientWidth,
                    receipt.scrollWidth
                ),
                onclone: function (clonedDocument) {

                    const clonedReceipt =
                        clonedDocument.getElementById("receipt");

                    if (clonedReceipt) {
                        clonedReceipt.style.display = "block";
                        clonedReceipt.style.visibility = "visible";
                        clonedReceipt.style.opacity = "1";
                        clonedReceipt.style.background = "#ffffff";
                        clonedReceipt.style.color = "#222222";
                    }

                    const clonedSection =
                        clonedDocument.getElementById("receiptSection");

                    if (clonedSection) {
                        clonedSection.style.display = "block";
                        clonedSection.style.visibility = "visible";
                    }
                }
            },

            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait"
            },

            pagebreak: {
                mode: ["css", "legacy"]
            }
        };

        // Generate and download PDF
        await html2pdf()
            .set(options)
            .from(receipt)
            .save();

        alert("PDF downloaded successfully!");

    } catch (error) {

        console.error("PDF Error:", error);

        alert("PDF generation failed. Please check the browser console.");

    } finally {

        if (button) {
            button.disabled = false;
            button.textContent = "Download PDF Receipt";
        }
    }
}
