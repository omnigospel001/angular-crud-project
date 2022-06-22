import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeModel } from 'src/app/Model/employee-model';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  formValues!: FormGroup;

  employeeModel: EmployeeModel = new EmployeeModel();

  employeeData!: any;

  showAddEmployee!: boolean;

  showEditEmployee!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.getAllEmployees();

    this.formValues = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      salary: ['', Validators.required],
    });
  }

  getAllEmployees() {
    this.employeeService.getAllEmployees().subscribe({
      next: (res) => {
        this.employeeData = res;
      },
      error: () => {
        alert('Error occured while fetching data');
      },
    });
  }

  addEmployee() {
    //get the values entered in the form fields and sending
    //them to our model objects for processing
    this.employeeModel.firstName = this.formValues.value.firstName;
    this.employeeModel.lastName = this.formValues.value.lastName;
    this.employeeModel.email = this.formValues.value.email;
    this.employeeModel.mobile = this.formValues.value.mobile;
    this.employeeModel.salary = this.formValues.value.salary;

    // posting data gotten to the database
    this.employeeService.postEmployees(this.employeeModel).subscribe({
      next: () => {
        alert('Employee added successfully');

        // to close the form modal
        const ref = document.getElementById('cancel');
        ref?.click();

        // to reset the form fields
        this.formValues.reset();

        // display all the records
        this.getAllEmployees();
      },
      error: () => {
        alert('Error occured while adding employee');
      },
    });
  }

  editEmployee(employee: any) {
    this.showAddEmployee = false;
    this.showEditEmployee = true;
    
    this.employeeModel.id = employee.id;
    this.formValues.controls['firstName'].setValue(employee.firstName);
    this.formValues.controls['lastName'].setValue(employee.lastName);
    this.formValues.controls['email'].setValue(employee.email);
    this.formValues.controls['mobile'].setValue(employee.mobile);
    this.formValues.controls['salary'].setValue(employee.salary);
  }

  updateEmployee() {
    this.employeeModel.firstName = this.formValues.value.firstName;
    this.employeeModel.lastName = this.formValues.value.lastName;
    this.employeeModel.email = this.formValues.value.email;
    this.employeeModel.mobile = this.formValues.value.mobile;
    this.employeeModel.salary = this.formValues.value.salary;

    this.employeeService
      .updateEmployees(this.employeeModel.id, this.employeeModel)
      .subscribe({
        next: () => {
          alert('Update successful');
          // to close the form modal
          const ref = document.getElementById('cancel');
          ref?.click();

          // to reset the form fields
          this.formValues.reset();

          // display all the records
          this.getAllEmployees();
        },
        error: () => {
          alert('Error while updating');
        },
      });
  }

  deleteEmployee(employee: any) {
    this.employeeService.deleteEmployees(employee.id).subscribe({
      next: () => {
        alert('Employee deleted successfully');
        this.getAllEmployees();
      },
      error: () => {
        alert('Error occured while deleting employee');
      },
    });
  }

  clickAddEmployee() {
    this.formValues.reset();
    this.showAddEmployee = true;
    this.showEditEmployee = false;
  }
}
