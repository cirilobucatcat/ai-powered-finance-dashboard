import * as z from "zod";
export const transactionFormSchema = z.object({
    transaction: z.string({ message: "Transaction description is required" })
        .min(2, { message: 'Transaction description must contain at least 2 character(s)' })
        .max(150),
    type: z.enum(['income', 'expense'], { message: 'Type is required' }),
    amount: z
        .string({ message: "Amount is required" })
        .min(1, "Amount must contain at least 1 character(s)"),
});

export type TransactionFormType = z.infer<typeof transactionFormSchema>;