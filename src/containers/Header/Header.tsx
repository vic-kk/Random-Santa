import santaLogo from '/santa.png'
import { copyToClipboard } from '../../utils';
import './Header.css'

interface HeaderProps {
  number: string;
  adminUrl: string;
};

const Header = ({ number, adminUrl }: HeaderProps) => {
  const copyСonfig = {
    successMessage: 'Ваш номер скопирован'
  }

  return (
    <div>
      <p>
        <img src={santaLogo} className="logo" width={250} alt="santa logo" />
      </p>
      <div className='title'>
        Твой уникальный номер:
      </div>
      <div
        className="number"
        onClick={() => copyToClipboard(number, copyСonfig)}
        title='Нажми, чтобы скопировать'
      >
        {number}
      </div>
      <div>
        Твой номер уже сохранен на этой странице, но, <br/>
        на всякий случай, <u><b>сфотографируй</b></u> или <u><b>запиши его</b></u>
      </div>
      <div>
        <a className='tg' href={adminUrl} target='_blank'>группа в TG</a>
      </div>
    </div>
  )
}

export default Header;