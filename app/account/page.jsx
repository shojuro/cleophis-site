import '../site.css';
import '../board.css';
import AccountPage from '../../components/board/AccountPage';

export const metadata = {
  title: 'Your account · Cleophis',
  description: 'Your Cleophis account and feedback board settings.',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AccountPage />;
}
