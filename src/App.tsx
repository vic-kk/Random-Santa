import './App.css'
import { FEATURES } from './features';
import { Address, ADDRESSES } from './data';
import { GoogleForm, Header, InService, Recipient, RecipientLine } from './containers';

type targetData = Address | undefined;

const URLS = {
  tgAdmin: 'https://t.me/+omk7AIuSRmZmMjMy7',
  googleForm: 'https://forms.gle/HammbA78Cp38cuRp6',
};

const LSData = 'SANTAUniqId';

const GenerateRandomSixDigitNumber = () => {
  return Math.floor(100000 + Math.random() * 900000);
}

function App() {
  if (!localStorage.getItem(LSData)) {
    const randomNumber = GenerateRandomSixDigitNumber();
    localStorage.setItem(LSData, `${randomNumber}`);
  }

  const number = localStorage.getItem(LSData) as string;

  const target: targetData = FEATURES.ENABLE_RECIEVE && number ? ADDRESSES?.find((item) => item.id_santa === +number) : undefined;

  return (
    <div>
      <Header number={number} adminUrl={URLS.tgAdmin} />

      {!FEATURES.ENABLE_RECIEVE && (
        <GoogleForm url={URLS.googleForm} />
      )} 

      {FEATURES.IN_SERVICE && (
        <InService />
      )}

      {FEATURES.ENABLE_RECIEVE && !FEATURES.IN_SERVICE && (
        <Recipient target={target}>
          {target && (<>
            <RecipientLine
              lineType='gender'
              value={target.gender}
            />
            <RecipientLine
              lineType='wishes'
              value={target.wishes}
            />
            <RecipientLine
              lineType='ozon'
              value={target.ozon_address}
            />
            <RecipientLine
              lineType='wb'
              value={target.wb_address}
            />
          </>)}
        </Recipient>
      )}

    </div>
  )
}

export default App
