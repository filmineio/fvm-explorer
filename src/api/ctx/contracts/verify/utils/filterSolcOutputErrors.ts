export const filterSolcOutputErrors = (output: any, severity: string): any[] =>
  output?.errors ? output.errors.filter((error: any) => error.severity === severity) : [];
