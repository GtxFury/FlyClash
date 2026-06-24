const DEFAULT_MAX_OUTPUT_CHARS = 256 * 1024;

function appendBoundedOutput(currentOutput, nextChunk, maxChars = DEFAULT_MAX_OUTPUT_CHARS) {
  if (!Number.isFinite(maxChars) || maxChars <= 0) {
    return '';
  }

  const current = typeof currentOutput === 'string' ? currentOutput : '';
  const next = Buffer.isBuffer(nextChunk) ? nextChunk.toString() : String(nextChunk ?? '');
  const combined = current + next;

  if (combined.length <= maxChars) {
    return combined;
  }

  return combined.slice(-maxChars);
}

module.exports = {
  DEFAULT_MAX_OUTPUT_CHARS,
  appendBoundedOutput,
};
