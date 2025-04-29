import ApiService from './ApiService'

export default class UserService {
  static async getUsers() {
    return ApiService.get(`/users`)
  }
}
