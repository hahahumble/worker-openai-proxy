const OPENAI_URL = 'https://api.openai.com';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
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
  
  modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
  
  return modifiedResponse;
}
