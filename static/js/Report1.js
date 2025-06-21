//    document.addEventListener('DOMContentLoaded', () => {
//     const fileInput = document.getElementById('file-input');
//     const resultDiv = document.querySelector('.result');

//     if (!fileInput || !resultDiv) return;

//     fileInput.addEventListener('change', async () => {
//         const file = fileInput.files[0];
//         if (!file) return;

//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             const response = await fetch('http://127.0.0.1:5000/analyze', {
//                 method: 'POST',
//                 body: formData
//             });

//             const data = await response.json();
//             if (data.error) {
//                 resultDiv.innerHTML = `<p style="color:red;">Error: ${data.error}</p>`;
//                 return;
//             }

//             // Only add this visualization code
//             const table = document.createElement('table');
//             table.style.border = '1px solid #333';
//             table.style.borderCollapse = 'collapse';
//             table.style.marginTop = '20px';

//             // Add heatmap image
//             const heatmapImg = document.createElement('img');
//             heatmapImg.src = 'static/correlation_matrix.png?' + new Date().getTime(); // avoid cache
//             heatmapImg.alt = 'Correlation Matrix Heatmap';
//             heatmapImg.style.marginTop = '20px';
//             heatmapImg.style.maxWidth = '100%';
//             heatmapImg.style.marginLeft = '300px';
//             resultDiv.appendChild(heatmapImg);
//         } 
//         catch (err) {
//             resultDiv.innerHTML = `<p style="color:red;">Request failed: ${err.message}</p>`;
//         }
//     });
// });










document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const resultDiv = document.querySelector('.result');

    fileInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        // resultDiv.innerHTML = "<p>Analyzing CSV for correlation matrix...</p>";

        try {
            const response = await fetch('http://127.0.0.1:5000/analyze', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                resultDiv.innerHTML = `<p style="color:red;">Error: ${errorData.error}</p>`;
                return;
            }

            const blob = await response.blob();
            // const imgURL = URL.createObjectURL(blob);
            
            const heatmapImg = document.createElement('img');
            heatmapImg.src = 'static/correlation_matrix.png?' + new Date().getTime(); // avoid cache
            heatmapImg.alt = 'Correlation Matrix Heatmap';
            heatmapImg.style.marginTop = '20px';
            heatmapImg.style.maxWidth = '100%';
            heatmapImg.style.marginLeft = '300px';
            resultDiv.appendChild(heatmapImg);
            // resultDiv.innerHTML = `<h3>Correlation Matrix</h3>
            //                        <img src="${imgURL}" style="max-width:100%; border:1px solid #ccc;margin-left:300px;"/>`;
        } catch (err) {
            resultDiv.innerHTML = `<p style="color:red;">Request failed: ${err.message}</p>`;
        }
    });
});

