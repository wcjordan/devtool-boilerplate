function wireConnections(conn1, conn2) {
  function msgHandle1(message) {
    conn2.send(message);
  }
  conn1.listen(msgHandle1);

  function msgHandle2(message) {
    conn1.send(message);
  }
  conn2.listen(msgHandle2);

  function shutdown() {
    conn1.shutdown();
    conn2.shutdown();
  }
  conn1.onDisconnect(shutdown);
  conn2.onDisconnect(shutdown);
}

export default wireConnections;
