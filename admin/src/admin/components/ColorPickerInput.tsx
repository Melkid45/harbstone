import { forwardRef, type ChangeEvent, type ReactNode } from 'react';
import { Field, Flex, TextInput } from '@strapi/design-system';

const DEFAULT_COLOR = '#000';
const SHORT_HEX_PATTERN = /^#([0-9a-f]{3})$/i;
const LONG_HEX_PATTERN = /^#([0-9a-f]{6})(?:[0-9a-f]{2})?$/i;

interface ColorPickerInputProps {
  disabled?: boolean;
  error?: string;
  hint?: ReactNode;
  label?: ReactNode;
  labelAction?: ReactNode;
  name: string;
  onChange: (name: string, value: string) => void;
  required?: boolean;
  value?: string;
}

const toNativeColor = (value?: string) => {
  const color = value || DEFAULT_COLOR;
  const shortMatch = color.match(SHORT_HEX_PATTERN);

  if (shortMatch) {
    return `#${shortMatch[1]
      .split('')
      .map((character) => character.repeat(2))
      .join('')}`;
  }

  const longMatch = color.match(LONG_HEX_PATTERN);
  return longMatch ? `#${longMatch[1]}` : '#000000';
};

const ColorPickerInput = forwardRef<HTMLInputElement, ColorPickerInputProps>(({
  disabled,
  error,
  hint,
  label,
  labelAction,
  name,
  onChange,
  required,
  value,
}, ref) => {
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(name, event.target.value);
  };

  const handlePickerChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(name, event.target.value);
  };

  return (
    <Field.Root
      error={error}
      hint={hint}
      name={name}
      required={required}
    >
      <Field.Label action={labelAction}>{label}</Field.Label>
      <Flex alignItems="stretch" gap={2}>
        <input
          aria-label="Choose background color"
          disabled={disabled}
          name={`${name}-picker`}
          onChange={handlePickerChange}
          style={{
            width: 56,
            minHeight: 40,
            padding: 4,
            border: '1px solid #dcdce4',
            borderRadius: 4,
            background: 'transparent',
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
          type="color"
          value={toNativeColor(value)}
        />
        <TextInput
          ref={ref}
          aria-label="Background color HEX value"
          disabled={disabled}
          name={name}
          onChange={handleTextChange}
          placeholder={DEFAULT_COLOR}
          type="text"
          value={value || DEFAULT_COLOR}
        />
      </Flex>
      <Field.Hint />
      <Field.Error />
    </Field.Root>
  );
});

ColorPickerInput.displayName = 'ColorPickerInput';

export default ColorPickerInput;
