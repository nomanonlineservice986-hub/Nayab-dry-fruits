
async function downloadPDF() {

    const receipt = document.getElementById("receipt");
    const button = document.querySelector(".download-btn");

    if (!receipt || !document.getElementById("rNumber").textContent) {
        alert("Please generate receipt first.");
        return;
    }

    if (typeof html2pdf === "undefined") {
        alert("PDF library not loaded.");
        return;
    }

    try {
        button.disabled = true;
        button.textContent = "Generating PDF...";

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
                backgroundColor: "#ffffff",

                onclone: function(doc) {

                    const el = doc.getElementById("receipt");

                    el.style.width = "100%";
                    el.style.maxWidth = "none";
                    el.style.padding = "5px";
                    el.style.margin = "0";
                    el.style.border = "none";
                    el.style.fontSize = "9px";
                    el.style.lineHeight = "1.1";

                    el.querySelectorAll("h1").forEach(e => {
                        e.style.fontSize = "17px";
                        e.style.margin = "3px 0";
                    });

                    el.querySelectorAll("h2").forEach(e => {
                        e.style.fontSize = "13px";
                        e.style.margin = "4px 0";
                    });

                    el.querySelectorAll("h3").forEach(e => {
                        e.style.fontSize = "10px";
                        e.style.margin = "5px 0";
                    });

                    el.querySelectorAll("p").forEach(e => {
                        e.style.margin = "3px 0";
                    });

                    el.querySelectorAll("th, td").forEach(e => {
                        e.style.padding = "4px";
                        e.style.fontSize = "9px";
                    });

                    el.querySelectorAll(".total").forEach(e => {
                        e.style.marginTop = "5px";
                        e.style.padding = "5px";
                    });

                    el.querySelectorAll(".footer").forEach(e => {
                        e.style.marginTop = "6px";
                        e.style.paddingTop = "4px";
                    });
                }
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

        alert("A4 Half Page Receipt Downloaded!");

    } catch (error) {

        console.error(error);
        alert("PDF generation failed.");

    } finally {

        button.disabled = false;
        button.textContent = "Download PDF Receipt";
    }
}
