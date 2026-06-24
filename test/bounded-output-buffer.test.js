const assert = require('node:assert/strict');
const test = require('node:test');

const {
  DEFAULT_MAX_OUTPUT_CHARS,
  appendBoundedOutput,
} = require('../electron/main-process/bounded-output-buffer');

test('appendBoundedOutput keeps short output unchanged', () => {
  const output = appendBoundedOutput('hello', '\nworld', 32);

  assert.equal(output, 'hello\nworld');
});

test('appendBoundedOutput caps retained output and keeps newest content', () => {
  let output = '';

  output = appendBoundedOutput(output, '12345', 10);
  output = appendBoundedOutput(output, '67890', 10);
  output = appendBoundedOutput(output, 'abcde', 10);

  assert.equal(output, '67890abcde');
  assert.equal(output.length, 10);
});

test('appendBoundedOutput truncates a single large chunk to the configured limit', () => {
  const output = appendBoundedOutput('', 'x'.repeat(DEFAULT_MAX_OUTPUT_CHARS + 5), 16);

  assert.equal(output, 'x'.repeat(16));
});
