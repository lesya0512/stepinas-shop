import CatalogLayout from "@/components/layouts/CatalogLayout"

export const metadata = {
  title: 'Stepinas | Каталог'
}

export default function CatalogRootsLayout({
  children,
} : {
  children: React.ReactNode
}) {
  return <CatalogLayout>{children}</CatalogLayout>
}