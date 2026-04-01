"use client"
import Navbar from '../dashboard/Navbar'

import { usePathname } from 'next/navigation'
import ProtectedRoute from '../ProtectedRoute';
import dynamic from 'next/dynamic';

const MyResumes = dynamic(() => import('../dashboard/MyResumes'), { ssr: false });
function page() {

const currentPath = usePathname(); 
const isAppPath = currentPath?.startsWith('/app'); 
  return (
    <div>

<ProtectedRoute>
  <MyResumes /> 
</ProtectedRoute>
    </div>
  )
}

export default page
