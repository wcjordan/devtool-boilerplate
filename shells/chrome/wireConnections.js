'use strict';

const wireConnections = function(conn1, conn2) {
  const msgHandle1 = function(message) {
    conn2.send(message);
  };
  conn1.listen(msgHandle1);

  const msgHandle2 = function(message) {
    conn1.send(message);
  };
  conn2.listen(msgHandle2);

  const shutdown = function() {
    conn1.shutdown();
    conn2.shutdown();
  };
  conn1.onDisconnect(shutdown);
  conn2.onDisconnect(shutdown);
};

export default wireConnections;
