const Parser = require('rss-parser');

module.exports = async function () {
  const parser = new Parser();
  const feed = await parser.parseURL('https://sageframe.substack.com/feed');

  return feed.items.slice(0, 6).map(item => {
    const date = new Date(item.pubDate);
    const formatted = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);

    const snippet = (item.contentSnippet || item.description || '').trim();
    const description =
      snippet.length > 160
        ? snippet.slice(0, 160).replace(/\s+\S*$/, '') + '\u2026'
        : snippet;

    return {
      title: item.title,
      url: item.link,
      date: formatted,
      description,
    };
  });
};
