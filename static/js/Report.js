// document.addEventListener('DOMContentLoaded', function () {
//     const fileInput = document.getElementById('file-input');
//     const headersContainer = document.getElementById('headers-container');

//     // Restore headers if available
//     const storedHeaders = localStorage.getItem('csvHeaders');
//     if (storedHeaders) {
//         renderHeaders(JSON.parse(storedHeaders));
//     }

//     fileInput.addEventListener('change', function (event) {
//         const file = event.target.files[0];
//         if (!file) return;

//         const reader = new FileReader();

//         reader.onload = function (e) {
//             const text = e.target.result;
//             const lines = text.split('\n');
//             if (lines.length > 0) {
//                 const headers = lines[0].split(',');

//                 // Save headers to localStorage
//                 localStorage.setItem('csvHeaders', JSON.stringify(headers));

//                 renderHeaders(headers);
//             }
//         };

//         reader.readAsText(file);
//     });

//     function renderHeaders(headers) {
//         headersContainer.innerHTML = '';
//         headers.forEach(header => {
//             const p = document.createElement('p');
//             p.textContent = header.trim();
//             headersContainer.appendChild(p);
//         });
//     }
// });











// document.addEventListener("DOMContentLoaded", () => {
//     const chartImages = document.querySelectorAll(".visualization img");
//     const fileInput = document.getElementById("file-input");
//     let uploadedFile = null;

//     fileInput.addEventListener("change", (e) => {
//         uploadedFile = e.target.files[0];
//         document.querySelector(".loaddata").textContent = `Loaded: ${uploadedFile.name}`;
//     });

//     chartImages.forEach(img => {
//         img.addEventListener("click", async () => {
//             if (!uploadedFile) {
//                 alert("Please upload a CSV file first.");
//                 return;
//             }

//             const chartType = img.getAttribute("data-chart-type");

//             // Show blueprint image first
//             const blueprintPath = `Image/blueprints/${chartType}_blueprint.png`;

//             // Show placeholder immediately
//             document.querySelector(".result").innerHTML = `
//                 <h3 style="margin-left:100px;">${chartType} Blueprint</h3>
//                 <img src="${blueprintPath}" alt="${chartType} blueprint" id="blueprint-img" style="margin-left:100px;/>
//                 <p style="margin-left:100px;></p>
//             `;

//             // Send request to generate chart
//             const formData = new FormData();
//             formData.append("file", uploadedFile);
//             formData.append("chartType", chartType);

//             try {
//                 const response = await fetch("/generate-chart", {
//                     method: "POST",
//                     body: formData,
//                 });

//                 if (!response.ok) throw new Error("Chart generation failed.");

//                 const blob = await response.blob();
//                 const dataOverlayURL = URL.createObjectURL(blob);

//                 // Overlay the result image
//                 document.querySelector(".result").innerHTML = `
//                     <h3>${chartType} Chart (Blueprint + Data)</h3>
//                     <div style="position: relative; display: inline-block;">
//                         <img src="${blueprintPath}" style="position: absolute; top: 0; left: 0; z-index: 1;" />
//                         <img src="${dataOverlayURL}" style="position: absolute; top: 0; left: 0; z-index: 2;" />
//                     </div>
//                 `;
//             } catch (err) {
//                 alert(err.message);
//             }
//         });
//     });
// });











// document.addEventListener("DOMContentLoaded", function () {
//     const fileInput = document.getElementById("file-input");
//     const chartImages = document.querySelectorAll(".visualization img");
//     const resultDiv = document.querySelector(".result");

//     // Restore state on reload
//     const savedChart = localStorage.getItem("selectedChart");
//     const uploaded = localStorage.getItem("fileUploaded");
//     if (uploaded === "true" && savedChart) {
//         showBlueprint(savedChart);
//     }

//     if (fileInput) {
//         fileInput.addEventListener("change", () => {
//             localStorage.setItem("fileUploaded", "true");
//         });
//     }

//     chartImages.forEach((img) => {
//         img.addEventListener("click", () => {
//             const uploaded = localStorage.getItem("fileUploaded");
//             if (uploaded === "true") {
//                 const chartType = img.className.trim();
//                 localStorage.setItem("selectedChart", chartType);
//                 showBlueprint(chartType);
//             } else {
//                 alert("Please upload a CSV file first.");
//             }
//         });
//     });

//     function showBlueprint(chartType) {
//         const blueprintPath = `Image/blueprints/${chartType}_blueprint.png`;
//         const img = new Image();
//         img.src = blueprintPath;
//         img.onload = function () {
//             resultDiv.innerHTML = `
//                 <h3 style="margin-left:100px;">${chartType} Blueprint</h3>
//                 <img src="${blueprintPath}" alt="${chartType}" style="width: 300px; height:300px; display: block; margin-left:100px;" />
//                 <p style="margin-left:100px;">Visualization based on uploaded data.</p>
//             `;
//         };
//         img.onerror = function () {
//             resultDiv.innerHTML = `<p style="color: red; margin-left:100px;">Blueprint image not found: ${blueprintPath}</p>`;
//         };
//     }
    
// });
















// document.addEventListener("DOMContentLoaded", function () {
//     const fileInput = document.getElementById("file-input");
//     const chartImages = document.querySelectorAll(".visualization img");
//     const resultDiv = document.querySelector(".result");

//     const uploaded = localStorage.getItem("fileUploaded");
//     const savedCharts = JSON.parse(localStorage.getItem("selectedCharts") || "[]");

//     // Restore all previously clicked charts on page load
//     if (uploaded === "true" && savedCharts.length > 0) {
//         savedCharts.forEach(showBlueprint);
//     }

//     if (fileInput) {
//         fileInput.addEventListener("change", () => {
//             localStorage.setItem("fileUploaded", "true");
//         });
//     }

//     chartImages.forEach((img) => {
//         img.addEventListener("click", () => {
//             const uploaded = localStorage.getItem("fileUploaded");
//             if (uploaded === "true") {
//                 const chartType = img.className.trim();
                
//                 // Avoid duplicate charts
//                 const existingCharts = JSON.parse(localStorage.getItem("selectedCharts") || "[]");
//                 if (!existingCharts.includes(chartType)) {
//                     existingCharts.push(chartType);
//                     localStorage.setItem("selectedCharts", JSON.stringify(existingCharts));
//                 }

//                 showBlueprint(chartType);
//             } else {
//                 alert("Please upload a CSV file first.");
//             }
//         });
//     });

//     function showBlueprint(chartType) {
//         const blueprintPath = `Image/blueprints/${chartType}_blueprint.png`;
//         const img = new Image();
//         img.src = blueprintPath;
//         img.style.width = "300px";
//         img.style.marginLeft = "100px"
//         img.style.display = "flex";
//         img.alt = chartType;

//         img.onload = function () {
//             const container = document.createElement("div");
//             container.style.marginBottom = "20px";
//             container.innerHTML = `
//                 <h3 style="margin-left:100px;">${chartType} Blueprint</h3>
//             `;
//             container.appendChild(img);
//             resultDiv.appendChild(container);
//         };

//         img.onerror = function () {
//             const error = document.createElement("p");
//             error.style.color = "red";
//             error.textContent = `Blueprint image not found: ${blueprintPath}`;
//             resultDiv.appendChild(error);
//         };
//     }
// });







// document.addEventListener("DOMContentLoaded", function () {
//     const fileInput = document.getElementById("file-input");
//     const recentSection = document.querySelector("h3.recent");

//     const recentInfoContainer = document.createElement("div");
//     recentInfoContainer.id = "recent-info";
//     recentInfoContainer.style.marginLeft = "20px";
//     recentInfoContainer.style.fontSize = "14px";
//     recentInfoContainer.style.color = "black";
//     recentSection?.insertAdjacentElement("afterend", recentInfoContainer);

//     fileInput?.addEventListener("change", function (event) {
//         const file = event.target.files[0];
//         if (!file) return;

//         const fileName = file.name;
//         const modifiedDate = new Date(file.lastModified);
//         const timeString = modifiedDate.toLocaleTimeString();
//         const dateString = modifiedDate.toLocaleDateString();

//         const info = document.createElement("p");
//         info.textContent = `File: ${fileName} | Uploaded At: ${timeString} on ${dateString}`;
//         info.style.fontWeight = "bold";
//         info.style.marginTop = "10px";

//         recentInfoContainer.innerHTML = "";
//         recentInfoContainer.appendChild(info);
//     });
// });








// img.onload = function () {
//     const container = document.createElement("div");
//     container.classList.add("draggable-container");
//     container.style.marginBottom = "20px";
//     container.style.position = "absolute";
//     container.style.left = "100px";
//     container.style.top = "100px";
//     container.style.border = "1px solid #ccc";
//     container.style.padding = "10px";
//     container.style.background = "#fff";

//     const title = document.createElement("h3");
//     title.textContent = `${chartType} Blueprint`;
//     title.style.margin = "0 0 10px 0";
//     container.appendChild(title);
//     container.appendChild(img);
//     resultDiv.appendChild(container);

//     makeDraggableResizable(container);
// };







// function makeDraggableResizable(element) {
//     interact(element)
//         .draggable({
//             inertia: true,
//             modifiers: [
//                 interact.modifiers.restrictRect({
//                     restriction: 'parent',
//                     endOnly: true
//                 })
//             ],
//             listeners: {
//                 move(event) {
//                     const target = event.target;
//                     const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
//                     const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

//                     target.style.transform = `translate(${x}px, ${y}px)`;
//                     target.setAttribute('data-x', x);
//                     target.setAttribute('data-y', y);
//                 }
//             }
//         })
//         .resizable({
//             edges: { left: true, right: true, bottom: true, top: true },
//             listeners: {
//                 move(event) {
//                     let { x, y } = event.target.dataset;

//                     x = parseFloat(x) || 0;
//                     y = parseFloat(y) || 0;

//                     Object.assign(event.target.style, {
//                         width: `${event.rect.width}px`,
//                         height: `${event.rect.height}px`,
//                     });

//                     event.target.setAttribute('data-x', x);
//                     event.target.setAttribute('data-y', y);
//                 }
//             },
//             modifiers: [
//                 interact.modifiers.restrictSize({
//                     min: { width: 150, height: 150 },
//                     max: { width: 800, height: 800 }
//                 })
//             ],
//             inertia: true
//         });
// }

















document.addEventListener('DOMContentLoaded', function () 
{
    const fileInput = document.getElementById('file-input');
    const headersContainer = document.getElementById('headers-container');
    const chartImages = document.querySelectorAll(".visualization img");
    const resultDiv = document.querySelector(".result");
    const recentSection = document.querySelector("h3.recent");

    const uploaded = localStorage.getItem("fileUploaded");
    const savedCharts = JSON.parse(localStorage.getItem("selectedCharts") || "[]");

    const recentInfoContainer = document.createElement("div");
    recentInfoContainer.id = "recent-info";
    recentInfoContainer.style.marginLeft = "20px";
    recentInfoContainer.style.fontSize = "14px";
    recentInfoContainer.style.color = "black";
    recentSection?.insertAdjacentElement("afterend", recentInfoContainer);

    // Restore headers if available
    // const storedHeaders = localStorage.getItem('csvHeaders');
    // if (storedHeaders) 
    // {
    //     renderHeaders(JSON.parse(storedHeaders));
    // }

    // // Restore all previously clicked charts on page load
    // if (uploaded === "true" && savedCharts.length > 0) 
    // {
    //     savedCharts.forEach(showBlueprint);
    // }

    // if (fileInput) 
    // {
    //     fileInput.addEventListener('change', function (event) 
    //     {
    //         const file = event.target.files[0];
    //         if (!file) return;

    //         const reader = new FileReader();

    //         reader.onload = function (e) 
    //         {
    //             const text = e.target.result;
    //             const lines = text.split('\n');
    //             if (lines.length > 0) 
    //             {
    //                 const headers = lines[0].split(',');

    //                 // Save headers to localStorage
    //                 localStorage.setItem('csvHeaders', JSON.stringify(headers));

                    renderHeaders(headers);
    //             }
    //         };

    //         reader.readAsText(file);

    //         // File Info
    //         const fileName = file.name;
    //         const modifiedDate = new Date(file.lastModified);
    //         const timeString = modifiedDate.toLocaleTimeString();
    //         const dateString = modifiedDate.toLocaleDateString();

    //         const info = document.createElement("p");
    //         info.textContent = `File: ${fileName} | Uploaded At: ${timeString} on ${dateString}`;
    //         info.style.fontWeight = "bold";
    //         info.style.marginTop = "10px";

    //         recentInfoContainer.innerHTML = "";
    //         recentInfoContainer.appendChild(info);

    //         localStorage.setItem("fileUploaded", "true");
    //     });
    // }

    // chartImages.forEach((img) => 
    // {
    //     img.addEventListener("click", () => 
    //     {
    //         const uploaded = localStorage.getItem("fileUploaded");
    //         if (uploaded === "true") 
    //         {
    //             const chartType = img.className.trim();

    //             // Avoid duplicate charts
    //             const existingCharts = JSON.parse(localStorage.getItem("selectedCharts") || "[]");
    //             if (!existingCharts.includes(chartType)) 
    //             {
    //                 existingCharts.push(chartType);
    //                 localStorage.setItem("selectedCharts", JSON.stringify(existingCharts));
    //             }
                showBlueprint(chartType);
    //         } 
    //         else 
    //         {
    //             alert("Please upload a CSV file first.");
    //         }
    //     });
    // });

    function renderHeaders(headers) 
    {
        headersContainer.innerHTML = '';
        headers.forEach(header => 
        {
            const p = document.createElement('p');
            p.textContent = header.trim();
            headersContainer.appendChild(p);
        });
    }
    resultDiv.appendChild(container);
    function showBlueprint(chartType) 
    {
        const blueprintPath = `Image/blueprints/${chartType}_blueprint.png`;
        const img = new Image();
        img.src = blueprintPath;
        // img.style.width = "300px";
        // img.style.height = "300px";
        img.style.width = "95%";
        img.style.height = "85%";
        // img.style.objectFit = "cover"; // crop to container without distortion
        img.style.pointerEvents = "none"; // prevent drag on image itself if needed
        img.style.userSelect = "none";
        img.style.display = "block";
        img.style.marginLeft = "10px";
        img.style.display = "flex";
        img.alt = chartType;

        img.onload = function () 
        {
            const container = document.createElement("div");
            container.classList.add("draggable-container");
            container.style.marginBottom = "0px";
            container.style.position = "absolute";
            container.style.left = "100px";
            container.style.top = "100px";
            container.style.cursor = "move";
            container.style.border = "1px solid #ccc";
            container.style.padding = "10px";
            container.style.background = "#fff";
            container.addEventListener("mousemove", function (e) 
            {
                    const rect = container.getBoundingClientRect();
                    const offset = 10; // how close to the edge to show resize cursor

                    const isLeft = e.clientX - rect.left < offset;
                    const isRight = rect.right - e.clientX < offset;
                    const isTop = e.clientY - rect.top < offset;
                    const isBottom = rect.bottom - e.clientY < offset;

                    if ((isLeft && isTop) || (isRight && isBottom)) 
                    {
                        container.style.cursor = "nwse-resize";
                    } 
                    else if ((isRight && isTop) || (isLeft && isBottom)) 
                    {
                        container.style.cursor = "nesw-resize";
                    } 
                    else if (isLeft || isRight) 
                    {
                        container.style.cursor = "ew-resize";
                    } 
                    else if (isTop || isBottom) 
                    {
                        container.style.cursor = "ns-resize";
                    } 
                    else 
                    {
                        container.style.cursor = "default"; // default drag
                    }
            });
            const title = document.createElement("h3");
            title.textContent = `${chartType} Blueprint`;
            title.style.margin = "0 0 10px 0";


            // Menu button
            const menuBtn = document.createElement("button");
            // menuBtn.textContent = "⋮";
            menuBtn.textContent = "...";
            menuBtn.style.position = "absolute";
            menuBtn.style.top = "5px";
            menuBtn.style.right = "5px";
            menuBtn.style.border = "none";
            menuBtn.style.background = "transparent";
            menuBtn.style.cursor = "pointer";
            menuBtn.style.fontSize = "18px";

            // Menu dropdown
            const menuDropdown = document.createElement("div");
            menuDropdown.style.position = "absolute";
            menuDropdown.style.top = "25px";
            menuDropdown.style.right = "5px";
            menuDropdown.style.background = "#f9f9f9";
            menuDropdown.style.border = "1px solid #ccc";
            menuDropdown.style.padding = "5px";
            menuDropdown.style.display = "none";
            menuDropdown.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
            menuDropdown.style.zIndex = "10";

            // Remove option
            const removeOption = document.createElement("div");
            removeOption.textContent = "Remove";
            removeOption.style.cursor = "pointer";
            removeOption.style.color = "block";
            removeOption.addEventListener("click", () => 
            {
                container.remove();
                const charts = JSON.parse(localStorage.getItem("selectedCharts") || "[]");
                const updatedCharts = charts.filter(c => c !== chartType);
                localStorage.setItem("selectedCharts", JSON.stringify(updatedCharts));
            });

            // Toggle menu
            menuBtn.addEventListener("click", (e) => 
            {
                e.stopPropagation();
                menuDropdown.style.display = menuDropdown.style.display === "none" ? "block" : "none";
            });

            document.addEventListener("click", () => 
            {
                menuDropdown.style.display = "none";
            });
            // ⏬ Restore saved crop size
            const savedSizes = JSON.parse(localStorage.getItem("chartSizes") || "{}");
            if (savedSizes[chartType]) 
            {
                container.style.width = savedSizes[chartType].width + "px";
                container.style.height = savedSizes[chartType].height + "px";
            } 
            else 
            {
                container.style.width = "300px";
                container.style.height = "300px";
            }

            menuDropdown.appendChild(removeOption);
            container.appendChild(menuBtn);
            container.appendChild(menuDropdown);

            container.appendChild(title);
            container.appendChild(img);
            resultDiv.appendChild(container);

            makeDraggableResizable(container);

            img.style.cursor = "default"; // initial state

            img.addEventListener("dblclick", () => 
            {
                img.style.cursor = "move";
            });

            // Optional: reset cursor on blur or another click
            document.addEventListener("click", (e) => 
            {
                if (!img.contains(e.target)) 
                {
                    img.style.cursor = "default";
                }
            });
            

        };

        img.onerror = function () 
        {
            const error = document.createElement("p");
            error.style.color = "red";
        };
    };
    function makeDraggableResizable(element) 
    {
        interact(element).draggable
            ({
                inertia: true,
                listeners: 
                {
                    move(event) 
                    {
                        const target = event.target;
                        const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                        target.style.transform = `translate(${x}px, ${y}px)`;
                        target.setAttribute('data-x', x);
                        target.setAttribute('data-y', y);
                    }
                }
            })
            .resizable(
            {
                edges: 
                { 
                    left: true, right: true, bottom: true, top: true 
                },
                listeners: 
                {
                    move(event) 
                    {
                        let target = event.target;
                        let x = parseFloat(target.getAttribute('data-x')) || 0;
                        let y = parseFloat(target.getAttribute('data-y')) || 0;

                        // update the element's style
                        target.style.width = `${event.rect.width}px`;
                        target.style.height = `${event.rect.height}px`;

                        // translate when resizing from top or left edges
                        x += event.deltaRect.left;
                        y += event.deltaRect.top;

                        target.style.transform = `translate(${x}px, ${y}px)`;
                        target.setAttribute('data-x', x);
                        target.setAttribute('data-y', y);
                    }

                },
                modifiers: 
                [
                    interact.modifiers.restrictSize(
                    {
                        min: { width: 150, height: 150 },
                        max: { width: 800, height: 800 }
                    })
                ],
                inertia: true
            });
        interact(element).resizable
        ({
            // existing config...
            listeners: {
                move(event) 
                {
                    // existing resize code
                    let { x, y } = event.target.dataset;
                    x = parseFloat(x) || 0;
                    y = parseFloat(y) || 0;

                    Object.assign(event.target.style, 
                    {
                        width: `${event.rect.width}px`,
                        height: `${event.rect.height}px`,
                    });

                    event.target.setAttribute('data-x', x);
                    event.target.setAttribute('data-y', y);

                    // ➕ Save updated size to localStorage
                    const chartType = event.target.querySelector("img")?.alt;
                    if (chartType) 
                    {
                        const savedSizes = JSON.parse(localStorage.getItem("chartSizes") || "{}");
                        savedSizes[chartType] = 
                        {
                            width: event.rect.width,
                            height: event.rect.height
                        };
                        localStorage.setItem("chartSizes", JSON.stringify(savedSizes));
                    }
                }
            },
            // ...rest of your config
        });

    }
});
// ➕ Additional fix to correct left/top resize direction (add-only)
document.addEventListener("DOMContentLoaded", function () 
{
    const observer = new MutationObserver(() => 
    {
        document.querySelectorAll(".draggable-container").forEach(container => 
        {
            interact(container).resizable({
                listeners: 
                {
                    move(event) 
                    {
                        const target = event.target;
                        let x = parseFloat(target.getAttribute('data-x')) || 0;
                        let y = parseFloat(target.getAttribute('data-y')) || 0;

                        // Resize
                        const deltaLeft = event.deltaRect.left;
                        const deltaTop = event.deltaRect.top;

                        // Adjust position if resized from left/top
                        x += deltaLeft;
                        y += deltaTop;

                        Object.assign(target.style, 
                        {
                            width: `${event.rect.width}px`,
                            height: `${event.rect.height}px`,
                            transform: `translate(${x}px, ${y}px)`
                        });

                        target.setAttribute('data-x', x);
                        target.setAttribute('data-y', y);

                        // Save updated size
                        const chartType = target.querySelector("img")?.alt;
                        if (chartType) 
                        {
                            const savedSizes = JSON.parse(localStorage.getItem("chartSizes") || "{}");
                            savedSizes[chartType] = 
                            {
                                width: event.rect.width,
                                height: event.rect.height
                            };
                            localStorage.setItem("chartSizes", JSON.stringify(savedSizes));
                        }
                    }
                }
            });
        });
    });

    observer.observe(document.querySelector(".result"), { childList: true, subtree: true });
});

document.querySelectorAll(".visualization img").forEach((img) => 
{
    img.addEventListener("click", () => 
    {
        const chartType = img.className.trim();
        const testImage = new Image();
        testImage.src = `static/Image/blueprints/${chartType}_blueprint.png`;

        testImage.onload = () => 
        {
            // Do nothing, image exists
        };

        testImage.onerror = () => 
        {
            const popup = document.getElementById("blueprint-error");
            popup.style.display = "block";

            setTimeout(() => 
            {
                popup.style.display = "none";
            }, 1000);
        };
    });
});

document.querySelectorAll(".visualization img").forEach((img) => 
{
    img.addEventListener("click", () => 
    {
        const chartType = img.className.trim();

        // Immediately remove all existing matching chart containers
        document.querySelectorAll(".draggable-container").forEach(container => 
        {
            const title = container.querySelector("h3");
            if (title && title.textContent.includes(chartType)) 
            {
                container.remove();
            }
        });

        // Clean up any previous state in localStorage
        let charts = JSON.parse(localStorage.getItem("selectedCharts") || "[]");
        charts = charts.filter(c => c !== chartType);
        localStorage.setItem("selectedCharts", JSON.stringify(charts));

        // Set default size directly after new image appears
        const observer = new MutationObserver(() => 
        {
            const newContainer = Array.from(document.querySelectorAll(".draggable-container")).find(container =>
                container.querySelector("h3")?.textContent.includes(chartType)
            );
            if (newContainer) 
            {
                const imgInside = newContainer.querySelector("img");
                if (imgInside) 
                {
                    imgInside.style.width = "380px";
                    imgInside.style.height = "300px";
                }
                newContainer.style.width = "400px";
                newContainer.style.height = "330px";
                observer.disconnect(); // stop observing once updated
            }
        });

        observer.observe(document.querySelector(".result"), { childList: true });
    });
});

// ➕ Bring clicked image container to front (highest z-index)
document.addEventListener("click", function (e) 
{
    const clickedContainer = e.target.closest(".draggable-container");
    if (clickedContainer) 
    {
        // Set base z-index
        let maxZ = 0;
        document.querySelectorAll(".draggable-container").forEach(container => 
        {
            const z = parseInt(window.getComputedStyle(container).zIndex) || 0;
            if (z > maxZ) maxZ = z;
        });
        clickedContainer.style.zIndex = maxZ + 1;
    }
});
// Clear saved crop size when image container is removed
document.addEventListener("click", function (e) 
{
    if (e.target.textContent === "Remove") 
    {
        const container = e.target.closest(".draggable-container");
        if (container) 
        {
            const chartType = container.querySelector("img")?.alt;
            if (chartType) 
            {
                const sizes = JSON.parse(localStorage.getItem("chartSizes") || "{}");
                delete sizes[chartType];
                localStorage.setItem("chartSizes", JSON.stringify(sizes));
            }
        }
    }
});
// On DOM load, ensure each blueprint image fills its container
window.addEventListener("load", () => 
{
    const containers = document.querySelectorAll(".draggable-container");
    containers.forEach(container => {
        const img = container.querySelector("img");
        if (img) 
        {
            img.style.width = "95%";
            img.style.height = "85%";
            img.style.objectFit = "cover"; // optional: fit without stretching
        }
    });
});
document.addEventListener('DOMContentLoaded', function () 
{
    const fileInput = document.getElementById('file-input');

    fileInput.addEventListener('change', function (event) 
    {
        const files = Array.from(event.target.files);
        let stored = JSON.parse(localStorage.getItem('recentCSVList')) || [];

        files.forEach(file => 
        {
            const fileName = file.name;
            const currentDate = new Date().toLocaleString(); // Use current system time/date

            // Remove existing entry for the same file
            stored = stored.filter(item => item.name !== fileName);

            // Add updated entry at the top
            stored.unshift({ name: fileName, modified: currentDate });
        });

        localStorage.setItem('recentCSVList', JSON.stringify(stored));
    });
});

// ✅ Move checkbox to the beginning of each header line (add-only)
document.addEventListener('DOMContentLoaded', function () 
{
    const savedStates = JSON.parse(localStorage.getItem('headerCheckboxStates') || '{}');

    const fixHeaderCheckboxes = () => 
    {
        const paragraphs = document.querySelectorAll('#headers-container p');

        paragraphs.forEach(p => 
        {
            const text = p.textContent.trim();
            const hasCheckbox = p.querySelector('input[type="checkbox"]');

            if (!hasCheckbox) 
            {
                // Create and prepend checkbox
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = savedStates[text] || false;
                checkbox.style.marginRight = '8px';

                checkbox.addEventListener('change', () => 
                {
                    const currentStates = JSON.parse(localStorage.getItem('headerCheckboxStates') || '{}');
                    currentStates[text] = checkbox.checked;
                    localStorage.setItem('headerCheckboxStates', JSON.stringify(currentStates));
                });

                // Clear and rebuild p element content
                const originalText = document.createTextNode(text);
                p.textContent = '';
                p.appendChild(checkbox);
                p.appendChild(originalText);
            }
        });
    };

    // Run initially
    fixHeaderCheckboxes();

    // Watch for changes and apply fix
    const observer = new MutationObserver(fixHeaderCheckboxes);
    observer.observe(document.getElementById('headers-container'), { childList: true });
});





























// document.addEventListener('DOMContentLoaded', function () {
//     const fileInput = document.getElementById('file-input');
//     const headersContainer = document.getElementById('headers-container');
//     const chartImages = document.querySelectorAll(".visualization img");
//     const resultDiv = document.querySelector(".result");
//     const recentSection = document.querySelector("h3.recent");

//     const uploaded = localStorage.getItem("fileUploaded");
//     const savedCharts = JSON.parse(localStorage.getItem("selectedCharts") || "[]");

//     const recentInfoContainer = document.createElement("div");
//     recentInfoContainer.id = "recent-info";
//     recentInfoContainer.style.marginLeft = "20px";
//     recentInfoContainer.style.fontSize = "14px";
//     recentInfoContainer.style.color = "black";
//     recentSection?.insertAdjacentElement("afterend", recentInfoContainer);

//     // Restore headers if available
//     const storedHeaders = localStorage.getItem('csvHeaders');
//     if (storedHeaders) {
//         renderHeaders(JSON.parse(storedHeaders));
//     }

//     // Restore all previously clicked charts on page load
//     if (uploaded === "true" && savedCharts.length > 0) {
//         savedCharts.forEach(showBlueprint);
//     }

//     if (fileInput) {
//         fileInput.addEventListener('change', function (event) {
//             const file = event.target.files[0];
//             if (!file) return;

//             const reader = new FileReader();

//             reader.onload = function (e) {
//                 const text = e.target.result;
//                 const lines = text.split('\n');
//                 if (lines.length > 0) {
//                     const headers = lines[0].split(',');

//                     // Save headers to localStorage
//                     localStorage.setItem('csvHeaders', JSON.stringify(headers));

//                     renderHeaders(headers);
//                 }
//             };

//             reader.readAsText(file);

//             // File Info
//             const fileName = file.name;
//             const modifiedDate = new Date(file.lastModified);
//             const timeString = modifiedDate.toLocaleTimeString();
//             const dateString = modifiedDate.toLocaleDateString();

//             const info = document.createElement("p");
//             info.textContent = `File: ${fileName} | Uploaded At: ${timeString} on ${dateString}`;
//             info.style.fontWeight = "bold";
//             info.style.marginTop = "10px";

//             recentInfoContainer.innerHTML = "";
//             recentInfoContainer.appendChild(info);

//             localStorage.setItem("fileUploaded", "true");
//         });
//     }

//     chartImages.forEach((img) => {
//         img.addEventListener("click", () => {
//             const uploaded = localStorage.getItem("fileUploaded");
//             if (uploaded === "true") {
//                 const chartType = img.className.trim();

//                 // Avoid duplicate charts
//                 const existingCharts = JSON.parse(localStorage.getItem("selectedCharts") || "[]");
//                 if (!existingCharts.includes(chartType)) {
//                     existingCharts.push(chartType);
//                     localStorage.setItem("selectedCharts", JSON.stringify(existingCharts));
//                 }

//                 showBlueprint(chartType);
//             } else {
//                 alert("Please upload a CSV file first.");
//             }
//         });
//     });

//     function renderHeaders(headers) {
//         headersContainer.innerHTML = '';
//         headers.forEach(header => {
//             const p = document.createElement('p');
//             p.textContent = header.trim();
//             headersContainer.appendChild(p);
//         });
//     }
//     resultDiv.appendChild(container);
//     function showBlueprint(chartType) {
//         const blueprintPath = `Image/blueprints/${chartType}_blueprint.png`;
//         const img = new Image();
//         img.src = blueprintPath;
//         img.style.width = "300px";
//         img.style.height = "300px";
//         img.style.marginLeft = "100px";
//         img.style.display = "flex";
//         img.style.cursor = "default"; 
//         img.alt = chartType;

//         img.onload = function () {
//             const container = document.createElement("div");
//             container.classList.add("draggable-container");
//             container.style.marginBottom = "20px";
//             container.style.position = "absolute";
//             container.style.left = "100px";
//             container.style.top = "100px";
//             container.style.cursor = "move";
//             container.style.border = "1px solid #ccc";
//             container.style.padding = "10px";
//             container.style.background = "#fff";
//             container.addEventListener("mousemove", function (e) {
//                 const rect = container.getBoundingClientRect();
//                 const offset = 10; // how close to the edge to show resize cursor

//                 const isLeft = e.clientX - rect.left < offset;
//                 const isRight = rect.right - e.clientX < offset;
//                 const isTop = e.clientY - rect.top < offset;
//                 const isBottom = rect.bottom - e.clientY < offset;

//                 if ((isLeft && isTop) || (isRight && isBottom)) {
//                     container.style.cursor = "nwse-resize";
//                 } else if ((isRight && isTop) || (isLeft && isBottom)) {
//                     container.style.cursor = "nesw-resize";
//                 } else if (isLeft || isRight) {
//                     container.style.cursor = "ew-resize";
//                 } else if (isTop || isBottom) {
//                     container.style.cursor = "ns-resize";
//                 } else {
//                     container.style.cursor = "move"; // default drag
//                 }
//             });

//             const title = document.createElement("h3");
//             title.textContent = `${chartType} Blueprint`;
//             title.style.margin = "0 0 10px 0";

//             // Menu button
//             const menuBtn = document.createElement("button");
//             // menuBtn.textContent = "⋮";
//             menuBtn.textContent = "...";
//             menuBtn.style.position = "absolute";
//             menuBtn.style.top = "5px";
//             menuBtn.style.right = "5px";
//             menuBtn.style.border = "none";
//             menuBtn.style.background = "transparent";
//             menuBtn.style.cursor = "pointer";
//             menuBtn.style.fontSize = "18px";

//             // Menu dropdown
//             const menuDropdown = document.createElement("div");
//             menuDropdown.style.position = "absolute";
//             menuDropdown.style.top = "25px";
//             menuDropdown.style.right = "5px";
//             menuDropdown.style.background = "#f9f9f9";
//             menuDropdown.style.border = "1px solid #ccc";
//             menuDropdown.style.padding = "5px";
//             menuDropdown.style.display = "none";
//             menuDropdown.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";
//             menuDropdown.style.zIndex = "10";

//             // Remove option
//             const removeOption = document.createElement("div");
//             removeOption.textContent = "Remove";
//             removeOption.style.cursor = "pointer";
//             removeOption.style.color = "block";
//             removeOption.addEventListener("click", () => {
//                 container.remove();
//                 const charts = JSON.parse(localStorage.getItem("selectedCharts") || "[]");
//                 const updatedCharts = charts.filter(c => c !== chartType);
//                 localStorage.setItem("selectedCharts", JSON.stringify(updatedCharts));
//             });

//             // Toggle menu
//             menuBtn.addEventListener("click", (e) => {
//                 e.stopPropagation();
//                 menuDropdown.style.display = menuDropdown.style.display === "none" ? "block" : "none";
//             });

//             document.addEventListener("click", () => {
//                 menuDropdown.style.display = "none";
//             });

//             menuDropdown.appendChild(removeOption);
//             container.appendChild(menuBtn);
//             container.appendChild(menuDropdown);

//             container.appendChild(title);
//             container.appendChild(img);
//             resultDiv.appendChild(container);

//             makeDraggableResizable(container);
//         };
        
//         container.addEventListener("dblclick", () => {
//             container.style.cursor = "move";
//         });

//         // Optional: Reset cursor when clicking outside (optional UX improvement)
//         document.addEventListener("click", (e) => {
//             if (!container.contains(e.target)) {
//                 container.style.cursor = "default";
//             }
//         });

//         img.onerror = function () {
//             const error = document.createElement("p");
//             error.style.color = "red";
//             error.textContent = `Blueprint image not found: ${blueprintPath}`;
//             resultDiv.appendChild(error);
//         };
        
//     }

//     function makeDraggableResizable(element) {
//         interact(element)
//             .draggable({
//                 inertia: true,
//                 listeners: {
//                     move(event) {
//                         const target = event.target;
//                         const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
//                         const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

//                         target.style.transform = `translate(${x}px, ${y}px)`;
//                         target.setAttribute('data-x', x);
//                         target.setAttribute('data-y', y);
//                     }
//                 }
//             })
//             .resizable({
//                 edges: { left: true, right: true, bottom: true, top: true },
//                 listeners: {
//                     move(event) {
//                         let { x, y } = event.target.dataset;

//                         x = parseFloat(x) || 0;
//                         y = parseFloat(y) || 0;

//                         Object.assign(event.target.style, {
//                             width: `${event.rect.width}px`,
//                             height: `${event.rect.height}px`,
//                         });

//                         event.target.setAttribute('data-x', x);
//                         event.target.setAttribute('data-y', y);
//                     }
//                 },
//                 modifiers: [
//                     interact.modifiers.restrictSize({
//                         min: { width: 150, height: 150 },
//                         max: { width: 800, height: 800 }
//                     })
//                 ],
//                 inertia: true
//             });
//     }
// });

