import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(true);
SQLite.enablePromise(true);

export default class Database {
  initDB() {
    let db;
    return new Promise(resolve => {
      console.log('Plugin integrity check ...');
      SQLite.echoTest()
        .then(() => {
          console.log('Integrity check passed ...');
          console.log('Opening database');
          SQLite.openDatabase({
            name: 'Quote.db',
            createFromLocation: 1,
            location: 'default',
          })
            .then(DB => {
              db = DB;
              console.log('Database open');
              db.transaction(tx => {
                tx.executeSql(
                  'CREATE TABLE IF NOT EXISTS Quote (quoteId INTEGER PRIMARY KEY AUTOINCREMENT, quoteText, quoteType, quoteSource)',
                  [],
                );
                resolve(db);
              });
            })
            .catch(error => {
              console.log('Error caught: ', error);
            });
        })
        .catch(error => {
          console.log(
            'echoTest failed - plugin not functional, with error: ',
            error,
          );
        });
    });
  }
  closeDatabase(db) {
    if (db) {
      console.log('Closing database');
      db.close()
        .then(status => {
          console.log('Database CLOSED: ', status);
        })
        .catch(error => {
          console.log('Error exception: ', error.message);
        });
    } else {
      console.log('Database was not OPENED');
    }
  }
  listQuotes() {
    return new Promise(resolve => {
      const quotes = [];
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql(
              'SELECT q.quoteId, q.quoteText, q.quoteType, q.quoteSource FROM Quote q',
              [],
            ).then(([tx, results]) => {
              console.log('Query completed');
              var len = results.rows.length;
              for (let i = 0; i < len; i++) {
                let row = results.rows.item(i);
                console.log(
                  'Quote ID: ' + row.quoteId + ', Quote: ' + row.quoteText,
                );
                const {quoteId, quoteText, quoteType, quoteSource} = row;
                quotes.push({
                  quoteId,
                  quoteText,
                  quoteType,
                  quoteSource,
                });
              }
              console.log(quotes);
              resolve(quotes);
            });
          })
            .then(() => {
              this.closeDatabase(db);
            })
            .catch(error => {
              console.log('Error: ', error);
            });
        })
        .catch(error => {
          console.log('Error: ', error);
        });
    });
  }
  quoteById(id) {
    return new Promise(resolve => {
      console.log('the logging to end all logging: ' + id);
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('SELECT * FROM Quote WHERE quoteId = ?', [id]).then(
              ([tx, results]) => {
                console.log('I have this row thingy: ' + results.rows.length);
                let row = results.rows.item(0);
                console.log('I have this row thingy: ' + row);
                resolve(row);
              },
            );
          })
            .then(result => {
              this.closeDatabase(db);
            })
            .catch(function (error) {
              console.log('Problem in fetch: ', error.message);
              throw error;
            });
        })
        .catch(error => {
          console.log('Error: ', error.message);
        });
    });
  }
  addQuote(quote) {
    return new Promise(resolve => {
      this.initDB().then(db => {
        db.transaction(tx => {
          tx.executeSql('INSERT INTO Quote VALUES (NULL, ?, ?, ?)', [
            quote.quoteText,
            quote.quoteType,
            quote.quoteSource,
          ]).then(([tx, results]) => {
            resolve(results);
          });
        })
          .then(() => {
            this.closeDatabase(db);
          })
          .catch(error => {
            console.log('Error: ', error);
          });
      });
    });
  }
  updateQuote(id, quote) {
    console.log('id: ' + id);
    console.log('quote text from update: ' + quote.quoteText);
    console.log('quote type from update: ' + quote.quoteType);
    console.log('quote source from update: ' + quote.quoteSource);
    return new Promise(resolve => {
      this.initDB().then(db => {
        db.transaction(tx => {
          tx.executeSql(
            'UPDATE Quote SET quoteText = ?, quoteType = ?, quoteSource = ? WHERE quoteId = ?',
            [quote.quoteText, quote.quoteType, quote.quoteSource, id],
          )
            .then(([tx, results]) => {
              resolve(results);
            })
            .then(() => {
              this.closeDatabase(db);
            })
            .catch(error => {
              console.log('Error: ', error);
            });
        }).catch(error => {
          console.log('Error: ', error);
        });
      });
    });
  }
  deleteQuote(id) {
    return new Promise(resolve => {
      this.initDB()
        .then(db => {
          db.transaction(tx => {
            tx.executeSql('DELETE FROM Quote WHERE quoteId = ?', [id]).then(
              ([tx, results]) => {
                console.log(results);
                resolve(results);
              },
            );
          })
            .then(() => {
              this.closeDatabase();
            })
            .catch(error => {
              console.log('Error: ', error);
            });
        })
        .catch(error => {
          console.log('Error, ', error);
        });
    });
  }
}