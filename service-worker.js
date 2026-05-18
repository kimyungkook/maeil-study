/* ═══════════════════════════════════════════════════
   매일-스터디 Service Worker (서비스 워커)
   오프라인에서도 앱이 작동하도록 캐시를 관리합니다
   ═══════════════════════════════════════════════════ */

const CACHE_NAME = 'maeil-study-v1.0.0';

/* 오프라인에서도 쓸 수 있게 저장할 파일 목록 */
const CACHE_FILES = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&display=swap',
  'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css',
];

/* ── 설치: 파일을 캐시에 저장 ── */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHE_FILES).catch((err) => {
        console.log('[SW] 캐시 저장 중 일부 실패 (정상):', err);
      });
    })
  );
  self.skipWaiting();
});

/* ── 활성화: 오래된 캐시 삭제 ── */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

/* ── 네트워크 요청 처리: 캐시 우선, 없으면 네트워크 ── */
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (response && response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      }).catch(() => {
        /* 오프라인이고 캐시에도 없으면 index.html 반환 */
        return caches.match('./index.html');
      });
    })
  );
});

/* ── 푸시 알림 수신 처리 ── */
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || '매일-스터디';
  const options = {
    body: data.body || '지금 공부할 시간이에요!',
    icon: './icons/icon-192.png',
    badge: './icons/icon-192.png',
    vibrate: [200, 100, 200],
    tag: 'study-notification',
    data: { url: data.url || './' }
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

/* ── 알림 클릭 시 앱 열기 ── */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url || './')
  );
});
