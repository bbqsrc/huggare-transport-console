const Severities = require('huggare').Severities;

function ConsoleTransport(ts, severity, tag, args) {
  /* eslint-disable no-console */
  if (severity > Severities.ASSERT || severity < Severities.VERBOSE) {
    this.wtf('ConsoleTransport', `invalid severity specified: ${severity}; logging as error.`);
    this.e(tag, args);
  }

  const log = console[(severity > Severities.INFO ? 'error' : 'log')];
  const isoDate = ts.toISOString();

  log(`${isoDate} [${Severities[severity].substring(0, 1)}] ${tag}: ${args.message || ''}`);

  if (args.err) {
    log(args.err.stack);
  }
}

module.exports = ConsoleTransport;
