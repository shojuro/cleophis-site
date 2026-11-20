import '../site.css';
import '../board.css';
import BoardPage from '../../components/board/BoardPage';

export const metadata = {
  title: 'Feedback board · Cleophis',
  description: 'Suggest tutors and features for Cleophis, vote and comment.',
};

export default function Page() {
  return <BoardPage />;
}
