import React from 'react'
import { ProfileAvatarWrapper } from './ProfileAvatarWrapper'
import ProfileOverlays from './ProfileOverlays'
import { ProfileImageHolder } from './ProfileImageHolder'

type ProfileAvatarProps = {
  size?: 'cSmall' | 'cMedium' | 'cLarge' | 'qSmall' | 'qMedium' | 'qLarge'
  alt?: string
  src?: string
  className?: string
  handleDelete?: () => void
  overlay?: boolean
  upload?: boolean
  aFile?: File
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  isNoFile?: boolean, isCompressing?: boolean,
}

export const ProfileAvatar = React.forwardRef<HTMLDivElement, ProfileAvatarProps>((props, ref) => {
  const {
    size = 'cSmall', overlay = false, upload = false,
    aFile, handleDelete, onFileChange,
    src, className, alt = 'profile', isNoFile, isCompressing,
    ...rest
  } = props

  return (
    <>
      <ProfileAvatarWrapper isNoFile={isNoFile} size={size} ref={ref} {...rest} className={className} >
        <ProfileOverlays
          isCompressing={isCompressing}
          overlay={overlay}
          upload={upload}
          handleDelete={handleDelete}
          onFileChange={onFileChange}
        />
        <ProfileImageHolder
          size={size}
          alt={alt}
          className={className}
          aFile={aFile}
          src={src}
        />
      </ProfileAvatarWrapper>
    </>
  )
})

ProfileAvatar.displayName = "ProfileAvatar"

