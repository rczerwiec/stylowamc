import { notFound } from 'next/navigation';
import ClientCompetitionPage from './ClientPage';
import { competitions } from '../data';

interface PageProps {
  params: {
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function CompetitionPage({ params, searchParams }: PageProps) {
  const competition = competitions[params.slug];
  console.log(searchParams);

  if (!competition) {
    notFound();
  }

  return <ClientCompetitionPage competition={competition} />;
} 