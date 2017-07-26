
import Main from '../components/Main.html'

export default class App {
  constructor () {
    this.main = new Main({
      target: document.body
    })
  }
}
