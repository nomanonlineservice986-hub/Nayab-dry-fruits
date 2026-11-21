
async function downloadPDF() {

    const receipt = document.getElementById("receipt");
    const section = document.getElementById("receiptSection");
    const button = document.querySelector(".download-btn");

    if (!receipt || !document.getElementById("rNumber").textContent) {
        alert("Please generate receipt first.");
        return;
    }

    if (typeof html2pdf === "undefined") {
        alert("PDF library not loaded. Check internet connection.");
        return;
    }

    try {
        button.disabled = true;
        button.textContent = "Generating PDF...";

        section.style.display = "block";

        await new Promise(resolve =>
            requestAnimationFrame(() =>
                requestAnimationFrame(resolve)
            )
        );

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
                logging: false,
                scrollX: 0,
                scrollY: 0,
                windowWidth: 800,

                onclone: function(clonedDoc) {

                    const el = clonedDoc.getElementById("receipt");

                    el.style.width = "100%";
                    el.style.maxWidth = "none";
                    el.style.padding = "12px";
                    el.style.margin = "0";
                    el.style.border = "none";
                    el.style.borderRadius = "0";
                    el.style.boxShadow = "none";
                    el.style.fontSize = "11px";
                    el.style.lineHeight = "1.25";
                    el.style.background = "#ffffff";
                    el.style.color = "#222222";

                    el.querySelectorAll("h1").forEach(e => {
                        e.style.fontSize = "21px";
                        e.style.margin = "5px 0";
                    });

                    el.querySelectorAll("h2").forEach(e => {
                        e.style.fontSize = "16px";
                        e.style.margin = "7px 0";
                    });

                    el.querySelectorAll("h3").forEach(e => {
                        e.style.fontSize = "13px";
                        e.style.margin = "9px 0 5px";
                    });

                    el.querySelectorAll("p").forEach(e => {
                        e.style.margin = "5px 0";
                        e.style.lineHeight = "1.25";
                    });

                    el.querySelectorAll("th, td").forEach(e => {
                        e.style.padding = "6px";
                        e.style.fontSize = "11px";
                    });

                    el.querySelectorAll("table").forEach(e => {
                        e.style.marginTop = "7px";
                    });

                    el.querySelectorAll(".total").forEach(e => {
                        e.style.marginTop = "10px";
                        e.style.padding = "8px";
                    });

                    el.querySelectorAll(".footer").forEach(e => {
                        e.style.marginTop = "12px";
                        e.style.paddingTop = "8px";
                    });
                }
            },

            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "portrait"
            },

            pagebreak: {
                mode: ["avoid-all"]
            }
        };

        await html2pdf()
            .set(options)
            .from(receipt)
            .save();

        alert("Your one-page PDF receipt is downloaded!");

    } catch (error) {

        console.error("PDF Error:", error);
        alert("PDF generation failed. Please try again.");

    } finally {

        button.disabled = false;
        button.textContent = "Download PDF Receipt";

    }
}
