import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as ArrowIcon } from '../../../../assets/arrow-icon.svg'
import fotoUser from '../../../../assets/new-user.png'
import { useAuthContext } from '../../../../presentation/contexts/AuthContext'
import { containerLeft, item } from '../../../Helps/FrameMotion'
import { Context, ContainerAnimation, UserInfor } from './styles'

export function LoginDetails() {
  const { user } = useAuthContext()

  if (!user) return null

  return (
    <Context className="container" variants={containerLeft} initial="hidden" animate="visible">
      <header>
        <nav aria-label="Navigate to Help Details">
          <ul>
            <li>
              <Link to="/user">
                <ArrowIcon />
                <span>Login detalhes</span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <UserInfor variants={item}>
        <div
          style={{
            backgroundImage: `url(${user.avatarUrl || fotoUser})`,
          }}
        />
        <h2>{user.displayName || user.email}</h2>
        <span>{user.email}</span>
      </UserInfor>
      <ContainerAnimation variants={item}>
        <Player
          autoplay
          loop
          src="https://assets3.lottiefiles.com/packages/lf20_w1fl6e19.json"
          style={{ height: '300px', width: '300px' }}
        />
        <p>Estamos nos esforçando para terminar essa página.</p>
      </ContainerAnimation>
    </Context>
  )
}
