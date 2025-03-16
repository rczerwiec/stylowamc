import { notFound } from 'next/navigation';
import ClientCompetitionPage from './ClientPage';
import { competitions } from '../data';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CompetitionPage({ params }: PageProps) {
  const resolvedParams = await params;
  const competition = competitions[resolvedParams.slug];

  if (!competition) {
    notFound();
  }

  return <ClientCompetitionPage competition={competition} />;
} 