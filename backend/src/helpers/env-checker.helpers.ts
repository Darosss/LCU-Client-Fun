import { CustomEnvTypes } from "../types";
const customEnvKeys: (keyof CustomEnvTypes)[] = ["NODE_ENV"];
const expectedTypes: { [K in keyof CustomEnvTypes]: string[] } = {
  NODE_ENV: ["string"]
};
class EnvChecker {
  private errors: string[] = [];
  constructor() {}
  public init() {
    customEnvKeys.forEach((key) => {
      const value = process.env[key];
      const expectedType = expectedTypes[key];

      if (!expectedType?.includes(this.getType(value))) {
        this.errors.push(`${key} must be a ${expectedType}`);
      }
    });

    if (this.errors.length > 0) {
      this.errors.forEach((error) => console.error(error));
      process.exit(1); // Exit the process with an error code
    } else {
      console.log("All environment variables are correctly set.");
    }
  }

  private getType(value: any): string {
    if (value === null || value === undefined) return "undefined";
    if (Array.isArray(value)) return "array";
    if (typeof value === "string" && !isNaN(Number(value))) return "number";
    return typeof value;
  }
}

export { EnvChecker };
export default EnvChecker;
