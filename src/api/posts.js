import { posts, comments } from '.';

export function getPosts(params) {
  return posts.get('/', { params });
}

export async function getPostById(id) {
  //return await posts.get(`/${id}`);
  return await posts.get(id);
}

export async function createPost(data) {
  return await posts.post('', data);
}
export async function updatePost(id, data) {
  //return await posts.put(id, data);
  return await posts.patch(id, data);
}
export async function deletePost(id) {
  return await posts.delete(`/${id}`);
}

// api/posts.js

// 댓글 가져오기
export async function getComments() {
  try {
    return await comments.get('');
  } catch (error) {
    return console.log('댓글이 없습니다');
  }
}

// 댓글 작성
export async function createComment(data) {
  return await comments.post('', data); // 올바른 URL 형식
}
