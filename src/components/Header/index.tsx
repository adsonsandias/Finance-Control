import logoImg from '../../assets/logo.svg'
import fotoUser from '../../assets/user.png'

export function Header(){
  return (
    <header>
      <div>
        <img src={logoImg} alt="Finance Control" />
        <span>Finance</span>
        <span>Control</span>
        </div>
      <div>
        <span>Adson Santos</span>
        <a href="">sair</a>
        <img src={fotoUser} alt="Perfil de usúario" />
      </div>
    </header>
  )
}