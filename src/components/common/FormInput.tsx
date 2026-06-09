import { useState } from 'react';

interface TextInputProps {
  id: string;
  title?: string;
  placeHolder?: string;
  className?: string;
  onBlurEmptyMessage?: string;
  allowEmpty?: boolean;
  innerText: string;
  onChange?: (value: string) => void;
}
const TextInput = ({
  id,
  title,
  className,
  placeHolder,
  onBlurEmptyMessage,
  allowEmpty = true,
  innerText,
  onChange,
}: TextInputProps) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [text, setText] = useState(innerText);
  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (allowEmpty) return;
    if (!e.currentTarget.value) {
      setErrorMessage(onBlurEmptyMessage ? onBlurEmptyMessage : `* ${title}은 필수 항목 입니다. `);
    } else {
      setErrorMessage('');
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
    // ! onChange 콜백이 존재하는 경우에만 호출 (옵셔널 체이닝)
    onChange?.(e.currentTarget.value);
  };

  return (
    <div>
      <input
        type="text"
        id={id}
        className={`form-control ${className}`}
        placeholder={`${placeHolder ? placeHolder : ''}`}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        value={text}
      />
      {!allowEmpty && title && errorMessage && (
        <small className="text-danger d-block mt-1 ps-2">{errorMessage}</small>
      )}
    </div>
  );
};

export default TextInput;
