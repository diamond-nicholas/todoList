class CreateTask {
  constructor(title, desc, date, priority) {
    this.title = title;
    this.desc = desc;
    this.date = date;
    this.priority = priority;
    this.id = Date.now().toString();
    this.complete = false;
  }
}

export default CreateTask;