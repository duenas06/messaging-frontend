import Chat from '@/components/Chat/page';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="w-full flex justify-center items-center flex-col min-h-screen">
      <Chat />
    </div>
  );
}
