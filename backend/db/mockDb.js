// Mock in-memory database for development/testing

class MockDatabase {
  constructor() {
    this.tasks = [];
    this.idCounter = 1;
    console.log('📦 Mock Database initialized');
  }

  async findAll() {
    return this.tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  async findById(id) {
    return this.tasks.find(t => t._id.toString() === id.toString());
  }

  async create(data) {
    const task = {
      _id: this.idCounter++,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.tasks.push(task);
    return task;
  }

  async updateById(id, data) {
    const task = this.tasks.find(t => t._id.toString() === id.toString());
    if (!task) return null;
    
    Object.assign(task, data, { updatedAt: new Date() });
    return task;
  }

  async deleteById(id) {
    const index = this.tasks.findIndex(t => t._id.toString() === id.toString());
    if (index === -1) return null;
    
    const deleted = this.tasks.splice(index, 1);
    return deleted[0];
  }
}

module.exports = new MockDatabase();
