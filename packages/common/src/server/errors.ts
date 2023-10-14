export const makeCustomError = (name: string, formatter?: (message: string) => string) => {
  const definition = class extends Error {
    constructor(message: string) {
      const formattedMessage = formatter ? formatter(message) : message;
      super(formattedMessage);
      this.name = name;
    }
  };
  Object.defineProperty(definition, 'name', { value: name });
  return definition;
};

export const FileNotFound = makeCustomError(
  'FileNotFound',
  (path: string) => `No such file "${path}"`,
);
