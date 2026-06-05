import { useState } from 'react';

interface TextInputProps {
  title?: string;
  placeHolder?: string;
  className?: string;
  onBlurEmptyMessage?: string;
  allowEmpty?: boolean;
}
const TextInput = ({
  title,
  className,
  placeHolder,
  onBlurEmptyMessage,
  allowEmpty = true,
}: TextInputProps) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [text, setText] = useState('');
  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!allowEmpty) return;
    if (!e.currentTarget.value) {
      setErrorMessage(onBlurEmptyMessage ? onBlurEmptyMessage : `* ${title}은 필수 항목 입니다. `);
    } else {
      setErrorMessage('');
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  return (
    <div>
      <input
        type="text"
        id="noteTitle"
        className={`form-control ${className}`}
        placeholder={`${placeHolder ? placeHolder : ''}`}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        value={text}
      />
      {allowEmpty && title && errorMessage && (
        <small className="text-danger d-block mt-1 ps-2">{errorMessage}</small>
      )}
    </div>
  );
};

export default TextInput;
