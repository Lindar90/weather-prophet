import React, { useState, ComponentProps } from 'react';
import { Meta, Story } from '@storybook/react';
import SearchableAsyncSelect from './SearchableAsyncSelect';
import data from './data.json';

export default {
  component: SearchableAsyncSelect,
  title: 'UI-kit/SearchableAsyncSelect',
} as Meta;

const fetchOptions = (searchTerm: string) => {
  const filteredOptions = data.filter((item) => item.includes(searchTerm));
  return new Promise<string[]>((resolve) => {
    setTimeout(() => resolve(filteredOptions), 1000);
  });
};

const Template: Story<ComponentProps<typeof SearchableAsyncSelect>> = (args) => {
  const { value } = args;
  const [selectedValue, setSelectedValue] = useState<string | object | null>(value ?? '');

  return (
    <>
      <div>
        Controlled value:
        {' '}
        {selectedValue}
      </div>

      <br />

      <SearchableAsyncSelect
        {...args}
        value={selectedValue}
        onChange={setSelectedValue}
        fetchOptions={fetchOptions}
      />
    </>
  );
};

export const FirstStory = Template.bind({});

FirstStory.args = {
  label: 'Test searchable select',
  searchThreshold: 0,
};
