document.addEventListener('DOMContentLoaded', function () 
{
    const container = document.getElementById('recent-file-info');
    const list = JSON.parse(localStorage.getItem('recentCSVList')) || [];

    if (list.length > 0) 
    {
        list.forEach(fileInfo => 
        {
            const entry = document.createElement('p');
            // entry.innerHTML = `<strong >File:</strong> ${fileInfo.name} <br><strong style="margin-top:-90px;">Uploaded:</strong> ${fileInfo.modified}`;
            entry.innerHTML = `<p><strong></strong> ${fileInfo.name}</p>
                            <p style="margin-left:700px; margin-top:-35px;line-height:50px"><strong></strong> ${fileInfo.modified}</p>`;
            entry.style.marginBottom = '10px';
            // entry.style.marginTop = '10px';
            container.appendChild(entry);
        });
    } 
    else 
    {
        container.innerHTML = '<p>No recent files found.</p>';
    }
});
