interface FormTextareaProps {
  id: string;
  rows?: number;
  placeholder?: string;
  onChange: (value: string) => void;
}

const FormTextarea = ({ id, rows = 4, placeholder, onChange }: FormTextareaProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <textarea
      id={id}
      className="form-control font-monospace"
      rows={rows}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};

export default FormTextarea;
