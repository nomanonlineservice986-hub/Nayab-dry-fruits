
async function downloadPDF() {

    const receipt = document.getElementById("receipt");
    const button = document.querySelector(".download-btn");

    if (!receipt || !document.getElementById("rNumber").textContent.trim()) {
        alert("Please generate receipt first.");
        return;
    }

    if (typeof html2pdf === "undefined") {
        alert("PDF Library is not loaded. Refresh your website.");
        return;
    }

    try {

        button.disabled = true;
        button.textContent = "Please Wait...";

        // Wait for receipt rendering
        await new Promise(resolve => setTimeout(resolve, 500));

        const options = {
            margin: [8, 8, 8, 8],

            filename: "Nayaab_Dry_Fruits_Receipt.pdf",

            image: {
                type: "jpeg",
                quality: 0.98
            },

            html2canvas: {
                scale: 2,
                useCORS: true,
                logging: true,
                backgroundColor: "#ffffff",
                scrollX: 0,
                scrollY: 0
            },

            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait"
            }
        };

        await html2pdf()
            .set(options)
            .from(receipt)
            .save();

        alert("PDF Download Successful!");

    } catch (error) {

        console.error("PDF ERROR:", error);

        alert("PDF Error: " + error.message);

    } finally {

        button.disabled = false;
        button.textContent = "Download PDF Receipt";

    }
}
