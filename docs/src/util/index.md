# 工具函数

## Copy

**日常复制文本**

```typescript
let copyInput: HTMLInputElement | null = null;
const copyText = async (text: string): Promise<boolean> => {
  try {
    // 使用新api
    const { clipboard } = navigator;
    if (clipboard) {
      await clipboard.writeText(text);
      return true;
    }
    // 使用旧api
    if (!copyInput) {
      copyInput = document.createElement('input');
      copyInput.value = text;
      document.body.appendChild(copyInput);
      copyInput.style.display = 'none';
    } else {
      copyInput.value = text;
    }
    copyInput.select();
    document.execCommand('copy');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
```

**保留格式**

> 适用复制 markdown, html  
> npm 包：`marked`

```typescript
// 方案1
const copyHtmlClipboard = (
  plainText: string,
  htmlStr: string
): Promise<boolean> => {
  const { clipboard } = navigator;
  if (!clipboard) {
    return false;
  }
  try {
    // 支持两种MINE格式，接收方应用根据自身能力选择最合适的格式
    await clipboardObj.write([
      new ClipboardItem({
        'text/plain': new Blob([plainText], { type: 'text/plain' }),
        'text/html': new Blob([htmlStr], { type: 'text/html' }),
      }),
    ]);
  } catch (err) {
    console.error(err);
    return false;
  }
};

// 方案2
const copyHtmlExecCommand = (dom: Element): Promise<boolean> => {
  const selection = window.getSelection();
  const range = document.createRange();
  if (!selection) {
    return false;
  }
  document.body.appendChild(dom);

  selection.removeAllRanges();
  range.selectNodeContents(dom);
  selection.addRange(range);
  document.execCommand('copy');

  document.body.removeChild(dom);
  return true;
};

// 使用
const markDownText = `
- **季度下单金额**<font color='green'>上涨</font><font color='green'>284元</font>，变化率<font color='green'>+</font><font color='green'>0.00%</font>；按**产品分类**->**产品一级分类**->**集团名称**进行维度下钻分析，当前结果展示设置下的【**产品分类**】维度贡献度TOP0为：\n\n\n\n\n\n🌈 **探查更多数据发现**：\n\n\n- 按可选公式（**季度下单金额=已下单待消耗+季度消耗**）拆解，对季度下单金额影响较大的指标为：****（分析期，变化率，贡献度）；\n\n\n
`;
// 使用iframe内嵌的应用clipboard会失效（需要同框架测一起解决）
const useApi1 = async () => {
  const htmlStr = await marked.parse(markdownText);
  const domParser = new DOMParser();
  const doc = domParser.parseFromString(htmlStr, 'text/html');
  const plainText = doc.documentElement.textContent || '';
  const copyRes = await copyHtmlClipboard(plainText, htmlStr);
};
// 兼容性好，但ExecCommand在官网明确未来会废除
const useApi2 = async () => {
  const htmlStr = await marked.parse(markdownText);
  const domParser = new DOMParser();
  const doc = domParser.parseFromString(htmlStr, 'text/html');
  const copyRes = await copyHtmlExecCommand(doc.body);
};
```
