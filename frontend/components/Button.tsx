interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition"
    >
      {children}
    </button>
  );
}
