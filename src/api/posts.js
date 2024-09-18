import { posts } from '.';

export function getPosts(params) {
  return posts.get('/', { params });
}

export async function getPostById(id) {
  //return await posts.get(`/${id}`);
  return await posts.get(`/${String(id)}`);
}

export async function createPost(data) {
  return await posts.post('', data);
}
export async function updatePost(id, data) {
  //return await posts.put(id, data);
  return await posts.patch(`/${String(id)}`, data);
}
export async function deletePost(id) {
  return await posts.delete(`/${String(id)}`);
}
