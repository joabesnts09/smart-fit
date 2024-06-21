import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from './components/header/header.component'
import { FormsComponent } from './components/forms/forms.component'
import { BehaviorSubject } from 'rxjs'
import { CardsListComponent } from './components/cards-list/cards-list.component'
import { CommonModule } from '@angular/common'
import { ILocations } from './interfaces/location.interface'
import { GetUnitsService } from './services/get-units.service'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    AppComponent,
    RouterOutlet,
    HeaderComponent,
    FormsComponent,
    CardsListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  
})
export class AppComponent {
  title = 'smartfit'

  unitsList: ILocations[] = []
  showList = new BehaviorSubject(false)

  constructor(private unitsService: GetUnitsService) {}

  onSubmit() {
    this.unitsList = this.unitsService.getFilteredUnits()
    this.showList.next(true)
    
  }
}
