import Skeleton from '@mui/material/Skeleton'
import React from 'react'

const ProjectsSkeletonGrid: React.FC = () => {
  return (
    <div>
        <Skeleton className="relative overflow-hidden" height={193} variant="rectangular" />
        <div className="p-4 h-[162px] flex flex-col gap-2 border border-[#d0d5dd]">
            <Skeleton variant="rectangular" width={130} height={28} />
            <Skeleton variant="rectangular" height={60} />
            <Skeleton variant="rectangular" width={90} height={24} />
        </div>
    </div>
  )
}

export default ProjectsSkeletonGrid
