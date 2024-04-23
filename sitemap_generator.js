const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');

// Create a sitemap stream
const sitemapStream = new SitemapStream({ hostname: 'https://www.yeefm.com' });

// Define your static URLs

let links = [
    { url: '/', changefreq: 'monthly', priority: 0.3 },
    { url: '/search', changefreq: 'monthly', priority: 1.0 },
    { url: '/home', changefreq: 'monthly', priority: 1.0 },
    { url: '/ebooks', changefreq: 'monthly', priority: 1.0 },
    { url: '/audiobooks', changefreq: 'monthly', priority: 1.0 },
    { url: '/chapters', changefreq: 'monthly', priority: 0.5 },
    { url: '/audiochapters', changefreq: 'monthly', priority: 0.5 },
    { url: '/Signup', changefreq: 'monthly', priority: 1.0 },
    { url: '/Signin', changefreq: 'monthly', priority: 0.7 },
    { url: '/login', changefreq: 'monthly', priority: 0.7 },
    { url: '/Audio', changefreq: 'monthly', priority: 0.5 },
    { url: '/AudioChapter', changefreq: 'monthly', priority: 0.5 },
    { url: '/Support', changefreq: 'monthly', priority: 0.3 },
    { url: '/Permium', changefreq: 'monthly', priority: 0.7 },
  ];

// Write each URL to the sitemap
links.forEach(link => {
  sitemapStream.write(link);
});

// End the sitemap stream
sitemapStream.end();

// Write the sitemap to a file
streamToPromise(sitemapStream)
  .then(buffer => {
    const fileStream = createWriteStream('./sitemap.xml');
    fileStream.end(buffer);
    console.log('Sitemap has been written.');
  })
  .catch(err => {
    console.error('Error writing sitemap:', err);
  });