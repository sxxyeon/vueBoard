import { createRouter, createWebHashHistory } from 'vue-router';
import PostCreateView from '@/views/posts/PostCreateView.vue';
import PostListView from '@/views/posts/PostListView.vue';
import PostEditView from '@/views/posts/PostEditView.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import LikedPostView from '@/views/posts/LikedPostView.vue';

const routes = [
  {
    path: '/',
    name: 'PostList',
    component: PostListView,
    children: [
      {
        path: 'p1',
        name: 'P1',
        component: PostListView
      },
      {
        path: 'p2',
        name: 'P2',
        component: PostListView
      },
      {
        path: 'p3',
        name: 'P3',
        component: PostListView
      }
    ]
  },
  {
    path: '/create',
    name: 'PostCreate',
    component: PostCreateView
  },
  {
    path: '/:id',
    name: 'PostDetail',
    component: PostDetailView,
    props: true
  },
  {
    path: '/:id/edit',
    name: 'PostEdit',
    component: PostEditView,
    props: true
  },
  {
    path: '/my',
    name: 'LikedPost',
    component: LikedPostView,
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundView
  }
];

const router = createRouter({
  //history: createWebHistory('/'),
  history: createWebHashHistory(),
  routes
});

export default router;
