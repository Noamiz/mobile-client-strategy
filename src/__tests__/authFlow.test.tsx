import type {
  AuthSendCodeResponse,
  AuthVerifyCodeSuccess,
  Result,
  User,
} from 'common-strategy';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import App from '../../App';

const originalFetch = global.fetch;
const mockFetch: jest.Mock<ReturnType<typeof fetch>, Parameters<typeof fetch>> = jest.fn();

describe('auth flow', () => {
  beforeEach(() => {
    mockFetch.mockReset();
    global.fetch = mockFetch as unknown as typeof fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('lets a user request a code and sign in', async () => {
    mockFetch
      .mockResolvedValueOnce(mockResponse<AuthSendCodeResponse>({
        ok: true,
        data: {
          expiresAt: Date.now() + 60_000,
          maskedDestination: 'p***@example.com',
        },
      }))
      .mockResolvedValueOnce(
        mockResponse<AuthVerifyCodeSuccess>({
          ok: true,
          data: {
            user: buildUser(),
            token: {
              token: 'token',
              issuedAt: Date.now(),
              expiresAt: Date.now() + 60 * 60 * 1000,
            },
          },
        }),
      );

    render(<App />);

    fireEvent.changeText(screen.getByPlaceholderText('you@example.com'), 'person@example.com');
    fireEvent.press(screen.getByText('Send Code'));

    await waitFor(() => {
      expect(screen.getByText(/verify your code/i)).toBeTruthy();
    });

    fireEvent.changeText(await screen.findByPlaceholderText('you@example.com'), 'person@example.com');
    fireEvent.changeText(await screen.findByPlaceholderText('123456'), '654321');
    fireEvent.press(screen.getByText(/verify & continue/i));

    expect(await screen.findByText(/You are logged in/i)).toBeTruthy();
  });

  it('shows an error when the verification code is invalid', async () => {
    mockFetch
      .mockResolvedValueOnce(
        mockResponse<AuthSendCodeResponse>({
          ok: true,
          data: {
            expiresAt: Date.now() + 60_000,
          },
        }),
      )
      .mockResolvedValueOnce(
        mockResponse<AuthVerifyCodeSuccess>({
          ok: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Code invalid',
          },
        }),
      );

    render(<App />);

    fireEvent.changeText(screen.getByPlaceholderText('you@example.com'), 'person@example.com');
    fireEvent.press(screen.getByText('Send Code'));

    await screen.findByText(/verify your code/i);

    fireEvent.changeText(await screen.findByPlaceholderText('you@example.com'), 'person@example.com');
    fireEvent.changeText(await screen.findByPlaceholderText('123456'), '123456');
    fireEvent.press(screen.getByText(/verify & continue/i));

    expect(await screen.findByText(/invalid or expired/i)).toBeTruthy();
  });
});

function mockResponse<T>(body: Result<T>): Response {
  return {
    ok: body.ok,
    status: body.ok ? 200 : 400,
    json: async () => body,
  } as Response;
}

function buildUser(overrides?: Partial<User>): User {
  return {
    id: 'user-id',
    email: 'person@example.com',
    isActive: true,
    createdAt: Date.now() - 1000,
    updatedAt: Date.now(),
    ...overrides,
  };
}

