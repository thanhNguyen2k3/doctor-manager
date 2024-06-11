import { z } from 'zod';

export const signupSchema = z.object({
    first_name: z.string().min(1, { message: 'Ít nhất 1 kí tự' }).trim(),
    last_name: z.string().min(3, { message: 'Ít nhất 3 kí tự' }).trim(),
    email: z.string().email({ message: 'Email không đúng định dạng' }).trim(),
    password: z.string().min(6, { message: 'Tối thiểu 6 kí tự' }).trim(),
});

export const doctorSchema = z.object({
    email: z.string().email({ message: 'Email không đúng định dạng' }).trim(),
    password: z.string().min(6, { message: 'Tối thiểu 6 kí tự' }).trim(),
    first_name: z.string().min(1, { message: 'Vui lòng nhập dữ liệu' }).trim(),
    last_name: z.string().min(1, { message: 'Vui lòng nhập dữ liệu' }).trim(),
    date_of_birth: z.string().min(1, { message: 'Vui lòng nhập ngày tháng năm sinh' }).trim(),
    join_date: z.string().min(1, { message: 'Vui lòng nhập dữ liệu' }).trim(),
    gender: z.string().min(1, { message: 'Vui lòng chọn giới tính' }).trim(),
    department_id: z.string().min(1, { message: 'Vui lòng chọn khoa' }).trim(),
    role: z.string().min(1, { message: 'Vui lòng chọn chức vụ' }).trim(),
    image: z.string(),
});

export const doctorEditSchema = z.object({
    email: z.string().email({ message: 'Email không đúng định dạng' }).trim(),
    new_password: z.string().trim(),
    first_name: z.string().min(1, { message: 'Vui lòng nhập dữ liệu' }).trim(),
    last_name: z.string().min(1, { message: 'Vui lòng nhập dữ liệu' }).trim(),
    date_of_birth: z.string().min(1, { message: 'Vui lòng nhập ngày tháng năm sinh' }).trim(),
    join_date: z.string().min(1, { message: 'Vui lòng nhập dữ liệu' }).trim(),
    gender: z.string().min(1, { message: 'Vui lòng chọn giới tính' }).trim(),
    department_id: z.string().min(1, { message: 'Vui lòng chọn khoa' }).trim(),
    role: z.string().min(1, { message: 'Vui lòng chọn chức vụ' }).trim(),
    image: z.string(),
});

export const appointmentSchema = z.object({
    doctor_id: z.string().min(1, { message: 'Vui lòng lựa chọn bác sĩ' }).trim(),
    patient_id: z.string().min(1, { message: 'Vui lòng lựa chọn bệnh nhân' }).trim(),
    note: z.string().min(1, { message: 'Bạn có gì muốn nhắn nhủ với bác sĩ không ?' }).trim(),
    appointment_time: z.string().min(1, { message: 'Vui lòng ghi rõ thời gian' }).trim(),
    appointment_date: z.string().min(1, { message: 'Vui lòng ghi rõ ngày tháng' }).trim(),
    appointment_department: z.string().min(1, { message: 'Ghi rõ khoa' }).trim(),
    appointment_room: z.string().trim(),
});

export const patientSchema = z.object({
    name: z.string().min(3, { message: 'Vui lòng nhập đầy đủ thông tin' }).trim(),
    date_of_birth: z.string().min(1, { message: 'Vui lòng nhập đầy đủ thông tin' }).trim(),
    card_id: z.string().min(10, { message: 'Vui lòng nhập đầy đủ thông tin' }).trim(),
    phone: z.string().min(10, { message: 'Số điện thoại có vẻ không hợp lệ' }).trim(),
    address: z.string().min(6, { message: 'Vui lòng nhập đầy đủ thông tin' }).trim(),
    health_condition: z.string().min(3, { message: 'Vui lòng ghi rõ tình trạng sức khỏe' }).trim(),
    disease: z.string().min(3, { message: 'Vui lòng ghi rõ bệnh tình' }).trim(),
    health_insurance_card: z.string().min(6, { message: 'Vui lòng nhập rõ số thẻ bảo hiểm y tế' }).trim(),
});

export const profileSchema = z.object({
    email: z.string().email({ message: 'Email không đúng định dạng' }).trim(),
    new_password: z.string().trim(),
    first_name: z.string().min(1, { message: 'Vui lòng nhập dữ liệu' }).trim(),
    last_name: z.string().min(1, { message: 'Vui lòng nhập dữ liệu' }).trim(),
    date_of_birth: z.string().min(1, { message: 'Vui lòng nhập ngày tháng năm sinh' }).trim(),
    gender: z.string().min(1, { message: 'Vui lòng chọn giới tính' }).trim(),
    image: z.string(),
    phone: z
        .string()
        .min(10, { message: 'Số điện thoại không hợp lệ' })
        .max(12, { message: 'Số điện thoại không hợp lệ' })
        .trim(),
    address: z.string().min(1, { message: 'Vui lòng ghi rõ địa chỉ' }).trim(),
});

export type FormState =
    | {
          errors?: {
              first_name?: string[];
              last_name?: string[];
              email?: string[];
              password?: string[];
          };
      }
    | undefined;

export type FormCreateState =
    | {
          errors?: {
              email?: string[];
              password?: string[];
              first_name?: string[];
              last_name?: string[];
              date_of_birth?: string[];
              gender?: string[];
              join_date?: string[];
              department_id?: string[];
              role?: string[];
          };
      }
    | undefined;

export type FormAppointmentState =
    | {
          errors?: {
              doctor_id?: string[];
              patient_id?: string[];
              note?: string[];
              appointment_time?: string[];
              appointment_date?: string[];
              appointment_department?: string[];
          };
      }
    | undefined;

export type FormPatientState =
    | {
          errors?: {
              name?: string[];
              date_of_birth?: string[];
              card_id?: string[];
              phone?: string[];
              address?: string[];
              health_condition?: string[];
              disease?: string[];
              health_insurance_card?: string[];
          };
      }
    | undefined;

export type FormProfileState =
    | {
          errors?: {
              email?: string[];
              password?: string[];
              first_name?: string[];
              last_name?: string[];
              date_of_birth?: string[];
              gender?: string[];
              phone?: string[];
              address?: string[];
          };
      }
    | undefined;
