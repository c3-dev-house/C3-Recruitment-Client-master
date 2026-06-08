import { render, screen } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';
import App from './App';
import store from './store/store';

test('renders the recruitment listings overhaul entrypoint', async () => {
  render(
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  );

  expect(await screen.findByRole('heading', { name: /open positions/i })).toBeInTheDocument();
  expect(screen.getByText(/Find the role that fits your next move/i)).toBeInTheDocument();
  expect(screen.queryByText(/inactive calibration role/i)).not.toBeInTheDocument();
});
