import DefaultTheme from 'vitepress/theme';
import { EnhanceAppContext } from 'vitepress';
import MyLayout from './Layout.vue';
import Foo from './foo.vue';

export default {
  extends: DefaultTheme,
  Layout: MyLayout,
  enhanceApp({ app, router, siteData }: EnhanceAppContext) {
    // 用来注册全局布局组件
    app.component('Foo', Foo);
  },
};
