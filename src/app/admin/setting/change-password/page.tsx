import NavTitle from '@/components/common/admin/reuseable/nav-title'
import ProfileBox from '@/components/common/admin/view/profile-box'
import React from 'react'

export default function ChangePassword() {
  return (
    <>
      <NavTitle title="Change password" subTitle="You can manage your admin panel password from here" />
      <ProfileBox />
    </>
  )
}
