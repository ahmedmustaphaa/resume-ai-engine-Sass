import ClassicTemplate from '@/assets/templates/ClassicTemplate'
import MinimalImageTemplate from '@/assets/templates/MinimalImageTemplate'
import MinimalTemplate from '@/assets/templates/MinimalTemplate'
import ModernTemplate from '@/assets/templates/ModernTemplate'
import React from 'react'

function ResumeReview({data, templet, accentColor, classes=''}) {

  // التعديل السحري هنا:
  // بندمج الـ personal_info مع الـ data الأساسية عشان الـ Template يشوف fullName مباشرة
 // جوه ملف ResumeReview.js
  const combinedData = {
    ...data,
    ...data.personal_info,


    fullName: data.personal_info?.full_name 
  }

  const renderTemplate = () => {
    // هنبعت combinedData بدل data للـ Templates
    switch (templet) {
      case "modern":
        return <ModernTemplate data={combinedData} accentColor={accentColor} />

      case "minimal":
        return <MinimalTemplate data={combinedData} accentColor={accentColor} />

      case "minimal-image":
        return <MinimalImageTemplate data={combinedData} accentColor={accentColor} />

      case "classic":
        return <ClassicTemplate data={combinedData} accentColor={accentColor} />

      default:
        return <ModernTemplate data={combinedData} accentColor={accentColor} />
    }
  }

  return (
    <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden ${classes}`}>
      {renderTemplate()}
    </div>
  )
}

export default ResumeReview