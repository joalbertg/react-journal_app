export const fileUpload = async (file) => {
  const cloudUrl = 'https://api.cloudinary.com/v1_1/dear7hmry/upload';
  const formData = new FormData();

  formData.append('file', file);
  formData.append('upload_preset', 'react-journal');

  try {
    const resp = await fetch(cloudUrl, {
      method: 'POST',
      body: formData
    });

    if(resp.ok) {
      return await resp.json();
    } else {
      throw await resp.json();
    }
  } catch(error) {
    throw error;
  }
}

