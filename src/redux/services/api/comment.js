import { apiBase } from '../../constants';

export default class CommentService {
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

  getList = (articleId = null) => {
    const params = articleId
      ? `?id=${articleId}`
      : null;

    return this.getResource(`/api/comment${params}`)
      .then(res => {
        if (res.status) {
          return res.commentList;
        } else {
          throw res.error;
        }
      });
  };

  addComment = (content, pid, articleId) => {
    return this.setResource('/api/comment', {
      content,
      pid,
      articleId
    }, 'PUT').then(res => {
      if (res.status){
        return res.message;
      } else {
        throw res.error;
      }
    });
  };
}
