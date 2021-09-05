import Createlist from '../src/list';

describe('test for constructor', () => {
  const task = new Createlist('write code');
  it('confirms Task constructor', () => {
    expect(task).toBeDefined();
  });
  it('confirms createTask constructor', () => {
    expect(task.topic).toBe('write code');
  });
  it('tests for wrong project name', () => {
    expect(task.topic).not.toBe('Project');
  });
  it('tests typeOf topic', () => {
    expect(typeof task.topic).toBe('string');
  });
  it('tests typeOf project', () => {
    expect(typeof task).toBe('object');
  });
});
