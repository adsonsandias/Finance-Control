import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as ArrowIcon } from '../../../assets/arrow-icon.svg'
import { ReactComponent as HelpIcon } from '../../../assets/help-icon.svg'
import { ReactComponent as LogoutIcon } from '../../../assets/logout-icon.svg'
import fotoUser from '../../../assets/new-user.png'
import { ReactComponent as UserIcon } from '../../../assets/user-icon.svg'
import { ReactComponent as VersionIcon } from '../../../assets/version-icon.svg'
import { useAuthContext } from '../../../presentation/contexts/AuthContext'
import { container, item } from '../../Helps/FrameMotion'
import { Config, Container, UserInfor } from './styles'

export function UserProfile() {
  const { signOut, user } = useAuthContext()

  if (!user) return null

  return (
    <Container className="container" variants={container} initial="hidden" animate="visible">
      <UserInfor variants={item}>
        <h1>Óla, Bem Vindo de volta 🤩</h1>
        <div
          style={{
            backgroundImage: `url(${user.avatarUrl || fotoUser})`,
          }}
        />
        <h2>{user.displayName || user.email}</h2>
        <span>{user.email}</span>
      </UserInfor>
      <Config>
        <motion.h1 variants={item}>Configuração</motion.h1>
        <ul>
          <motion.li variants={item}>
            <Link to="login-details">
              <UserIcon />
              <h2>Login detalhes</h2>
              <p>Usuário e senha.</p>
              <ArrowIcon />
            </Link>
          </motion.li>
          <motion.li variants={item}>
            <Link to="help-details">
              <HelpIcon />
              <h2>Help</h2>
              <p>Informações de ajuda.</p>
              <ArrowIcon />
            </Link>
          </motion.li>
          <motion.li variants={item}>
            <Link to="version-detail">
              <VersionIcon />
              <h2>Versão do App</h2>
              <p>Beta 1.3.0</p>
              <ArrowIcon />
            </Link>
          </motion.li>
        </ul>
        <motion.button variants={item} type="button" onClick={signOut}>
          <LogoutIcon />
          <h2>Sair da conta</h2>
        </motion.button>
      </Config>
    </Container>
  )
}
