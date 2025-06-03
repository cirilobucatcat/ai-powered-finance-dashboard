import * as z from 'zod';

export const transactionFormSchema = z.object({
    transaction: z.string({ message: 'Transaction description is required' })
        .min(2, { message: 'Description must contain at least 2 character(s)' })
        .max(150),
    type: z.enum(['income', 'expense'], { message: 'Type is required' }),
    category: z.string({ message: 'Category is required' })
        .min(2, { message: 'Category must contain at least 2 character(s)' })
        .max(30),
    transactionAt: z.string({ message: 'Transaction Date is required' })
        .refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date format",
        }),
    amount: z
        .string({ message: 'Amount is required' })
        .min(1, 'Amount must contain at least 1 character(s)'),
});

export type TransactionFormType = z.infer<typeof transactionFormSchema>;

export const profileSettingSchema = z.object({
    displayName: z.string({ message: 'Full Name is required.' }),
    email: z.string().email({ message: 'Valid email is required' }),
    currentPassword: z.string().optional().refine((val) => val === undefined || val === "" || val.length >= 6, {
        message: "Password must be at least 6 characters",
    }),
    password: z.string().optional().refine((val) => val === undefined || val === "" || val.length >= 6, {
        message: "Password must be at least 6 characters",
    }),
    confirmPassword: z.string().optional(),
}).refine((data) => !data.password || data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type ProfileSettingFormType = z.infer<typeof profileSettingSchema>;