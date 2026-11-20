import '../site.css';
import '../board.css';
import AuthPage from '../../components/board/AuthPage';

export const metadata = {
  title: 'Sign in · Cleophis',
  description: 'Sign in to your Cleophis account.',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <AuthPage />;
}
