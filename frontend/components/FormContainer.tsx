export default function FormContainer({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          {title}
        </h1>
        {children}
      </div>
    </div>
  );
}
