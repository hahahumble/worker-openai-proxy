# ☁️ Cloudflare Workers OpenAI 代理

## 🚀 使用
- [https://api.speechgpt.app](https://api.speechgpt.app)

**注意**：
- 该代理只供 [speechgpt.app](https://speechgpt.app) 使用。
- 不保证稳定性，不保证长期可用，长期使用建议自行部署。

## 🛠️ 部署
[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/hahahumble/worker-openai-proxy)

## 🔍 原理
该方案的原理是通过 Cloudflare Workers 代理 OpenAI API，配合自己可以正常访问的域名，实现在内地正常访问 OpenAI API。

## 🎁 捐赠
如果你觉得这个项目对你有帮助，可以考虑[捐赠](https://www.buymeacoffee.com/hahahumble)，谢谢！

## 📚 参考
本项目基于以下项目修改而来：
- https://github.com/noobnooc/noobnooc/discussions/9
- https://developers.cloudflare.com/workers/platform/deploy-button/

## 📝 说明
如何限制只有自己的域名可以访问？

```javascript
const OPENAI_URL = 'https://api.openai.com';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const origin = request.headers.get('Origin');
  const allowedOrigin = '<允许访问的域名>';

  if (origin === allowedOrigin) {
    const url = new URL(request.url);
    url.host = OPENAI_URL.replace(/^https?:\/\//, '');

    const modifiedRequest = new Request(url.toString(), {
      headers: request.headers,
      method: request.method,
      body: request.body,
      redirect: 'follow'
    });

    const response = await fetch(modifiedRequest);
    const modifiedResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    });

    modifiedResponse.headers.set('Access-Control-Allow-Origin', allowedOrigin);

    return modifiedResponse;
  } else {
    return new Response('Unauthorized', { status: 403 });
  }
}
```
将 `<允许访问的域名>` 替换为你自己的域名即可。
