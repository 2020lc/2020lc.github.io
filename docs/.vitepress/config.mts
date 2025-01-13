import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '天晴笔记',
  description: '好记性，不如烂笔头',
  srcDir: 'src',
  // 主题
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/favicon.ico',
    search: {
      provider: 'local',
    },
    nav: [
      { text: '首页', link: '/' },
      // { text: '前端', link: '/markdown-examples' },
      // { text: '服务端', link: '/' },
    ],
    sidebar: {
      '/github/': [
        {
          text: 'Github',
          link: '/github/',
          items: [
            { text: 'github page', link: '/github/page' },
            { text: 'ssh', link: '/github/ssh' },
          ],
        },
      ],
      '/typescript/': [
        {
          text: 'Typescript',
          link: '/typescript/',
          items: [
            { text: 'tsconfig.json', link: 'typescript/tsconfig' },
            { text: '操作符', link: 'typescript/operate' },
          ],
        },
      ],
    },
    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    // ]
  },
});
