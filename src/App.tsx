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
        <img src={santaLogo} className="logo" width={250} alt="santa logo" />
        <p className='numberTitle'>
          Твой уникальный номер:
        </p>
        <p className="number">
          {number}
        </p>
      </div>
      <iframe className='form' src="https://docs.google.com/forms/d/e/1FAIpQLSdszQ0HLT0xnOUsGliF6OLj6yqXJbYTCFYpbPmreLfC1yEDHg/viewform?embedded=true">Загрузка…</iframe>
    </div>
  )
}

export default App
