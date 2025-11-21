import type {
  ApiError,
  AuthSendCodeRequest,
  AuthSendCodeResponse,
  AuthVerifyCodeRequest,
  AuthVerifyCodeSuccess,
  Result,
} from 'common-strategy';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:4000';

type UnknownResult = Result<unknown>;

export async function sendCode(
  payload: AuthSendCodeRequest,
): Promise<Result<AuthSendCodeResponse>> {
  return post<AuthSendCodeResponse>('/auth/send-code', payload);
}

export async function verifyCode(
  payload: AuthVerifyCodeRequest,
): Promise<Result<AuthVerifyCodeSuccess>> {
  return post<AuthVerifyCodeSuccess>('/auth/verify-code', payload);
}

async function post<T>(path: string, body: unknown): Promise<Result<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const parsed = await safelyParseJson(response);

    if (isResult(parsed)) {
      return parsed as Result<T>;
    }

    return {
      ok: false,
      error: buildUnexpectedError(),
    };
  } catch {
    return {
      ok: false,
      error: buildNetworkError(),
    };
  }
}

async function safelyParseJson(response: Response): Promise<unknown | null> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function isResult(candidate: unknown): candidate is UnknownResult {
  if (!candidate || typeof candidate !== 'object') {
    return false;
  }

  if (!('ok' in candidate)) {
    return false;
  }

  return typeof (candidate as { ok: unknown }).ok === 'boolean';
}

function buildUnexpectedError(): ApiError {
  return {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Something went wrong. Please try again.',
  };
}

function buildNetworkError(): ApiError {
  return {
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Unable to reach the server. Please check your connection and try again.',
  };
}

