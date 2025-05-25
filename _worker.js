export default {
  async fetch(request, env, ctx) {
    // Forward the request to the Worker
    const worker = await env.ASSETS.fetch(request);
    return worker;
  }
}; 