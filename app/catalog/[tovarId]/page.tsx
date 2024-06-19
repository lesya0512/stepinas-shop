// import TovarPage from '@/components/templates/TovarPage/TovarPage';

export default function Tovar({ 
  params 
}: { 
  params: { tovarId: string } 
}) {
  return <h1>{params.tovarId}</h1>
}
