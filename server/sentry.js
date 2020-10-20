const Sentry = require('@sentry/node');

const sentry = (transactionName) => {
  Sentry.init({
    dsn:
      'https://c7cee0ec9cb748bea32aa955655989e8@o452292.ingest.sentry.io/5439448',
    tracesSampleRate: 1.0,
  });

  const transaction = Sentry.startTransaction({
    name: transactionName,
  });

  return {
    Sentry,
    transaction,
  };
};

module.exports = sentry;
