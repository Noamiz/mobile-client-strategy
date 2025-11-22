import type {
  AuthSendCodeResponse,
  AuthVerifyCodeSuccess,
  Result,
  User,
} from 'common-strategy';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';

import App from '../../App';

const TABS = ['Home', 'Live', 'History', 'Profile'];

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
      expect(screen.getByText(/check your inbox/i)).toBeTruthy();
    });

    fireEvent.changeText(await screen.findByPlaceholderText('you@example.com'), 'person@example.com');
    fireEvent.changeText(await screen.findByPlaceholderText('123456'), '654321');
    fireEvent.press(screen.getByText(/verify & continue/i));

    expect(await screen.findByText(/quick actions/i)).toBeTruthy();
    TABS.forEach((tab) => expect(screen.getAllByText(tab).length).toBeGreaterThan(0));
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

    await screen.findByText(/check your inbox/i);

    fireEvent.changeText(await screen.findByPlaceholderText('you@example.com'), 'person@example.com');
    fireEvent.changeText(await screen.findByPlaceholderText('123456'), '123456');
    fireEvent.press(screen.getByText(/verify & continue/i));

    expect(await screen.findByText(/invalid or expired/i)).toBeTruthy();
  });

  it('renders tab navigation after login and allows switching screens', async () => {
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

    await screen.findByText(/check your inbox/i);

    fireEvent.changeText(await screen.findByPlaceholderText('you@example.com'), 'person@example.com');
    fireEvent.changeText(await screen.findByPlaceholderText('123456'), '123456');
    fireEvent.press(screen.getByText(/verify & continue/i));

    await screen.findByText(/highlights/i);

    fireEvent.press(screen.getByText('History'));
    expect(await screen.findByText(/Recent sessions/i)).toBeTruthy();
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

