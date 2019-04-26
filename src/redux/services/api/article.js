import { apiBase } from '../../constants';

export default class ArticleService {
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
    return this.getResource('/api/articles')
      .then(res => {
        if (res.status){
          return res.articles;
        } else {
          throw res.error;
        }
      });
  };

  getArticleByValue = (value) => {
    return this.getResource('/api/articles/' + value)
      .then(res => {
        if (res.status){
          return res.article;
        } else {
          throw res.error;
        }
      });
  };

  addArticle = (title, content, mainImageBase64) => {
    return this.setResource('/api/articles', {
      title,
      content,
      mainImageBase64: JSON.stringify(mainImageBase64)
    }, 'PUT').then(res => {
      if (res.status){
        return res.status;
      } else {
        throw res.error;
      }
    });
  };

  deleteArticle = (articleId) => {
    return this.setResource('/api/articles', {
      articleId
    }, 'DELETE').then(res => {
      if (res.status){
        return res.articles;
      } else {
        throw res.error;
      }
    });
  };
}
