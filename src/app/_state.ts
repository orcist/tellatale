import { OpaqueToken } from '@angular/core'

import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import 'rxjs/add/Observable/zip'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/scan'

import * as Spotify from './spotify/state'

type Action = (
  Spotify.Action
)

export class AppState {
  spotify: Spotify.AppState

  constructor() {}
}

export const initState = new OpaqueToken('initState')
export const dispatcher = new OpaqueToken('dispatcher')
export const state = new OpaqueToken('state')

const stateFn = (initState: AppState, actions: Observable<Action>): Observable<AppState> => {
  const combine = s => ({
    spotify: s[0],
  })
  const appStateObs: Observable<AppState> = Observable.zip(
      Spotify.observe(initState.spotify, actions)
    ).map(combine)

  const res = new BehaviorSubject(initState)
  appStateObs.subscribe(s => res.next(s))
  return res
}

export const stateAndDispatcher = [
  {
    provide: initState,
    useValue: {
      spotify: Spotify.initState,
    },
  },
  {
    provide: dispatcher,
    useValue: new Subject<Action>()
  },
  {
    provide: state,
    useFactory: stateFn,
    deps: [ initState, dispatcher ]
  }
]
