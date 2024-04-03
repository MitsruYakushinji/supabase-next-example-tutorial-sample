'use client';

export default function Confirm({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <>
      <span className="mt-6 text-center text-lg">{message}</span>
      <div className="mt-8 flex justify-end">
        <button className="btn btn-outline" onClick={onCancel}>
          cancel
        </button>
        <button className="btn btn-primary ml-2 w-36" onClick={onConfirm}>
          yes
        </button>
      </div>
    </>
  );
}
