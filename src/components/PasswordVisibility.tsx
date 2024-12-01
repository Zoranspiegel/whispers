import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function PasswordVisibility({
  visibility,
  toggleVisibility
}: {
  visibility: boolean;
  toggleVisibility: () => void;
}) {
  return (
    <button
      className="absolute bottom-2 right-2"
      onClick={toggleVisibility}
      type="button"
    >
      {visibility ? <FaEyeSlash /> : <FaEye />}
    </button>
  );
}
