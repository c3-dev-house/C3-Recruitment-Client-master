import { render, screen } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';
import App from './App';
import store from './store/store';

test('renders an official-logo-first recruitment landing entrance', async () => {
  render(
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  );

  expect(await screen.findByRole('link', { name: /enter convergenc3/i })).toBeInTheDocument();
  expect(screen.getByText(/enter convergenc3/i)).toBeInTheDocument();
  expect(screen.getByAltText(/convergenc3 logo/i)).toHaveAttribute('src', '/branding/logos/Triangle-Red.png');
  expect(screen.queryByText(/click the mark/i)).not.toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: /enter the recruitment pipeline/i })).not.toBeInTheDocument();
});
