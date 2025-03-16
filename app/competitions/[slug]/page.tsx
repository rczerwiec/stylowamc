import { notFound } from 'next/navigation';
import ClientCompetitionPage from './ClientPage';
import { competitions } from '../data';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function CompetitionPage({ params }: PageProps) {
  const competition = competitions[params.slug];

  if (!competition) {
    notFound();
  }

  return <ClientCompetitionPage competition={competition} />;
} 