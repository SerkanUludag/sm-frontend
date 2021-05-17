import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PayModel } from 'src/app/models/payModel';
import { StudentModel } from 'src/app/models/studentModel';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.css'],
})
export class FeeComponent implements OnInit {
  students: StudentModel[];
  dataLoaded = false;
  filterText: string = '';
  amount: number = 0;

  constructor(
    private studentService: StudentService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.studentService.getAll().subscribe(
      (response) => {
        this.students = response.data;
        this.dataLoaded = true;
      },
      (errorResponse) => {
        this.toastrService.error(errorResponse.error.message, 'Error');
      }
    );
  }

  pay(studentId: number) {
    let payModel = new PayModel();
    payModel.studentId = studentId;
    payModel.amountPaid = this.amount;
    this.studentService.payFee(payModel).subscribe(
      (response) => {
        this.toastrService.success(response.message, 'Success');
        this.ngOnInit();
      },
      (errorResponse) => {
        this.toastrService.error(errorResponse.error.message, 'Error');
      }
    );
  }
}
