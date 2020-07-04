import { fileUpload } from '~helpers';
import cloudinary from '~cloudinary';

describe('Tests fileUpload helper', () => {
  test('Should upload a file and return obj with the secure_url and original_filename fields', async (done) => {
    const resp = await fetch('https://raw.githubusercontent.com/joalbertg/react-spa_heroes_app/master/screenshots/login.png');
    const blob = await resp.blob();

    const file = new File([blob], 'foto.png');
    const respFile = await fileUpload(file);
    const { public_id, original_filename, secure_url } = respFile;

    expect(typeof respFile).toBe('object');
    expect(public_id).toBeTruthy();
    expect(original_filename).toBeTruthy();
    expect(secure_url).toBeTruthy();
    expect(secure_url.includes(public_id)).toBeTruthy();

    cloudinary.v2.api.delete_resources([public_id], () => done());
  });

  test('Should return and error', async () => {
    const file = new File([], 'foto.png');

    try {
      const respFile = await fileUpload(file);
    } catch (err) {
      const { error } = err;

      expect(typeof error).toBe('object');
      expect(error.message).toBeTruthy();
      expect(error.message).toBe('Empty file');
    }
  });
});

