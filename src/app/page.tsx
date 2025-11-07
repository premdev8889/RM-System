import { redirect } from 'next/navigation';

export default function Home() {
  // Ab root par login page open hoga
  redirect('/login');
}
