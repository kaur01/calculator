import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Employee} from '../models/Employee';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
})

export class EmployeeAddComponent {

  public employeeFormGroup: any;

  constructor(private httpClient: HttpClient, public formBuilder: FormBuilder) {

    this.employeeFormGroup = formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      dateOfBirth: new FormControl(null, [Validators.required]),
      salary: new FormControl(null, [Validators.required]),
      skill: new FormControl(null, [Validators.required]),
      photo: new FormControl(null, [Validators.required]),
    });
  }

  public async onSubmit(formGroup: FormGroup): Promise<void> {

    if (formGroup.invalid) {
      console.log(`Form is invalid. Not proceeding with submission.`);
      return;
    }
    const dateOfBirth = new Date(formGroup.controls['dateOfBirth'].value);
    const name = formGroup.controls['name'].value;
    const salary = formGroup.controls['salary'].value;
    const skill = formGroup.controls['skill'].value;
    const photo = formGroup.controls['photo'].value;
    const url = `https://localhost:3000/api/employee/`;
    const employee = new Employee(null, name, dateOfBirth, salary, skill, photo);
    await this.httpClient.post<Employee>(url, employee).toPromise();
  }
}

