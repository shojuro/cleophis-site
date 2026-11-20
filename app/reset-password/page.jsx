import '../site.css';
import '../board.css';
import ResetPage from '../../components/board/ResetPage';

export const metadata = {
  title: 'Choose a new password · Cleophis',
  description: 'Choose a new password for your Cleophis account.',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ResetPage />;
}
