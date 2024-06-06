'use server';

import { writeFile } from 'fs/promises';
import { revalidatePath } from 'next/cache';

import { z } from 'zod';

type FormState =
    | {
          errors?: {
              image?: string[];
          };
      }
    | undefined;

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const uploadSchema = z.object({
    image: z
        .any()
        .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
        .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), 'Chỉ hỗ trợ .jpg, .jpeg, .png and .webp.'),
});

export const uploadFile = async (state: FormState, formData: FormData) => {
    const file = formData.get('image') as File;

    const validateFields = uploadSchema.safeParse({
        image: formData.get('image'),
    });

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
        };
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const path = `./public/uploads/${file.name}`;

    await writeFile(path, buffer);

    revalidatePath('/');

    return {
        message: 'Upload file thành công',
        url: `${file.name}`,
    };
};
