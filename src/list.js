class Createlist {
  constructor(topic) {
    this.topic = topic;
    this.id = Date.now().toString();
    this.tasks = [];
  }
}
export default Createlist;