import { fireEvent, screen } from '@testing-library/react-native';

import { HomeScreen } from '../screens/HomeScreen';
import { renderWithProviders } from '../testUtils/renderWithProviders';

describe('AI assistant sheet', () => {
  it('opens from the home FAB and collects user messages', async () => {
    renderWithProviders(<HomeScreen />);

    fireEvent.press(screen.getByLabelText('Open AI Assistant'));

    const sheetTitle = await screen.findByText(/AI Assistant/i);
    expect(sheetTitle).toBeTruthy();

    const input = screen.getByLabelText('AI assistant input');
    fireEvent.changeText(input, 'Show me todays plan');

    fireEvent.press(screen.getByLabelText('Send'));

    const messages = await screen.findAllByText(/Show me todays plan/i);
    expect(messages).toHaveLength(2);
  });
});


