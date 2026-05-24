import { describe, expect, it, vi } from 'vitest';
import { addDays, subDays } from 'date-fns';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, screen, within } from '@/test/utils';
import { TaskCard } from '@/components/task-card';
import { FilterPill } from '@/components/filter-pill';
import { TypePicker } from '@/components/type-picker';
import { StatsPill } from '@/components/stats-pill';
import { Logo } from '@/components/logo';
import { Spinner } from '@/components/ui/spinner';
import { Calendar } from 'lucide-react';
import type { Task } from '@/lib/api';

function makeTask(overrides: Partial<Task> = {}): Task {
  return {
    id: 't-1',
    type: 4,
    title: 'Sample',
    description: null,
    when: new Date().toISOString(),
    done: false,
    userId: 'u-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('TaskCard', () => {
  it('renders title, description and time', () => {
    renderWithProviders(<TaskCard task={makeTask({ description: 'A description' })} />);
    expect(screen.getByText('Sample')).toBeInTheDocument();
    expect(screen.getByText('A description')).toBeInTheDocument();
  });

  it('shows the late badge for past undone tasks', () => {
    renderWithProviders(
      <TaskCard task={makeTask({ when: subDays(new Date(), 2).toISOString(), done: false })} />,
    );
    expect(screen.getByText(/late/i)).toBeInTheDocument();
  });

  it('shows the done badge for completed tasks', () => {
    renderWithProviders(<TaskCard task={makeTask({ done: true })} />);
    expect(screen.getByText(/done/i)).toBeInTheDocument();
  });

  it('calls onToggle when the checkbox is clicked', async () => {
    const onToggle = vi.fn();
    const task = makeTask();
    renderWithProviders(<TaskCard task={task} onToggle={onToggle} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onToggle).toHaveBeenCalledWith(task);
  });

  it('hides "late" for future tasks', () => {
    renderWithProviders(
      <TaskCard task={makeTask({ when: addDays(new Date(), 3).toISOString() })} />,
    );
    expect(screen.queryByText(/late/i)).not.toBeInTheDocument();
  });
});

describe('FilterPill', () => {
  it('renders label, count, and triggers onSelect when clicked', async () => {
    const onSelect = vi.fn();
    renderWithProviders(
      <FilterPill label="Today" value="today" count={3} active={false} onSelect={onSelect} />,
    );
    expect(screen.getByText('Today')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: /today/i }));
    expect(onSelect).toHaveBeenCalledWith('today');
  });

  it('renders without a count', () => {
    renderWithProviders(<FilterPill label="All" value="all" active onSelect={() => {}} />);
    expect(screen.getByText('All')).toBeInTheDocument();
  });

  it('applies the danger tone styles', () => {
    renderWithProviders(
      <FilterPill label="Late" value="late" active onSelect={() => {}} tone="danger" />,
    );
    expect(screen.getByText('Late')).toBeInTheDocument();
  });
});

describe('TypePicker', () => {
  it('renders all selectable types and calls onChange', async () => {
    const onChange = vi.fn();
    renderWithProviders(<TypePicker value={1} onChange={onChange} />);
    const sport = screen.getByRole('button', { name: /sport/i });
    await userEvent.click(sport);
    expect(onChange).toHaveBeenCalled();
  });

  it('does not include the "Done" type as selectable', () => {
    renderWithProviders(<TypePicker value={1} onChange={() => {}} />);
    expect(screen.queryByRole('button', { name: /^Done$/i })).not.toBeInTheDocument();
  });
});

describe('StatsPill', () => {
  it('renders value and label', () => {
    renderWithProviders(
      <StatsPill label="Today" value={42} Icon={Calendar} tone="primary" />,
    );
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('Today')).toBeInTheDocument();
  });
});

describe('Logo and Spinner', () => {
  it('Logo renders the brand name', () => {
    renderWithProviders(<Logo />);
    expect(within(screen.getByText(/Task/).parentElement!).getByText('Flow')).toBeInTheDocument();
  });

  it('Spinner is announced as loading', () => {
    renderWithProviders(<Spinner />);
    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
  });
});
