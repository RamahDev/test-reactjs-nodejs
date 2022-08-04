import Axios from 'axios';

import config from '../../data/config';

export const uploadFile = async (file: any): Promise<string> => {
  const bodyFormData = new FormData();
  bodyFormData.append('file', file);
  return new Promise((resolve, reject) => {
    Axios({
      method: 'POST',
      url: config.baseURL + 'upload',
      headers: {'Content-Type': 'multipart/form-data'},
      data: bodyFormData,
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export default {uploadFile};
