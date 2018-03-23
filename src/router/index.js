import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import Choice from '@/components/Choice'
import details from '@/components/details'
/*预览**/
import preview1 from '@/components/allPreview/preview1'
import preview2 from '@/components/allPreview/preview2'
import preview3 from '@/components/allPreview/preview3'
/*模板*/
import operation1 from '@/components/Template/model1/operation'
import operation2 from '@/components/Template/model2/operation'
import operation3 from '@/components/Template/model3/operation'
import operation1Middle from '@/components/Template/model1/operationMiddle'
Vue.use(Router)

export default new Router({
  routes: [
   {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/Choice',
      name: 'Choice',
      component: Choice
    },
    {
      path: '/preview1',
      name: 'preview1',
      component: preview1
    },
    {
      path: '/preview2',
      name: 'preview2',
      component: preview2
    },
    {
      path: '/preview3',
      name: 'preview3',
      component: preview3
    },
    {
      path: '/operation1',
      name: 'operation1',
      component: operation1
    },
    {
      path: '/operation2',
      name: 'operation2',
      component: operation2
    },
    {
      path: '/operation3',
      name: 'operation3',
      component: operation3
    },
    {
      path: '/operation1Middle',
      name: 'operation1Middle',
      component: operation1Middle
    },
    {
      path: '/details',
      name: 'details',
      component: details
    },
  ]
})
