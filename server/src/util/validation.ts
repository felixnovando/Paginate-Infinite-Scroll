import { validate } from "class-validator";

export const validateDTO = async (body: any): Promise<string[] | null> => {
  const validation = await validate(body, {
    whitelist: true,
  });

  if (validation.length === 0) return null;

  const errors: string[] = [];
  for (const val of validation) {
    if (val.constraints === undefined) continue;

    for (const constraint of Object.values(val.constraints))
      errors.push(constraint);
  }
  return errors;
};
