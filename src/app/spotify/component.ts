import {
  Component, Inject
} from '@angular/core'

import { Observable } from 'rxjs/Observable'
import { Observer } from 'rxjs/Observer'

import {
  AppState, stateAndDispatcher, state, dispatcher,
} from '../_state'
import {
  Action, ConnectAccount,
} from './state'

@Component({
  selector: 'a-spotify',
  template: `
    <a (click)="connectAccount(test1)">{{test1 | json}}</a>
    <a (click)="connectAccount(test2)">{{test2 | json}}</a>
    <div>State: {{connectionState | async}}</div>
    <div>Client: {{client | async | json}}</div>
  `
})

export default class Spotify {
  test1 = {'A': 1}
  test2 = {'B': 2}

  constructor(
    @Inject(state) private state: Observable<AppState>,
    @Inject(dispatcher) private dispatcher: Observer<Action>
  ) {}

  get connectionState() {
    return this.state.map(s => s.spotify.state)
  }

  get client() {
    return this.state.map(s => s.spotify.client)
  }

  connectAccount = (client: Object) => {
    const action: ConnectAccount = new ConnectAccount(client)
    this.dispatcher.next(action)
  }
}
