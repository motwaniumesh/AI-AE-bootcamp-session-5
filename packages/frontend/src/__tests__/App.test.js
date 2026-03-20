import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from '../App';

// Create a test query client
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Mock fetch for tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);

test('renders TODO App heading', async () => {
  const testQueryClient = createTestQueryClient();

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  const headingElement = await screen.findByText(/TODO App/i);
  expect(headingElement).toBeInTheDocument();
});

test('deletes a todo when delete button is clicked', async () => {
  const testQueryClient = createTestQueryClient();
  
  // Mock fetch for initial todos
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        { id: 1, title: 'Test Todo 1', completed: false },
        { id: 2, title: 'Test Todo 2', completed: false },
      ]),
    })
  );

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for todos to load
  await screen.findByText('Test Todo 1');

  // Mock DELETE request
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    })
  );

  // Mock GET request for refetch after delete
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        { id: 2, title: 'Test Todo 2', completed: false },
      ]),
    })
  );

  // Click delete button on first todo
  const deleteButtons = screen.getAllByLabelText('Delete todo');
  deleteButtons[0].click();

  // Verify the todo was removed (should only see Test Todo 2)
  await screen.findByText('Test Todo 2');
  const todo1 = screen.queryByText('Test Todo 1');
  expect(todo1).not.toBeInTheDocument();
});

test('displays correct stats for incomplete and completed todos', async () => {
  const testQueryClient = createTestQueryClient();
  
  // Mock fetch with a mix of completed and incomplete todos
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([
        { id: 1, title: 'Incomplete Todo 1', completed: false },
        { id: 2, title: 'Completed Todo 1', completed: true },
        { id: 3, title: 'Incomplete Todo 2', completed: false },
        { id: 4, title: 'Completed Todo 2', completed: true },
        { id: 5, title: 'Incomplete Todo 3', completed: false },
      ]),
    })
  );

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for todos to load
  await screen.findByText('Incomplete Todo 1');

  // Verify stats show correct counts
  await screen.findByText('3 items left'); // 3 incomplete todos
  await screen.findByText('2 completed'); // 2 completed todos
});

test('displays empty state message when there are no todos', async () => {
  const testQueryClient = createTestQueryClient();
  
  // Mock fetch with empty array
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    })
  );

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for and verify empty state message appears
  const emptyMessage = await screen.findByText(/no todos yet/i);
  expect(emptyMessage).toBeInTheDocument();
});

test('displays error message when API fetch fails', async () => {
  const testQueryClient = createTestQueryClient();
  
  // Mock fetch to reject (network error)
  global.fetch.mockImplementationOnce(() =>
    Promise.reject(new Error('Network error'))
  );

  render(
    <QueryClientProvider client={testQueryClient}>
      <App />
    </QueryClientProvider>
  );

  // Wait for and verify error message appears
  const errorMessage = await screen.findByText(/failed to load todos/i);
  expect(errorMessage).toBeInTheDocument();
});

afterEach(() => {
  jest.clearAllMocks();
});
