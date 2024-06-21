import { Component, EventEmitter, Output } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { GetUnitsService } from '../../services/get-units.service'
import { ILocations } from '../../interfaces/location.interface'
import { FilterUnitsService } from '../../services/filter-units.service'

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss',
})
export class FormsComponent {

  @Output() submitEvent = new EventEmitter();
  
  results: ILocations[] = []
  filteredResults: ILocations[] = []
  formGroup!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private unitService: GetUnitsService,
    private filterUnitsService: FilterUnitsService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true,
    })
    this.unitService.getAllUnits().subscribe(data => {
      this.results = data
      this.filteredResults = data
    })
  }

  onSubmit(): void {
    this.filteredResults = this.filterUnitsService.filter(
      this.results,
      this.formGroup.value.showClosed,
      this.formGroup.value.hour,
    )
    this.unitService.setFilteredUnits(this.filteredResults)

    this.submitEvent.emit()
  }

  onClear(): void {
    this.formGroup.reset()
  }
}
