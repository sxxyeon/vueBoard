import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import PostCreateView from '@/views/posts/PostCreateView.vue';
import PostListView from '@/views/posts/PostListView.vue';
import PostEditView from '@/views/posts/PostEditView.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import NestedView from '@/views/nested/NestedView.vue';
import NestedOneView from '@/views/nested/NestedOneView.vue';
import NestedTwoView from '@/views/nested/NestedTwoView.vue';
import NestedHomeView from '@/views/nested/NestedHomeView.vue';
import LikedPostView from '@/views/posts/LikedPostView.vue';

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: AboutView
  // },
  {
    path: '/',
    name: 'PostList',
    component: PostListView
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
  // {
  //   path: '/nested',
  //   name: 'Nested',
  //   component: NestedView,
  //   children: [
  //     {
  //       path: '',
  //       name: 'NestedHome',
  //       component: NestedHomeView
  //     },
  //     {
  //       path: 'one',
  //       name: 'NestedOne',
  //       component: NestedOneView
  //     },
  //     {
  //       path: 'two',
  //       name: 'NestedTwo',
  //       component: NestedTwoView
  //     }
  //   ]
  // },
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
