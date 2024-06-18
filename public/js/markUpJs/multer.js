
console.log('multer.js');

document.getElementById('uploadForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    //get form data
    const formData = new FormData();
    const files = document.querySelector('input[type="file"]').files;
    for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
    }
    
    // csrf
    const csrfToken = document.getElementById('_csrf').value;
    formData.append('_csrf', csrfToken);

    console.log('formData', formData);

    try {
        const response = await fetch('/upload/images', {
            method: 'POST',
            //add csrf manually
            headers: {
                'X-CSRF-Token': csrfToken
            },
            body: formData

        });

        const result = await response.json();
        if (response.ok) {
            document.getElementById('result').innerText = 'Images uploaded successfully';
            console.log(result);
            displayUploadedImages(result.images);
        } else {
            document.getElementById('result').innerText = result.message;
            console.error(result.error);
        }
    } catch (error) {
        document.getElementById('result').innerText = 'An error occurred';
        console.error(error);
    }
});




async function deleteImage(id) {

    //csrf
    const csrfToken = document.getElementById('_csrf').value;


    try {
        const response = await fetch(`/delete/images/${id}`, {
            headers: {
                'X-CSRF-Token': csrfToken
            },
            method: 'DELETE'
        });

        const result = await response.json();
        if (response.ok) {
            document.getElementById(`image-${id}`).remove();
            document.getElementById('result').innerHTML = result.message;
        } else {
            console.error(result.message);
            document.getElementById('result').innerHTML = result.message;
        }
    } catch (error) {
        console.error('An error occurred', error);
    }
}

function displayUploadedImages(images) {
    const uploadedImagesDiv = document.getElementById('uploadedImages');
    uploadedImagesDiv.innerHTML = '';
    images.forEach(image => {
        const imageDiv = document.createElement('div');
        imageDiv.id = `image-${image._id}`;
        imageDiv.innerHTML = `
            <p>${image.originalname}</p>
            <button onclick="deleteImage('${image._id}')">Delete</button>
        `;
        uploadedImagesDiv.appendChild(imageDiv);
    });
}
