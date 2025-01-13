# github page

> - github 部署静态网站
> - 使用[vitepress](https://vitepress.dev/zh/guide/getting-started)搭建

## 搭建过程

### 1. 创建 github 远程仓库

**仓库命名有两种**

1. `user.github.io`：部署网站的时候网址为`https://user.github.io/`
2. `xxx`：部署网站的时候网站为`https://user.github.io/xxx`

### 2. 创建本地文件

1. 新建一个文件夹
2. 执行`git init`
3. 使用 node18：`nvm use 18`
4. 安装 pnpm：`npm install -g pnpm`
5. 安装 vitepress：`pnpm add -D vitepress`
6. 执行`pnpm vitepress init`
7. 新建`.gitignore`

```text
# vscode
.vscode/\*

# files
node_modules/
docs/.vitepress/cache
docs/.vitepress/dist

# git
.git/\*
```

8. 执行`pnpm add vue typescript -D`
   > 虽然 vitepress 内置了 vue 跟 ts，但是写的时候没有 vue 提示，以及 ts 语法错误，很烦
9. 新建`vite-env.d.ts`

```typescript
declare module '*.vue' {
  import { defineComponent } from 'vue';
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}
```

10. 执行`tsc init`，生成`tsconfig.json`

```json
{
    "compilerOptions": {
        ...
    },
    "include": [
        "vite-env.d.ts",
        "docs/.vitepress/**/*"
  ]
}
```

## Q&A

**Q1：设置源文件路径后，路径都不对了**

> 例`srcDir: src`

- 设置源文件路径后，除`theme`，`config.mts`外，路径都相对于源文件
- public 目录不能更名，public 下的资源，需使用根路径引用，如`src/public/favicon.ico`，引用路径为`/favicon.ico`
