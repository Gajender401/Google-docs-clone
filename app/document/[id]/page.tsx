'use client'
import EditDoc from '@/components/editDoc'
import ProtectedRoutes from '@/src/ProtectedRoute'

const Page = ({ params }: { params: { id: string } }) => {
    return (
    <div>
        <EditDoc id={params.id} />
    </div>
  )
}

export default ProtectedRoutes(Page)