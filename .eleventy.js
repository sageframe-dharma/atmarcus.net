module.exports = function (eleventyConfig) {
  // Pass through all non-template files unchanged
  // (public/work/*.html files contain JSX-style {{ syntax that would break the template parser)
  eleventyConfig.addPassthroughCopy('public/img');
  eleventyConfig.addPassthroughCopy('public/work');
  eleventyConfig.addPassthroughCopy('public/hero');
  eleventyConfig.addPassthroughCopy('public/favicon.svg');
  eleventyConfig.addPassthroughCopy('public/_headers');
  eleventyConfig.addPassthroughCopy('public/add-card.txt');

  return {
    // Only treat .njk files as templates — .html files are never parsed
    templateFormats: ['njk'],
    dir: {
      input: 'public',
      output: '_site',
      // _data/ lives at project root, one level up from input
      data: '../_data',
    },
  };
};
