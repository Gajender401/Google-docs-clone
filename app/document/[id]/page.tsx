import React from 'react'
import EditDoc from '@/components/editDoc'

const Page = ({ params }: { params: { id: string } }) => {
    return (
    <div>
        <EditDoc id={params.id} />
    </div>
  )
}

export default Page