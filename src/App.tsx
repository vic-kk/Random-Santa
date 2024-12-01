import santaLogo from '/santa.png'
import './App.css'

const GenerateRandomSixDigitNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
}

const LSData = 'SANTAUniqId';

function App() {
  if (!localStorage.getItem(LSData)) {
    const randomNumber = GenerateRandomSixDigitNumber();
    localStorage.setItem(LSData, `${randomNumber}`);
  }

  const number = localStorage.getItem(LSData);

  return (
    <div className='rowItems'>
      <div>
        <p>
          <img src={santaLogo} className="logo" width={250} alt="santa logo" />
        </p>
        <div className='numberTitle'>
          Твой уникальный номер:
        </div>
        <div className="number">
          {number}
        </div>
        <div>
          Твой номер сохранился на этой странице, <br/> но на всякий случай сфотографируй или запиши его
        </div>
        <a className='TGLink' href="https://t.me/+zsu_94QvWxI5OGQy" target='_blank'>группа в TG</a>
      </div>
      <iframe className='form' src="https://docs.google.com/forms/d/e/1FAIpQLSdszQ0HLT0xnOUsGliF6OLj6yqXJbYTCFYpbPmreLfC1yEDHg/viewform?embedded=true">Загрузка…</iframe>
    </div>
  )
}

export default App
