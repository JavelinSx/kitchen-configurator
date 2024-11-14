import { CanvasWrapper } from './components';
import { MaterialSelector } from '@/components/ui/MaterialSelector';

export default function Home() {
  return (
    <main className='relative h-screen w-full'>
      <CanvasWrapper />
      <MaterialSelector />
    </main>
  );
}
