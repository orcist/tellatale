import { Observable } from 'rxjs/Observable'

export class AppState {
  state: string
  client: Object
}

export const initState: AppState = {
  state: 'disconnected',
  client: null
}

export type Action = (
  ConnectAccount
)

export class ConnectAccount {
  constructor(
    public client: Object
  ) {}
}

export const observe = (
  (initState: any, actions: Observable<Action>): Observable<any> => actions.scan(
    (state, action) => {
      if (action instanceof ConnectAccount) {
        return {
          state: 'connected',
          client: action.client
        }
      } else {
        return state
      }
    },
    initState
  )
)
