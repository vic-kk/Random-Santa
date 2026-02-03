import { FEATURES } from './features';
import { Address, ADDRESSES } from './data';
import { GoogleForm, Header, InService, Recipient, RecipientLine } from './containers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

type targetData = Address | undefined;

type LineType = 'gender' | 'wishes' | 'ozon_address' | 'wb_address';

const URLS = {
  tgAdmin: 'https://t.me/+omk7AIuSRmZmMjMy7',
  googleForm: 'https://forms.gle/ichPY3Vzn1FY5fUL9',
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

  const number = parseInt((localStorage?.getItem(LSData) as string), 10);

  const target: targetData = ADDRESSES?.get(+number);

  return (
    <>
      <Header number={number} adminUrl={URLS.tgAdmin} />

      {FEATURES.IN_SERVICE && (
        <InService />
      )}

      {!FEATURES.IN_SERVICE && (
        <>
          {!FEATURES.SANTA_READY && (
            <GoogleForm url={URLS.googleForm} />
          )} 

          {FEATURES.SANTA_READY && (
            <Recipient target={target}>
              {target && 
                Object.entries(target).map(([key, value]) => (
                  <RecipientLine
                    lineType={key as LineType}
                    value={value}
                  />
                ))
              }
            </Recipient>
          )}
        </>
      )}

      <ToastContainer />
    </>
  )
}

export default App
