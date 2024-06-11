'use server';

import { db } from '@/lib/db';
import {
    FormAppointmentState,
    FormCreateState,
    FormPatientState,
    FormProfileState,
    appointmentSchema,
    doctorEditSchema,
    doctorSchema,
    patientSchema,
    profileSchema,
} from '@/lib/definitions';
import bcriptsjs from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const createDoctor = async (state: FormCreateState, formData: FormData) => {
    const validatedFields = doctorSchema.safeParse({
        image: formData.get('image'),
        email: formData.get('email'),
        password: formData.get('password'),
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        date_of_birth: formData.get('date_of_birth'),
        gender: formData.get('gender'),
        join_date: formData.get('join_date'),
        department_id: formData.get('department_id'),
        role: formData.get('role'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { email, password, image, first_name, last_name, date_of_birth, gender, join_date, department_id, role } =
        validatedFields.data;

    const hashedPassword = await bcriptsjs.hash(password, 10);

    const isDuplicated = await db.user.findUnique({
        where: {
            email,
        },
    });

    if (isDuplicated) {
        return {
            message: 'Tài khoản đã tồn tại',
        };
    }

    const data = await db.user.create({
        data: {
            image,
            email,
            password: hashedPassword,
            first_name,
            last_name,
            gender,
            date_of_birth: new Date(date_of_birth),
            join_date: new Date(join_date),
            role,
            department: {
                connect: {
                    id: department_id,
                },
            },
        },
    });

    const user = data;

    if (!user) {
        return { message: 'Đã xảy ra lỗi khi tạo tài khoản.' };
    }

    revalidatePath('/doctors');
    redirect('/doctors');
};

export const createStaff = async (state: FormCreateState, formData: FormData) => {
    const validatedFields = doctorSchema.safeParse({
        image: formData.get('image'),
        email: formData.get('email'),
        password: formData.get('password'),
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        date_of_birth: formData.get('date_of_birth'),
        gender: formData.get('gender'),
        join_date: formData.get('join_date'),
        department_id: formData.get('department_id'),
        role: formData.get('role'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { email, password, image, first_name, last_name, date_of_birth, gender, join_date, department_id, role } =
        validatedFields.data;

    const hashedPassword = await bcriptsjs.hash(password, 10);

    const isDuplicated = await db.user.findUnique({
        where: {
            email,
        },
    });

    if (isDuplicated) {
        return {
            message: 'Tài khoản đã tồn tại',
        };
    }

    const data = await db.user.create({
        data: {
            image,
            email,
            password: hashedPassword,
            first_name,
            last_name,
            gender,
            date_of_birth: new Date(date_of_birth),
            join_date: new Date(join_date),
            role,
            department: {
                connect: {
                    id: department_id,
                },
            },
        },
    });

    const user = data;

    if (!user) {
        return { message: 'Đã xảy ra lỗi khi tạo tài khoản.' };
    }

    revalidatePath('/staffs');
    redirect('/staffs');
};

export const editStaff = async (formState: FormCreateState, formData: FormData) => {
    const user_id = formData.get('user_id');

    const validatedFields = doctorEditSchema.safeParse({
        userId: user_id,
        image: formData.get('image'),
        email: formData.get('email'),
        new_password: formData.get('new_password'),
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        date_of_birth: formData.get('date_of_birth'),
        gender: formData.get('gender'),
        join_date: formData.get('join_date'),
        department_id: formData.get('department_id'),
        role: formData.get('role'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { email, image, first_name, last_name, new_password, date_of_birth, gender, join_date, department_id, role } =
        validatedFields.data;

    const hashedPassword = await bcriptsjs.hash(new_password, 10);

    const data = await db.user.update({
        where: {
            id: user_id?.toString(),
        },
        data: {
            image,
            email,
            password: new_password ? hashedPassword : undefined,
            first_name,
            last_name,
            gender,
            date_of_birth: new Date(date_of_birth),
            join_date: new Date(join_date),
            role,
            department: {
                connect: {
                    id: department_id,
                },
            },
        },
    });

    const user = data;

    if (!user) {
        return { message: 'Đã xảy ra lỗi khi tạo tài khoản.' };
    }

    revalidatePath(`/staffs/${user_id}`);
    redirect('/staffs');
};

export const editDoctor = async (formState: FormCreateState, formData: FormData) => {
    const user_id = formData.get('user_id');

    const validatedFields = doctorEditSchema.safeParse({
        userId: user_id,
        image: formData.get('image'),
        email: formData.get('email'),
        new_password: formData.get('new_password'),
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        date_of_birth: formData.get('date_of_birth'),
        gender: formData.get('gender'),
        join_date: formData.get('join_date'),
        department_id: formData.get('department_id'),
        role: formData.get('role'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { email, new_password, image, first_name, last_name, date_of_birth, gender, join_date, department_id, role } =
        validatedFields.data;

    const hashedPassword = await bcriptsjs.hash(new_password, 10);

    const data = await db.user.update({
        where: {
            id: user_id?.toString(),
        },
        data: {
            image,
            email,
            password: new_password ? hashedPassword : undefined,
            first_name,
            last_name,
            gender,
            date_of_birth: new Date(date_of_birth),
            join_date: new Date(join_date),
            role,
            department: {
                connect: {
                    id: department_id,
                },
            },
        },
    });

    const user = data;

    if (!user) {
        return { message: 'Đã xảy ra lỗi khi tạo tài khoản.' };
    }

    revalidatePath(`/doctors/${user_id}`);
    redirect('/doctors');
};

export const createAppointment = async (formState: FormAppointmentState, formData: FormData) => {
    const validatedFields = appointmentSchema.safeParse({
        doctor_id: formData.get('doctor_id'),
        patient_id: formData.get('patient_id'),
        note: formData.get('note'),
        appointment_time: formData.get('appointment_time'),
        appointment_date: formData.get('appointment_date'),
        appointment_department: formData.get('appointment_department'),
        appointment_room: formData.get('appointment_room'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const random_number = Math.floor(Math.random() * 10 ** 15).toString();

    const {
        doctor_id,
        patient_id,
        note,
        appointment_time,
        appointment_date,
        appointment_department,
        appointment_room,
    } = validatedFields.data;

    const data = await db.appointment.create({
        data: {
            doctor: {
                connect: {
                    id: doctor_id,
                },
            },
            patient: {
                connect: {
                    id: patient_id,
                },
            },
            note,
            appointment_time,
            appointment_date: new Date(appointment_date),
            appointment_room,
            appointment_department,
            appointment_number: random_number,
        },
    });

    const appointment = data;

    if (!appointment) {
        return { message: 'Đã xảy ra lỗi khi tạo đơn.' };
    }

    revalidatePath('/appointments/new');
    redirect('/appointments');
};

export const editAppointment = async (formState: FormAppointmentState, formData: FormData) => {
    const appointment_id = formData.get('appointment_id');

    const validatedFields = appointmentSchema.safeParse({
        appointment_id: appointment_id,
        doctor_id: formData.get('doctor_id'),
        patient_id: formData.get('patient_id'),
        note: formData.get('note'),
        appointment_time: formData.get('appointment_time'),
        appointment_date: formData.get('appointment_date'),
        appointment_department: formData.get('appointment_department'),
        appointment_room: formData.get('appointment_room'),
    });

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }

    const {
        doctor_id,
        patient_id,
        note,
        appointment_time,
        appointment_date,
        appointment_department,
        appointment_room,
    } = validatedFields.data;

    const data = await db.appointment.update({
        where: {
            id: appointment_id?.toString(),
        },
        data: {
            doctor: {
                connect: {
                    id: doctor_id,
                },
            },
            patient: {
                connect: {
                    id: patient_id,
                },
            },
            note,
            appointment_time,
            appointment_date: new Date(appointment_date),
            appointment_department,
            appointment_room,
        },
    });

    const appointment = data;

    if (!appointment) {
        return { message: 'Đã xảy ra lỗi khi tạo đơn.' };
    }

    revalidatePath(`/appointments/${appointment_id}`);
    redirect('/appointments');
};

export const createPatient = async (formState: FormPatientState, formData: FormData) => {
    const validatedFields = patientSchema.safeParse({
        name: formData.get('name'),
        date_of_birth: formData.get('date_of_birth'),
        card_id: formData.get('card_id'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        health_condition: formData.get('health_condition'),
        disease: formData.get('disease'),
        health_insurance_card: formData.get('health_insurance_card'),
    });

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }

    const { name, date_of_birth, card_id, phone, address, health_condition, disease, health_insurance_card } =
        validatedFields.data;

    const data = await db.patient.create({
        data: {
            name,
            date_of_birth: new Date(date_of_birth),
            card_id,
            phone,
            address,
            health_condition,
            disease,
            health_insurance_card,
        },
    });

    const patient = data;

    if (!patient) {
        return {
            message: 'Đã xảy ra lỗi khi thêm bệnh nhân',
        };
    }

    revalidatePath('/patients/new');
    redirect('/patients');
};

export const editPatient = async (formState: FormPatientState, formData: FormData) => {
    const patient_id = formData.get('patient_id');

    const validatedFields = patientSchema.safeParse({
        patient_id: patient_id,
        name: formData.get('name'),
        date_of_birth: formData.get('date_of_birth'),
        card_id: formData.get('card_id'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        health_condition: formData.get('health_condition'),
        disease: formData.get('disease'),
        health_insurance_card: formData.get('health_insurance_card'),
    });

    if (!validatedFields.success) {
        return { errors: validatedFields.error.flatten().fieldErrors };
    }

    const { name, date_of_birth, card_id, phone, address, health_condition, disease, health_insurance_card } =
        validatedFields.data;

    const data = await db.patient.update({
        where: {
            id: patient_id?.toString(),
        },
        data: {
            name,
            date_of_birth: new Date(date_of_birth),
            card_id,
            phone,
            address,
            health_condition,
            disease,
            health_insurance_card,
        },
    });

    const patient = data;

    if (!patient) {
        return {
            message: 'Đã xảy ra lỗi khi thêm bệnh nhân',
        };
    }

    revalidatePath(`/patients/${patient_id}`);
    redirect('/patients');
};

export const editProfile = async (formState: FormProfileState, formData: FormData) => {
    const profile_id = formData.get('profile_id');

    const validatedFields = profileSchema.safeParse({
        profile_id: profile_id,
        image: formData.get('image'),
        email: formData.get('email'),
        new_password: formData.get('new_password'),
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        date_of_birth: formData.get('date_of_birth'),
        gender: formData.get('gender'),
        phone: formData.get('phone'),
        address: formData.get('address'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { email, image, new_password, first_name, last_name, date_of_birth, gender, phone, address } =
        validatedFields.data;

    const hashedPassword = await bcriptsjs.hash(new_password, 10);

    const data = await db.user.update({
        where: {
            id: profile_id?.toString()!,
        },
        data: {
            image,
            email,
            password: new_password ? hashedPassword : undefined,
            first_name,
            last_name,
            date_of_birth: new Date(date_of_birth),
            gender,
            phone,
            address,
        },
    });

    const profile = data;

    if (!profile) {
        return {
            message: 'Đã xảy ra lỗi',
        };
    }

    revalidatePath(`/profile/${profile_id}`);

    return {
        message: 'Thay đổi thành công',
    };
};
