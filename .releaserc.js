module.exports = {
  branches: [{ name: 'main' }],
  plugins: [
    '@semantic-release/commit-analyzer',
    ['@semantic-release/release-notes-generator', { linkReferences: true }],
    '@semantic-release/gitlab',
  ],
};
