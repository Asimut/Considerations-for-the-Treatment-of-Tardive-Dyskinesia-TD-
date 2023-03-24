// This is the "Offline page" service worker
// const CACHE = "pwabuilder-page";
const CACHE = "pwabuilder-offline";

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');    


// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = "index.html";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', e => {
  console.log('11111111111111111111');

  e.waitUntil(caches.open(CACHE).then(async (cache) => {
    let ok,
    libjs = ['player-0.0.11.min', 'main.bundle', 'lzwcompress'],
    libcss = ['main.bundle', 'icomoon'],
    libfonts = ['icomoon', 'Lato-Black', 'Lato-Bold', 'Lato-Italic', 'Lato-Light', 'Lato-Regular'],
    assetsvideo =['8csJfgnk_w4uDIss_transcoded--p-K0T8ihC0O0NHv-Ed_8Weeks','8dpu8wRkIzaJnwfl_transcoded-QDqKCPlPruDgXj5--Gloria_2Weeks', '43wflbUrwypAZmcE_transcoded-rJfHogn6SIOhVT3v-Jane_Baseline','bUT1YtSpcaN3lYuU_transcoded-LvBEHhN3GT1Cnf8U-Gloria_6Weeks','f4oQvp2QWpvVXpou_transcoded-LalaPRKzNnds7fOX-lower-limbs','fo58139l7zSD7mhM_transcoded-EIG8-_2SuQtTgoae-Sue_Baseline','gCUgRHLYh_TJrwJJ_transcoded-t9PVyavmR7KoJT-W-Jane_6Weeks','h3PB3H7jQixfkZ5E_transcoded-rYO1lHqrO4rTMrlo-Martin_6Weeks','hM-3Q2p0lw9lvKTa_transcoded-kd_IwTb56uWFyUbl-Ed_Baseline','L-BbXl9ujQrjllzP_transcoded-cuFpRjmcAvLPRgBF-Martin_Baseline','ml8kh5Q5g3geMRFd_transcoded-eZ9E531W2YCH-5Jd-upper-limbs','nA19pr2557EuEIIe_transcoded-cyqlI9DTLppcN8Vk-torso','pGs4uH1WlIzT_5cW_transcoded-WrsXiZUS_HBNp3RL-Sue_48Weeks','Tyb8raXjvxiFnZTL_transcoded-6F-kinz-Um3SBb7u-Gloria_Baseline','U7pGGCyhWP1cj9V2_transcoded-p3ZW65hnn88TuGUm-Jane_48Weeks','VFeLfdTh86kyFBV0_transcoded-Ej_YvFp67do0WgIJ-Sue_6Weeks','Xsm3YHQG5Tan9yU1_transcoded-6iZM7VOHmGoVJ7qg-lips'],
    assetssvg = ['6qfhEmAjI4za5jnl_9_OaSN0gZxqw1dV1','77PvBMwT60XFnjiW_nNF_8JAH3JQIy4C3','cQoKWPof9JSrT2Bc_C88oIjnBMA5EDKh6',
        'dLEW1xKrNyTT2bCO_OrQX187Z-zJRRNYT',
        'e9KBiO4Iov7O2Amb_eBNFJIOYzNOhWZYQ',
        'ea0svQqrBTlLomqz_GpzbeCJLaV67eZ1P',
        'hMP6bgPgH9_3DtdB_ykYH-2sOuLlt3xBh',
        'hPIrKQ_svbFV9_uW_p5OCBEEwEmLb_bEs',
        'IwnobA9XxpRPR9I4_oIvQVO0kU3JbZteJ',
        'kmmZSDFAdhGVS2Sm_ZV9sVhdLLPr5_C8F',
        'LltI86vlRjgHx3eJ_pUKlA_ZN5HnDD-9s',
        'LOplv9bK0Pj0N3nh_l4DwlC6Zyzh7p3yI',
        'SZ4WoY4_JqwwhWVt_ZPmBKRlu0OrtPMw2',
        'Ue4lx4K6ghrKM12L_GEJmaWhVU7yhIAU-',
        'VQ5eICOArIu8zpnR_1u5jkIIq4niuBhVo',
        'WFVUBEKPjSoA7FRB_sDS_9D364hA2SlJ-',
        'YFW2Y5iZqD6Bz0QE_-n9YNqPAl_oHkUcM',
        '0K3rhzRibL-wX-ZM_87lR_1YbKaT0xj89',
        ],
    assetspng = ['0WCtp9rlPaH1ic39_yjZQLNQnL37VJ8Ca',
        '2MR_wS712Lsb4JhF_small_1579124541',
        '4pauyQuBTvMNh8UQ_transcoded-QDqKCPlPruDgXj5--Gloria_2Weeks-00001',
        '5FrO6hui6zxIuQgn_eg2U9dbqW5iiA1gu',
        '6ReJgQW0oO8hlLwA_transcoded-rYO1lHqrO4rTMrlo-Martin_6Weeks-00001',
        '8QlD26x1fYKShgeh_KEzpUfBEn0Az1Ge-',
        '9e3kAmlXEF8eAB4e_N1-UfLnIhcQWsJBy',
        '71P_WX67Y_C5g5SF_hqZ8CPfolZhlRpSn',
        'ApAMqK3WPo4XHuLr_transcoded-LvBEHhN3GT1Cnf8U-Gloria_6Weeks-00001',
        'b8_Z6NM8_cOx_3qa_Sz_vyJhC9P2kae6N',
        'BPwoGq0Ui87eQQbv_transcoded-6iZM7VOHmGoVJ7qg-lips-00001',
        'BsDLqgTNTK53IKLl_transcoded-eZ9E531W2YCH-5Jd-upper-limbs-00001',
        'DnsNhSWy12NRB1AT_transcoded-t9PVyavmR7KoJT-W-Jane_6Weeks-00001',
        'ebimopTjP6vw0Rpp_Q0fKDZtYxc315r7W',
        'ekYC48WDmkdxZKun_transcoded-6F-kinz-Um3SBb7u-Gloria_Baseline-00001',
        'FuEKfcgOREfbtj8X_rbbCcjDvWWgedPLb',
        'FUVT7p1KYvyj3N-9_MnbOxGzPiF0rgjfF',
        'FzIbaOWx82zO2u-K_00iaS05tFptaeCbk',
        'g8uqrIAgwWBbzdfi_P1c5WYGq3jg-mCNZ',
        'GKJkMa-b77h3PikM_6IZvN3VbvJfZuVSv',
        'GNEpzj-4tOUeMnTh_zZq-bPMAXR15ya9M',
        'h1ByTZjxMiYTE6g5_transcoded-LalaPRKzNnds7fOX-lower-limbs-00001',
        'iC3hgTsFPMxWhcmY_uh4dqE7zsUI2r1wB',
        'J80srYdF2UbsVbv7_d9U3AKfdex_kRXGd',
        'JeK88gIMXsfP-r4O_mUC3DORyoD6E4WAi',
        'JmqMPRgT-3Fulcjv_J_FVNfk8t0zWFs9F',
        'K04Pr577ZF03tDDh_yIdL-BBIeA0LWkXH',
        'kuJ6EZtf0Z6y3h7H_transcoded-cuFpRjmcAvLPRgBF-Martin_Baseline-00001',
        'lZIckDB29mG18NM3_G5c__lWMeoUcW8eJ',
        'MGdroWOIOdhgeGKd_e_xujU5j_OLzuM4p',
        'mYRRacwQ6tIh27on_3wcDpAmAcE2Xyp7a',
        'nro3AdZGlnp6q8hE_small',
        'Oo7CJ6C5V7unF1Ru_transcoded-p3ZW65hnn88TuGUm-Jane_48Weeks-00001',
        'pDU1Wm3GimjkVMKQ_transcoded-cyqlI9DTLppcN8Vk-torso-00001',
        'Q6GTYVKMI_8kf1QG_ZS0Y6uc5n2amivaW',
        'q-fEMq_WyTLBMfa1_transcoded--p-K0T8ihC0O0NHv-Ed_8Weeks-00001',
        'qI61UEaUajh5mDvU_transcoded-rJfHogn6SIOhVT3v-Jane_Baseline-00001',
        'RDPcUQaaJsG0sukK_rirvyWZ-Z8H5N5WU',
        'Ubi63-eoPCZ0EEF8_mYWpiGscet6aDTb7',
        'usTLNWTclyCsY1FP_Mz2l7axu4bYxv3M6',
        'VdEK8Jcsa8EdBFwh_uFTveUW5EV5h6MiN',
        'vGt9im_M7Xw7TPIG_transcoded-EIG8-_2SuQtTgoae-Sue_Baseline-00001',
        'vHfzoxXPaIdkgD2f_Q_E9xlPksi9HxuVl',
        'vIRB38VW-hlCImfX_transcoded-WrsXiZUS_HBNp3RL-Sue_48Weeks-00001',
        'wFDHqb7kw-fkCSlH_WnekF07yXWhl1HI_',
        'X3UojU-LnGxSjykj__BsaZtftMR_j3ky5',
        'XLSVaRAW8QqoS6W5_j0QP4VpqpRUbq5Ez',
        'XtK0-ptLqtBtlCFz_transcoded-Ej_YvFp67do0WgIJ-Sue_6Weeks-00001',
        'XyfkXZ0CtS79Euzd_AUzSH8jT4xFyfcYF',
        'y-0FiI_jayct03Du_LtxkH4s7Nriha1gg',
        'ZQKB5g-cLrxkGL8a_transcoded-kd_IwTb56uWFyUbl-Ed_Baseline-00001',
        '0GflLiM-ceMEh-sh_YTyU0bPGcgSPuqVN',
        ],
    assetsjpg = ['gxIltNb-vd5IGox4_quote_background',
        'K_Pafg6h0WPcR-4e_4_cities',
        'ydpfv_Of8E_KNrU3_example-header-image',
        ],
    assetspdf = ['BIoFEreEvYJtO676_LUi5YO0ctCiLxyfK-Full Prescribing Information',
        'x86UqhHAQp0mvO-l_pSQRJWXMj0UNOWMg-INGREZZA-Full-Prescribing-Information',
        ],
    c = [
      '/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/',
      '/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/index.html',
      ...libjs.map(i => '/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/lib/' + i + '.js'),
      ...libcss.map(i => '/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/lib/' + i + '.css'),
      ...libfonts.map(i => '/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/lib/fonts/' + i + '.woff'),
      '/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/assets/custom/jquery-3.6.0.min.js',
      '/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/assets/custom/script.js',
      '/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/assets/custom/style.css',
      '/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/assets/custom/arrow_down.png',
      '/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/assets/custom/chat.svg',
      '/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/assets/custom/check.svg',
      '/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/assets/custom/cover_logo.png',
      '/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/assets/custom/down-arrow.svg',
      '/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/assets/custom/ingrezza-valbenazine-logo-n.svg',
      '/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/assets/custom/logo-modal.png',
      '/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/assets/custom/open-book.svg',
      ...assetsvideo.map(i => '/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/assets/' + i + '.mp4'),
      ...assetssvg.map(i => '/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/assets/' + i + '.svg'),
      ...assetspng.map(i => '/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/assets/' + i + '.png'),
      ...assetsjpg.map(i => '/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/assets/' + i + '.jpg'),
      ...assetspdf.map(i => '/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/assets/' + i + '.pdf'),
      '/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/pwabuilder-sw.js',
      '/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/manifest.json',
      '/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/152.png',
      '/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/144.png',
      '/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/64.png',
      '/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/32.png',
      '/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/android-launchericon-512-512.png'
      ];

    console.log('ServiceWorker: Caching files:', c.length, c);
    
    try {
      ok = await cache.addAll(c);
    } catch (err) {
      console.error('sw: cache.addAll');
      for await (let i of c) {
        try {
          ok = await cache.add(i);
        } catch (err) {
          console.warn('sw: cache.add',i);
        }
      }
    }

    return ok;
  }));

  console.log('ServiceWorker installed');
});



if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

workbox.routing.registerRoute(
  new RegExp('/(.*)\.(?:png|gif|jpg|svg|mp4|pdf)(.*)/'),
  new workbox.strategies.CacheFirst({
      cacheName: CACHE,
  })
);

workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);

// self.addEventListener('fetch', (event) => {
//   if (event.request.mode === 'navigate') {
//     event.respondWith((async () => {
//       try {
//         const preloadResp = await event.preloadResponse;

//         if (preloadResp) {
//           return preloadResp;
//         }

//         const networkResp = await fetch(event.request);
//         return networkResp;
//       } catch (error) {

//         const cache = await caches.open(CACHE);
//         const cachedResp = await cache.match(offlineFallbackPage);
//         return cachedResp;
//       }
//     })());
//   }
// });


// self.addEventListener('install', async (event) => {
//   event.waitUntil(
//     caches.open(CACHE)
//       .then((cache) => cache.add(offlineFallbackPage))
//   );
// });

self.addEventListener("fetch", event => {
  if (event.request.url === "https://asimut.github.io/Considerations-for-the-Treatment-of-Tardive-Dyskinesia-TD-/") {
      // or whatever your app's URL is
      event.respondWith(
          fetch(event.request).catch(err =>
              self.cache.open(CACHE).then(cache => cache.match(offlineFallbackPage))
          )
      );
  } else {
      event.respondWith(
          fetch(event.request).catch(err =>
              caches.match(event.request).then(response => response)
          )
      );
  }
});

function fromCache(request){
  return caches.open(CACHE).then(function(cache){
    if(!matching || matching.status === 404){
      return Promise.reject("no-match");
    }

    return matching;
  })
}

function updareChache(request, response){
  return caches.open(CACHE).then(function(cache){
    return cache.put(request, response);
  })
}