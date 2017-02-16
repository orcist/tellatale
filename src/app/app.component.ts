import {
  Component, Inject
} from '@angular/core'

import { Observable } from 'rxjs'
import { stateAndDispatcher } from './_state'

@Component({
  selector: 'app-root',
  template: `
    <h1>
      {{title}}
    </h1>
    <a-spotify></a-spotify>
  `,
  providers: stateAndDispatcher,
})

export class AppComponent {
  title = 'app works!'
}
