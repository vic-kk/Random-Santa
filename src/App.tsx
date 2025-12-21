import santaLogo from '/santa.png'
import './App.css'
import { FEATURES } from './feature/flags';
import { Address, ADDRESSES } from './data/adresses';

const GenerateRandomSixDigitNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
}

const LSData = 'SANTAUniqId';

type targetData = Address | undefined;

function App() {
  if (!localStorage.getItem(LSData)) {
    const randomNumber = GenerateRandomSixDigitNumber();
    localStorage.setItem(LSData, `${randomNumber}`);
  }

  const number = localStorage.getItem(LSData);

  const target: targetData = FEATURES.ENABLE_RECIEVE && number ? ADDRESSES?.find((item) => item.id_from === +number) : undefined;

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
        <a className='TGLink' href="https://t.me/+omk7AIuSRmZmMjMy" target='_blank'>группа в TG</a>
      </div>

      {!FEATURES.ENABLE_RECIEVE && (
        <iframe className='form' src="https://forms.gle/HammbA78Cp38cuRp6">Загрузка…</iframe>
      )} 

      {FEATURES.IN_SERVICE &&
        (
          <div>Эльфы в работе</div>
        )
      }

      {FEATURES.ENABLE_RECIEVE && !FEATURES.IN_SERVICE && (
        <div className='reciever'>
          {!target && <>
            <div>Упс, не нашел. Обратись к админу в TG</div>
          </>}

          {target && <>
            <h2>Адреса и пожелания получателя твоего подарка:</h2>
            <div>
              <div className='line-head'>Твой получатель:</div>
              <div>{target.gender}</div>
            </div>
            <div>
              <div className='line-head'>Пожелания:</div>
              <div>{target.wishes || '-'}</div>
            </div>
            <div>
              <div className='ozon line-head'>OZON:</div>
              <div>{target.ozon_address}</div>
            </div>
            <div>
              <div className='wb line-head'>WB:</div>
              <div>{target.wb_address}</div>
            </div>
          </>}
        </div>
      )}

    </div>
  )
}

export default App
