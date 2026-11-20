import '../../../site.css';
import '../../../board.css';
import IdeaPage from '../../../../components/board/IdeaPage';

export const metadata = {
  title: 'Idea · Cleophis feedback board',
  description: 'An idea on the Cleophis feedback board.',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <IdeaPage />;
}
