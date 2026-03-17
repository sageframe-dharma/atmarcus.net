const Parser = require('rss-parser');

module.exports = async function() {
  const parser = new Parser({
    customFields: {
      item: [['enclosure', 'enclosure', { keepArray: false }]]
    }
  });
  const feed = await parser.parseURL('https://sageframe.substack.com/feed');

  return feed.items
    .slice(0, 6)
    .map(item => ({
      title: item.title,
      url: item.link,
      date: new Date(item.pubDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      description: item.contentSnippet || item.description || '',
      image: item.enclosure?.url || ''
    }));
};
