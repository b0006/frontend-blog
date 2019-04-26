import { apiBase } from '../../constants';

export default class KeyWordService {
  getResource = async (url, method = 'GET') => {
    const res = await fetch(apiBase + url, {
      method
    });
    return res.json();
  };

  setResource = async (url, content, method = 'POST') => {
    const res = await fetch(apiBase + url, {
      method: method,
      body: JSON.stringify(content),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return res.json();
  };

  getList = () => {
    return this.getResource('/api/keywords')
      .then(res => {
        if (res.status){
          return res.keyWordList;
        } else {
          throw res.error;
        }
      });
  };

  addKeyWord = (title, description, iconBase64) => {
    return this.setResource('/api/keywords', {
      title,
      description,
      iconBase64: JSON.stringify(iconBase64)
    }, 'PUT').then(res => {
      if (res.status){
        return res.keyword;
      } else {
        throw res.error;
      }
    });
  };
}
