import { notFound } from 'next/navigation';
import ClientCompetitionPage from './ClientPage';
import { competitions } from '../data';

type Props = {
  params: {
    slug: string;
  };
};

export default function CompetitionPage({ params }: Props) {
  const competition = competitions[params.slug];

  if (!competition) {
    notFound();
  }

  return <ClientCompetitionPage params={params} competition={competition} />;
} 