import { tovarTypes } from "@/constants/tovars"
import { notFound } from "next/navigation"

export default function Type({ params }: { params: { type: string } }) {
  if(!tovarTypes.includes(params.type)) {
    notFound()
  }
  
  return <h1>{params.type}</h1>
}