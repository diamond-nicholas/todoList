import CreateTask from '../src/task';

describe('test for constructor', () => {
  const task = new CreateTask('write code', 'java', 1 - 20 - 2929, 'high');
  it('confirms Task constructor', () => {
    expect(task).toBeDefined();
  });
  it('confirms topic of task', () => {
    expect(task.title).toBe('write code');
  });
  it('negative test for the task topic', () => {
    expect(task.title).not.toBe('project');
  });
  it('confirms the description of the task', () => {
    expect(task.desc).toBe('java');
  });
  it('negative test for the task desc', () => {
    expect(task.desc).not.toBe('housing');
  });
  it('confirms the date of task', () => {
    expect(task.date).toBe(1 - 20 - 2929);
  });
  it('negative test for the task dueDate', () => {
    expect(task.date).not.toBe(1 - 20 - 2029);
  });
  it('confirms the priority of the task', () => {
    expect(task.priority).toBe('high');
  });
  it('negative test for the the task priority', () => {
    expect(task.priority).not.toBe('solo');
  });
});
