import type { GraphQLFormattedError } from 'graphql';

export function formatError(formattedError: GraphQLFormattedError): GraphQLFormattedError {
  formattedError.extensions;
  if (formattedError.extensions) {
    const extensions = formattedError.extensions;
    if ('stacktrace' in extensions) {
      delete formattedError.extensions.stacktrace;
    }
  }

  return formattedError;
}
