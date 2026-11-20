import '../site.css';
import '../board.css';
import ConfirmedPage from '../../components/board/ConfirmedPage';

export const metadata = {
  title: 'Email confirmed · Cleophis',
  description: 'Your Cleophis email address is confirmed.',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ConfirmedPage />;
}
