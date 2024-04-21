import type { Meta, StoryObj } from '@storybook/react';
import { EzTextField } from './EzTextField';
import { EzForm } from '..';

const meta: Meta<typeof EzTextField> = {
  title: 'Input/EzTextField',
  parameters: {
    layout: 'centered',
  },
  decorators: (Story) => (
    <EzForm onSubmit={() => {}}>
      <Story />
    </EzForm>
  ),
  argTypes: {
    variant: {
      control: 'radio',
      options: ['standard', 'filled', 'outlined'],
    },
    margin: {
      control: 'radio',
      options: ['dense', 'normal', 'none', undefined],
    },
  },
  args: {
    variant: 'standard',
    margin: 'normal',
    type: 'text',
  },
  component: EzTextField,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Name: Story = {
  args: {
    label: 'Name',
    name: 'name',
  },
};

export const Email: Story = {
  args: {
    label: 'Email',
    name: 'email',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    name: 'password',
    type: 'password',
  },
};
