import NavTitle from '@/components/common/admin/reuseable/nav-title'
import ProfileBox from '@/components/common/admin/view/profile-box'
import React from 'react'

export default function Profile() {
  return (
    <>
      <NavTitle title="Profile" subTitle="You can manage your admin profile from here" />
      <ProfileBox/>
     </>
  )
}
