import * as z from 'zod';

export const transactionFormSchema = z.object({
    transaction: z.string({ message: 'Transaction description is required' })
        .min(2, { message: 'Description must contain at least 2 character(s)' })
        .max(150),
    type: z.enum(['income', 'expense'], { message: 'Type is required' }),
    category: z.string({ message: 'Category is required' })
        .min(2, { message: 'Category must contain at least 2 character(s)' })
        .max(30),
    transactionAt: z.string({ message: 'Transaction Date is required'})
        .refine((val) => !isNaN(Date.parse(val)), {
            message: "Invalid date format",
        }),
    amount: z
        .string({ message: 'Amount is required' })
        .min(1, 'Amount must contain at least 1 character(s)'),
});

export type TransactionFormType = z.infer<typeof transactionFormSchema>;