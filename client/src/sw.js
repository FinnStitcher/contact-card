import {registerRoute} from 'workbox-routing';
import {StaleWhileRevalidate, CacheFirst} from 'workbox-strategies';
import {precacheAndRoute} from 'workbox-precaching';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';
import {ExpirationPlugin} from 'workbox-expiration';

precacheAndRoute(self.__WB_MANIFEST);

const cacheName = 'static-resources';

const matchCallback = ({ request }) => {
    console.log(request);
    return (
        request.destination === 'style' || request.destination === 'script'
    );
};

registerRoute(
    matchCallback,
    // stale while revalidate = get the stuff from the cache and simultaneously message the network
    new StaleWhileRevalidate({
        cacheName,
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            })
        ]
    })
);

// this one caches images
// doing cache first here
registerRoute(
    ({request}) => request.destination === 'image',
    new CacheFirst({
        cacheName: 'image-cache',
        plugins: [
            new CacheableResponsePlugin({
                statuses: [0, 200]
            }),
            new ExpirationPlugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60 // delete anything older than 30 days
            })
        ]
    })
);