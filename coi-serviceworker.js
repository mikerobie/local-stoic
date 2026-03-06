/* coi-serviceworker v0.1.7 - https://github.com/gzuidhof/coi-serviceworker */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

function isJS(url) {
  const u = new URL(url, location.href);
  return u.pathname.endsWith(".js") || u.pathname.endsWith(".mjs");
}

self.addEventListener("fetch", function(e) {
  if (e.request.cache === "only-if-cached" && e.request.mode !== "same-origin") return;
  e.respondWith(
    fetch(e.request).then(function(response) {
      if (response.status === 0) return response;
      const newHeaders = new Headers(response.headers);
      newHeaders.set("Cross-Origin-Opener-Policy", "same-origin");
      newHeaders.set("Cross-Origin-Embedder-Policy", "credentialless");
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
      });
    })
  );
});