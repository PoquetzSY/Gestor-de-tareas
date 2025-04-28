import ApiService from './ApiService'

export default class TaskService {
  static async getTasks() {
    return ApiService.get(`/tasks`)
  }

  static async getTaskByUser(taskId) {
    return ApiService.get(`/tasks/${taskId}`)
  }

  static async createTask(taskData) {
    return ApiService.post(`/tasks/create`, taskData)
  }

  static async updateTask(taskId, taskData) {
    return ApiService.put(`/tasks/update/${taskId}`, taskData)
  }

  static async deleteTask(taskId) {
    return ApiService.delete(`/tasks/delete/${taskId}`)
  }

  static async changeTaskStatus(taskId, status) {
    return ApiService.put(`/tasks/change-task-status/${taskId}`, { status_id: status })
  }
  
}
