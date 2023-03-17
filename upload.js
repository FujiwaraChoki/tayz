document.addEventListener('DOMContentLoaded', () => {
    const area = document.querySelector('.upload-area');
    const fileInput = document.querySelector('#file-input');
    const progressBarFileUpload = document.querySelector('#progress-bar-file-upload');

    // When user clicks on area, open file explorer but only when upload button is not clicked
    area.addEventListener('click', () => {
        if (area.classList.contains('upload-area')) {
            fileInput.click();
        }
    });

    // When user selects a file, show file name and change upload button to upload
    fileInput.addEventListener('change', () => {
        const fileName = fileInput.files[0].name;
        const fileSize = fileInput.files[0].size;
        const fileReader = new FileReader();

        area.classList.add('upload-area-active');
        document.querySelector('.file-name').innerHTML = `${fileName} (${Math.round(fileSize / 1024)} KB)`;

        // Upload file using fetch API
        fetch('/upload', {
            method: 'POST',
            body: fileInput.files[0],
            headers: {
                'Content-Type': 'application/octet-stream'
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Network response was not ok');
            }
        }).then(data => {
            console.log(data);
        }).catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

        // Update progress bar as file is uploaded
        fileReader.onloadstart = () => {
            progressBarFileUpload.style.width = '0%';
        };
        fileReader.onprogress = event => {
            const progress = Math.round((event.loaded / event.total) * 100);
            progressBarFileUpload.style.width = `${progress}%`;
            progressBarFileUpload.innerHTML = `${progress}%`;
        };
        fileReader.onload = () => {
            progressBarFileUpload.classList.add('bg-success');
            progressBarFileUpload.innerHTML = 'Upload Complete';
        };

        fileReader.readAsArrayBuffer(fileInput.files[0]);
    });
});
