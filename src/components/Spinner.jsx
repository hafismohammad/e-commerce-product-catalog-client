import { ScaleLoader } from 'react-spinners';

function Loading() {
  return (
    <div className="fixed inset-0 h-full flex items-center justify-center z-[9999]">
      <ScaleLoader color="#155E75" />
    </div>
  );
}

export default Loading;
