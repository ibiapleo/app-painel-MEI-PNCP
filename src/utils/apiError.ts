type ApiValidationError = {
  loc?: (string | number)[];
  msg?: string;
};

function cleanValidationMessage(msg: string): string {
  return msg
    .replace(/^Value error,\s*/i, '')
    .replace(/^String should have at least \d+ characters?,?\s*/i, '')
    .trim();
}

function formatValidationError(item: ApiValidationError): string | null {
  if (typeof item.msg !== 'string') return null;

  const cleaned = cleanValidationMessage(item.msg);
  return cleaned || null;
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  const detail = (error as { response?: { data?: { detail?: unknown } } })?.response?.data
    ?.detail;

  if (!detail) return fallback;

  if (typeof detail === 'string') return cleanValidationMessage(detail) || fallback;

  if (Array.isArray(detail)) {
    for (const item of detail) {
      if (typeof item === 'string') return cleanValidationMessage(item) || fallback;
      if (item && typeof item === 'object') {
        const message = formatValidationError(item as ApiValidationError);
        if (message) return message;
      }
    }
    return fallback;
  }

  if (typeof detail === 'object' && detail !== null) {
    const message = formatValidationError(detail as ApiValidationError);
    if (message) return message;
  }

  return fallback;
}
