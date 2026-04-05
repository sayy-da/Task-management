import { Task } from "../entity/task.entity.js";
import { ITaskRepository } from "./interfaces/ITaskRepository.js";

export class TaskRepository extends ITaskRepository {
  async create(data) {
    return await Task.create(data);
  }

  async findAll(filter = {}) {
    return await Task.find(filter).sort({ createdAt: -1 });
  }

  async findById(id) {
    return await Task.findById(id);
  }

  async update(id, data) {
    return await Task.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Task.findByIdAndDelete(id);
  }
}